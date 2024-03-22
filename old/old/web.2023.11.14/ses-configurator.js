'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const _ = require('lodash');
const utils = require('./lib/utils');
const uuidv4 = require('uuid/v4');

settings.loadConfig();

const translationResourceStore = require('./routes/translationResourceStore');
const TRS = require('./lib/translationResourceStore');

nconf.set('TrainingOnTheCloud:mode', 'installer');

const winston = require('winston');

const yargs = require('yargs')
  .usage('Usage: $0')

  .alias('f', 'file')
  .describe('f', 'file with configuration data in yaml format')
  .describe('noWait', 'execute configurator and skip the convergence\'s wait')
  .alias('r', 'readOnly')
  .describe('r', 'only read configurations from settings db. Do not read from files, neither perform any merge to db')

  .default('f', __dirname + '/configure.yaml')
  .default('noWait', false)
  .default('readOnly', false)
;

const argv = yargs.argv;

if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

if (argv.noWait)
  winston.info('Running with no-wait option: ses-configurator will exit as soon as TR installation requests have been all sent: TR will be fully installed at some time in the future.');
else
  winston.info('ses-configurator will wait for all Computing Nodes convergence: TR will be fully installed when this scripts exits successfully. (use "--no-wait" to exit earlier)');

const fs = require('fs');

settings.initSSLConfig();

const db = require('./lib/db');

const models = require('./models');
models.init(nconf.get('TrainingOnTheCloud:Database')); // init models before any mongoose model usage

const async = require('async');
const translationResources = require('./lib/translationResources');
const translationResource = require('./routes/translationResource');
const envRoute = require('./lib/envRoute');
const envService = require('./lib/envService');

const poller = require('./lib/poller');
const status = require('node-status');
const trHelper = require('./lib/trHelper');

function importTr(role, dispatcherVersions, distrib, version, cb) {
  translationResourceStore.importTrByRole(role, function(err, data) {
    if (err) {
      winston.error('importTr', role, distrib, version, err);
    }
    cb(err, data);
  }, version, distrib, undefined, dispatcherVersions);
}

function startTrByRole(profileObj, role, service, version, nbInstances, cb) {
  winston.info('startTrByRole', 'profileObj', profileObj, 'role', role, 'service', service, 'version', version, 'nbInstances', nbInstances);

  async.waterfall([
    function(cb) {
      translationResources.getTranslationResourceByRole(role, version, function(err, id) {
        if (err) {
          cb(err);
          return;
        }
        winston.info('found tr:', id, 'for role:', role);
        cb(null, id);
      });
    },
    function(trId, cb) {
      if (!service.startsWith('Translate')) {
        const profileId = uuidv4();
        envRoute.libAddRoute(profileObj, profileId, trId, service, {}, function(err, data) {
          if (err) {
            cb(err);
            return;
          }
          winston.info('Started', nbInstances, 'instances of TR', data.trId, 'for service', data.service, 'on profileId', data.profileId);
          cb(err, { tr: trId, profileId: data ? data.profileId : undefined, service: service, selectors: data.selectors });
        }, profileObj.internal, undefined, profileObj.profileName);
      }
      else {
        db.getTrs(function(err, data) {
          if (err) {
            cb(err);
            return;
          }

          if (!data || data.translationResources.length === 0) {
            cb('Translation resource ' + trId + 'not found');
            return;
          }
          const tr = data.translationResources[0];
          const query = Object.assign({}, profileObj, {
            profileName: profileObj.profileName || tr.description.name,
            selectors: tr.selectors,
            resources: {
              engine: trHelper.getEngineData(tr),
              normalization: []
            },
            serviceName: profileObj.profileName || tr.description.name
          });
          envService.createProfile(query, function(err, data) {
            if (err) {
              cb(err);
              return;
            }
            winston.info('Started', nbInstances, 'instances of TR', trId, 'for service', service, 'on profileId', data.profileId);
            cb(err, { tr: trId, profileId: data ? data.profileId : undefined, service: service, selectors: tr.selectors, profileName: data.profileName });
          });
        }, {id: trId});
      }
    },
    function(data, cb) {
      const trId = data.tr;
      const forceInstall = true;
      translationResource.applyInstances(0 /* accountId */, trId, nbInstances, forceInstall, function(err) {
        if (err) {
          winston.error('Error starting tr instance', trId, err);
          cb(err, { trId: trId });
          return;
        }
        cb(null, data);
      });
    }
  ], cb);
}

