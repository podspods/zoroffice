'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const _ = require('lodash');
const async = require('async');

settings.loadConfig();

const winston = require('winston');

settings.initSSLConfig();

settings.loadConjurSecretsAndGetConfigStorage().then((secretsConfigStorage) => {
  const db = require('./lib/db');
  const dbConfig = settings.getDatabaseConfigFromSecretsStorage(secretsConfigStorage);
  db.init(dbConfig);
  const translationResourceStore = require('./routes/translationResourceStore');
  translationResourceStore.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'));

  settings.open(function(err) {
    if (err) {
      db.close();
      throw new Error('Unable to open settings: ' + err);
    }

    settings.getAndMergeSettings(function(err) {
      if (err) {
        db.close();
        throw new Error('Unable to merge settings: ' + err);
      }

      settings.setConfigFromSecretsStorage(secretsConfigStorage);

      require('@systran/node-helpers').winston.init(winston, nconf.get('TrainingOnTheCloud:Log'));

      db.init(nconf.get('TrainingOnTheCloud:Database'), nconf.get('TrainingOnTheCloud:FileTranslation'));

      const poller = require('./lib/poller');
      const pollerConfig = nconf.get('TrainingOnTheCloud:Poller');
      pollerConfig.returnOnSuccess = false;
      poller.init(pollerConfig);

      const systranLicense = require('./lib/licenses');
      systranLicense.disable();

      async function environmentPolling() {
        return new Promise((resolve) => {
          db.openAllEnvironments(function(err) {
            if (err) {
              winston.error('Unable to open envDb');
              resolve();
              return;
            }

            poller.computingNodePolling();
            poller.routingServerPolling();
            poller.brokerPolling();
            poller.dispatcherPolling();
            poller.redisCachePolling();
            resolve();
          });
        });
      }

      function componentsPolling() {
        db.getMainComponents(function(err, data) {
          if (err) {
            winston.error('Unable to open monitoringDb');
            return;
          }
          if(!data || !data.components){
            winston.warn('No components are defined in Db');
            return;
          }

          _.forEach(data.components, function(conf, type) {
            poller.componentPolling(conf, type);
          });
        });
      }

      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      async function worker(){
        componentsPolling();
        try {
          await poller.trsLocalPolling(); // TRS Console Polling
        }
        catch (exp) {
          winston.warn('Polling failed:', exp);
        }

        try {
          await timeout(pollerConfig.pollingInterval || 5000);
          await worker();
        }
        catch (exp) {
          winston.error(exp);
        }
      }
      async.series([
        function(cb) {
          db.openTr(function(err) {
            if (err) {
              winston.error('Unable to open Tr Db: ', err);
            }
            cb(err);
          });
        },
        function(cb) {
          db.openProfiles(function(err) {
            if (err) {
              winston.error('Unable to open Profiles Db: ', err);
            }
            cb(err);
          });
        }
      ], async function(err) {
        if(err){
          db.close();
          throw new Error('Unable to open Db: ' + err);
        }

        await environmentPolling();
        await worker();
      });
    }, undefined, undefined, undefined, true);
  });
});