function startFilterTr(dispatcherVersions, distrib, profileObj, version, nbInstances, cb) {
  const role = 'SystranFilterEngine';
  const service = 'Filter';

  importTr(role, dispatcherVersions, distrib, version, function(err) {
    if (err) {
      cb(err);
      return;
    }

    startTrByRole(profileObj, role, service, version, nbInstances, cb);
  });
}

let service;

// translator:
// * source: string lang
// * target: string lang
// * domain: optional string Statistical Model Domain (use "SPE-embedded" for v7 embedded SPE mode)
function startTranslationTr({ dispatcherVersions, distrib, mode, profileObj, translator, role, version, nbInstances }, cb) {
  // TODO verify this hack: is it wanted for both role & service?

  if (translator) {
    const {source, target, domain = 'Generic', owner, engine = 'rbmt', size } = translator;
    let src = source;
    let tgt = target;

    if (src === 'zt')
      src = 'zh';
    if (tgt === 'zt')
      tgt = 'zh';

    if (!role) {
      switch (engine) {
        case 'rbmt_spe':
          role = `${trHelper.MASTER_ROLES.find((r) => r.type === engine).text}${src}${tgt}_${owner ? `${owner}_` : ''}${domain}`;
          break;
        case 'rbmt':
        default:
          role = `${trHelper.MASTER_ROLES.find((r) => r.type === engine).text}${src}${tgt}`;
          break;
        case 'nmt':
          role = `${trHelper.MASTER_ROLES.find((r) => r.type === engine).text}${src}${tgt}_${owner ? `${owner}_` : ''}${domain}${size ? `_${size}` : ''}`;
          break;
      }
      winston.info('Try to import role:', role);
    }

    service = 'Translate_' + src + '_' + tgt;
  }


  importTr(role, dispatcherVersions, distrib, version, function(err, data) {
    if (err) {
      cb(err);
      return;
    }
    if (!data || data.length === 0) {
      cb(new Error('Unable to get TR description'));
      return;
    }
    service = data[0] && data[0].description.service;
    startTrByRole(profileObj, role, service, version, nbInstances, cb);
  });
}

function startDirectLanguages(dispatcherVersions, distrib, mode, profileObj, source, target, domain, owner, version, nbInstances, role, engine, cb, size) {
  let translator;

  if (source && target) {
    translator = {source, target, engine, size};
    if (domain)
      translator.domain = domain;
    if (owner !== 'Systran')
      translator.owner = owner;
    if (size !== 'M')
      translator.size = size;
  }


  async.series([
    async.apply(startTranslationTr, { role, dispatcherVersions, distrib, mode, profileObj, translator, version, nbInstances })
  ], function(err) {
    if (err) {
      winston.error('Error in startDirectLanguages', err);
      cb(err);
      return;
    }
    cb();
  });
}

function startFlowLanguages(dispatcherVersions, distrib, mode, profileObj, source, target, flow, version, nbInstances, cb) {
  // check that flow is OK
  if (!_.isArray(flow)) {
    cb('flow must be an array');
    return;
  }
  if (flow.length === 0) {
    cb('flow must be non-empty');
    return;
  }
  let ok = true;
  ok = ok && (source === flow[0].source);
  for (let i = 0; i < flow.length - 1; i++) {
    ok = ok && (flow[i].target === flow[i + 1].source);
  }
  ok = ok && (flow[flow.length - 1].target === target);
  if (!ok) {
    cb('flow has an invalid chain of languages pairs');
    return;
  }

  async.series([
    function(cb) {
      const profileObjChild = _.cloneDeep(profileObj);
      profileObjChild.internal = true;
      const steps = flow.map(function(step) {
        const translator = _.pick(step, ['source', 'target', 'domain', 'owner', 'version', 'nbInstances', 'engine']);
        return async.apply(startTranslationTr, {role: step.role, dispatcherVersions, distrib, mode, profileObj: profileObjChild, translator, version: translator.version || '*', nbInstances: translator.nbInstances || nbInstances });
      });

      async.series(steps, function(err, flowResult) {
        if (err) {
          cb(err);
          return;
        }

        const query = Object.assign({}, profileObj, {
          serviceName: profileObj.profileName,
          flowProfile: flowResult.map(function(step, i) {
            return {
              profileName: step.profileName,
              profileId: step.profileId,
              source: flow[i].source,
              target: flow[i].target
            };
          })
        });

        envService.createProfile(query, cb);
      });
    }
  ], function(err) {
    if (err) {
      winston.error('Error in startFlowLanguages', err);
      cb(err);
      return;
    }
    cb();
  });
}

function waitTrs(cb) {
  TRS.client('Status', '/api/status', {}, function(err, res, status) {
    if (err) {
      winston.warn('Can\'t get TRS status:', err);
      setTimeout(function() {
        waitTrs(cb);
      }, 2000);
      return;
    }

    // For old TRS: if haveTr don't exist, we skip the wait
    if (status['mode'] !== 'local' || status['haveTr'] !== false) {
      cb(null, status);
      return;
    }

    winston.warn('Waiting for available TR in TRS:', status);
    setTimeout(function() {
      waitTrs(cb);
    }, 2000);
  });
}

// WARNING: only works if poller has been configured with `returnOnSuccess` set to true; which is currently only the case in ses-configurator.js
function waitTrConvergence(maxNoConvergenceTry, pollingInterval, cb) {
  const trBar = status.addItem('TR', {
    type: ['bar', 'percentage', 'count'],
    color: 'cyan',
    max: 100
  });
  status.start({
    label: 'TR Convergence'
  });

  let oldOkTrCounter = 0;
  let noConvergenceCounter = 0;
  const runner = function() {
    let trCounter = 0;
    let okTrCounter = 0;
    let koTrCounter = 0;
    poller.computingNodePolling(function(err, results) {
      if (err) {
        cb(err);
        return;
      }

      if (!results || !results.length) {
        cb('Unexpected polling results');
        return;
      }

      // Count how many TR we try to install
      results.forEach(function(computingNodeData) {
        const resources = computingNodeData.serverStatus.resources;
        if (!Array.isArray(resources)) {
          return;
        }
        trCounter += resources.length;
        for (let i = 0; i < resources.length; ++i) {
          if (resources[i].convergenceState === 'ok')
            okTrCounter++;
          else if (resources[i].convergenceState === 'ko') {
            koTrCounter++;
          }
        }
      });

      trBar.max = trCounter;

      if (okTrCounter !== oldOkTrCounter) {
        trBar.inc(okTrCounter - oldOkTrCounter);
        noConvergenceCounter = 0;
      }
      else {
        noConvergenceCounter++;
      }

      winston.info('Polling data:', '\nCurrent Number Total of TR:', trCounter, '\nOld Number of successfully installed TR:', oldOkTrCounter, '\nNumber of successfully installed TR:', okTrCounter, '\nNumber of failed TR:', koTrCounter, '\nNumber of No Convergence:', noConvergenceCounter);
      oldOkTrCounter = okTrCounter;

      if (okTrCounter + koTrCounter >= trCounter) {
        status.stop();
        cb((koTrCounter > 0) ? koTrCounter + ' TRs can not be installed correctly' : null);
        return;
      }

      if (noConvergenceCounter > maxNoConvergenceTry) {
        cb('Convergence inactivity polls reached: ' + maxNoConvergenceTry);
        return;
      }

      setTimeout(function() {
        runner();
      }, pollingInterval);
    });
  };

  runner();
}

function getServicePathWithHttpsOption(serviceConfig) {
  if (typeof serviceConfig === 'object') {
    return {hostname: serviceConfig.hostname, secure: serviceConfig.secure};
  }
  return {hostname: serviceConfig, secure: false};
}

function startLanguagePairs(configure, cb) {
  let distrib;
  let dispatcherVersions;
  async.waterfall([
    function(cb) {
      db.openTr(function(err) {
        if (err) {
          winston.error('Unable to open trDb');
          cb(err);
          return;
        }
        cb();
      });
    },
    function(cb) {
      db.openProfiles(function(err) {
        if (err) {
          winston.error('Unable to open Profiles Db');
        }
        cb(err);
      });
    },
    function(cb) {
      db.openNotifications(function(err) {
        if (err) {
          winston.error('Unable to open notifDb');
        }
        cb(err);
      });
    },
    function(cb) {
      waitTrs(function(err, status) {
        if (err) {
          cb(err);
          return;
        }
        winston.info('TRS Status:', status);
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      poller.computingNodePolling(function(err) {
        if (err) {
          winston.error('Error', err);
          cb(err);
          return;
        }
        winston.info('Polling Computing Nodes done');
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      poller.routingServerPolling(function(err) {
        if (err) {
          winston.error('Error', err);
          cb(err);
          return;
        }
        winston.info('Polling Routing Servers done');
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      poller.dispatcherPolling(function(err) {
        if (err) {
          winston.error('Error', err);
          cb(err);
          return;
        }
        winston.info('Polling Dispatchers done');
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      translationResources.getEnvComputingNodesDistrib(function(err, distrib_) {
        distrib = distrib_;
        if (!distrib) {
          cb(err || 'Distrib not found for registered Computing Nodes');
          return;
        }
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      translationResources.getEnvDispatcherVersion(function(err, dispatcherVersions_) {
        dispatcherVersions = dispatcherVersions_;
        if (!dispatcherVersions) {
          cb(err || 'Dispatcher versions not found');
          return;
        }
        cb();
      });
    },
    function(cb) {
      if (!configure.Filters && !configure.LanguagePairs) {
        cb();
        return;
      }

      translationResources.getLastUpdate()
        .then((data) => {
          if (!data.lastUpdate) {
            winston.debug('Missing lastUpdate in TranslationResources.infos collection');
            cb('NO_TR_DB: No TR in DB, Waiting first sync to TRS Console');
            return;
          }
          cb();
        })
        .catch(cb);
    },
    function(cb) {
      if (!configure.Filters || !Array.isArray(configure.Filters)) {
        winston.info('no Filters defined');
        cb();
        return;
      }

      async.each(configure.Filters, function(tr, cb) {
        const profileObj = {
          public: tr.public || true,
          deactivated: tr.deactivated || false,
          users: tr.users || [],
          groups: tr.groups || [],
          selectors: tr.selectors || {}
        };
        startFilterTr(dispatcherVersions, distrib, profileObj, tr.version || '*', tr.nbInstances, cb);
      }, function(err) {
        cb(err);
      });
    },
    function(cb) {
      if (!configure.LanguagePairs || !Array.isArray(configure.LanguagePairs)) {
        winston.info('no LanguagePairs defined');
        cb();
        return;
      }

      async.each(configure.LanguagePairs, function(tr, cb) {
        if (!tr.role && (!tr.source || !tr.target)) {
          winston.error('source, target required', tr);
          cb('source, target required');
          return;
        }

        if (tr.nbInstances === undefined || tr.nbInstances === null)
          tr.nbInstances = 1;

        const mode = nconf.get('TrainingOnTheCloud:mode');

        let profileObj = {
          source: tr.source,
          target: tr.target,
          public: tr.public === undefined ? true : tr.public,
          deactivated: tr.deactivated,
          users: tr.users,
          groups: tr.groups,
          selectors: tr.selectors
        };
        profileObj = utils.defaultRouteObject(profileObj);

        if (tr.type === undefined) {
          startDirectLanguages(dispatcherVersions, distrib, mode, profileObj, tr.source, tr.target, tr.domain, tr.owner, tr.version || '*', tr.nbInstances, tr.role, tr.engine, cb, tr.size);
          return;
        }
        if (tr.type === 'pivot') {
          profileObj.profileName = tr.profileName || tr.source + tr.target + ' - Pivot profile';
          startFlowLanguages(dispatcherVersions, distrib, mode, profileObj, tr.source, tr.target, tr.pivot, tr.version || '*', tr.nbInstances, cb);
          return;
        }
        winston.error('type not yet supported', tr);
        cb('type not yet supported');
      }, function(err) {
        cb(err);
      });
    },
    function(cb) {
      if (argv.noWait) {
        cb();
        return;
      }

      waitTrConvergence(configure.maxNoConvergenceTry || 180, configure.pollingInterval || 10000, cb);
    }
  ], function(err) {
    if (err) {
      winston.error('Error startLanguagePairs', err);
      cb(err);
      return;
    }
    cb();
  });
}

settings.loadConjurSecretsAndGetConfigStorage().then((secretsConfigStorage) => {
  const dbConfig = settings.getDatabaseConfigFromSecretsStorage(secretsConfigStorage);
  db.init(dbConfig);
  settings.open(function(err) {
    if (err) {
      winston.error('Unable to open settings', err);
      db.close();
      process.exit(1);
    }

    settings.getAndMergeSettings(function(err) {
      if (err) {
        winston.error('Unable to merge settings', err);
        db.close();
        process.exit(1);
      }

      settings.setConfigFromSecretsStorage(secretsConfigStorage);

      require('@systran/node-helpers').winston.init(winston, nconf.get('TrainingOnTheCloud:Log'));

      db.init(nconf.get('TrainingOnTheCloud:Database'), nconf.get('TrainingOnTheCloud:FileTranslation'));
      translationResourceStore.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'));
      const pollerConfig = nconf.get('TrainingOnTheCloud:Poller');
      pollerConfig.returnOnSuccess = true;
      poller.init(pollerConfig);

      const yaml = require('js-yaml');

      try {
        let c = yaml.safeLoad(fs.readFileSync(argv.file, 'utf8'));

        if (!c || !c.Configurator) {
          winston.error('Invalid configuration data');
          process.exit(1);
          return;
        }

        if (c.version !== '2' && c.version !== '2.1') {
          winston.error('Please use configurator config file version: \'2\'');
          process.exit(1);
          return;
        }

        c = c.Configurator;
        winston.info('Configurator file:', argv.file, ':', c);

        db.openAllEnvironments(function(err) {
          if (err) {
            winston.error('Error', err);
            db.close();
            return;
          }

          async.series([
            function(cb) {
              if (!c.computingNodes) {
                cb();
                return;
              }

              async.each(c.computingNodes, function(computingNode, cb) {
                const {hostname, secure } = getServicePathWithHttpsOption(computingNode);
                db.upsertComputingNode({hostname, secure}, function(err) {
                  if (err) {
                    winston.error('Error', err);
                    cb(err);
                    return;
                  }
                  winston.info('Computing Node', hostname, 'registered');
                  cb();
                });
              }, function(err) {
                if (err) {
                  winston.error('Error', err);
                  cb(err);
                  return;
                }
                cb();
              });
            },
            function(cb) {
              if (!c.routingServers) {
                cb();
                return;
              }

              async.each(c.routingServers, function(routingServer, cb) {
                const {hostname, secure } = getServicePathWithHttpsOption(routingServer);
                db.upsertRoutingServer({hostname, secure}, function(err) {
                  if (err) {
                    winston.error('Error', err);
                    cb(err);
                    return;
                  }
                  winston.info('Routing Server', hostname, 'registered');
                  cb();
                });
              }, function(err) {
                if (err) {
                  winston.error('Error', err);
                  cb(err);
                  return;
                }
                cb();
              });
            },
            function(cb) {
              if (!c.dispatchers) {
                cb();
                return;
              }

              async.each(c.dispatchers, function(dispatcher, cb) {
                const {hostname, secure } = getServicePathWithHttpsOption(dispatcher);
                db.upsertDispatcher({hostname, secure}, function(err) {
                  if (err) {
                    winston.error('Error', err);
                    cb(err);
                    return;
                  }
                  winston.info('Dispatcher', hostname, 'registered');
                  cb();
                });
              }, function(err) {
                if (err) {
                  winston.error('Error', err);
                  cb(err);
                  return;
                }
                cb();
              });
            },
            function(cb) {
              if (!c.brokers) {
                cb();
                return;
              }

              async.each(c.brokers, function(broker, cb) {
                const {hostname, secure} = getServicePathWithHttpsOption(broker);
                db.upsertBroker({hostname, secure}, function(err) {
                  if (err) {
                    winston.error('Error', err);
                    cb(err);
                    return;
                  }
                  winston.info('Broker', hostname, 'registered');
                  cb();
                });
              }, function(err) {
                if (err) {
                  winston.error('Error', err);
                  cb(err);
                  return;
                }
                cb();
              });
            },
            function(cb) {
              if (!c.Filters && !c.LanguagePairs) {
                cb();
                return;
              }
              startLanguagePairs(c, function(err) {
                if (err) {
                  winston.error('Error', err);
                  cb(err);
                  return;
                }
                cb();
              });
            }
          ], function(err) {
            if (err) {
              if (err.includes && err.includes('NO_TR_DB')) {
                winston.warn(err);
                winston.info('NO_TR_DB: Please restart ses-configurator later');
                process.exit(126);
                return;
              }
              winston.error('Final configuration error', err);
            }

            const data = {
              success: !err,
              config: c
            };

            db.upsertConfiguration(data, function(error) {
              err = err || error;
              winston.info('End of configuration:', err ? 'failed' : 'success');
              db.close();
              process.exit(err ? 1 : 0);
            });
          });
        });

      }
      catch (e) {
        winston.error(e);
        process.exit(1);
      }
    }, undefined, undefined, undefined, argv.readOnly);
  });
});
