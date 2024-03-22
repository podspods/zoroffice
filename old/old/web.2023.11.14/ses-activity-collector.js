'use strict';

const nconf = require('nconf');
const fs = require('fs');
const fastify = require('fastify');
const winston = require('winston');
const settings = require('./lib/settings');
const libAccounts = require('./lib/accounts');
const stats = require('./lib/stats');
const models = require('./models');
const routes = require('./routes/activity');
const db = require('./lib/db');
const activity = require('./lib/stats');
const nodeHelpers = require('@systran/node-helpers');
let activityServerVersion;
const winstonworkers = require('@systran/winston-workers');


winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));
settings.loadConfig();
winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));
settings.initSSLConfig();
settings.loadConjurSecretsAndGetConfigStorage().then((secretsConfigStorage) => {
  const dbConfig = settings.getDatabaseConfigFromSecretsStorage(secretsConfigStorage);
  db.init(dbConfig);
  settings.open((err) => {
    if (err) {
      db.close();
      throw new Error(`Unable to open settings: ${err}`);
    }

    settings.getAndMergeSettings((err) => {
      if (err) {
        db.close();
        throw new Error('Unable to merge settings: ' + err);
      }

      settings.setConfigFromSecretsStorage(secretsConfigStorage);

      winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));

      const workers = require('@systran/systranworkers')(winston);
      const workerOptions = {
        workers: nconf.get('TrainingOnTheCloud:Workers:sesActivityCollector') || 2,
        pingTimeout: nconf.get('TrainingOnTheCloud:Workers:pingTimeout') || 60
      };

      workers.init(() => {}, {default: main}, null, workerOptions);
    }, undefined, undefined, undefined, true);
  });
});
async function mainWorkers(){
  models.init(nconf.get('TrainingOnTheCloud:Database')); // init models before any mongoose model usage
  libAccounts.init({User: models.User, ApiKey: models.ApiKey});
  stats.init();
  activity.init();

  await new Promise((resolve, reject) => {
    stats.open((err) => {
      if(err){
        reject(err);
        return;
      }
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    db.openAllEnvironments((err) => {
      if(err){
        reject(err);
        return;
      }
      resolve();
    });
  });
  activityServerVersion = nodeHelpers.utils.searchForVersionFile('./');
}

function initRoutes(app) {
  app.get('/status', function(req, res) {
    res.status(200).send({
      app: {
        name: 'Activity Server',
        version: activityServerVersion
      },
      status: true
    });
  });

  app.post('/activity/stats', routes.post);
  app.post('/api/activity/resources', routes.activityOnResources);
}

async function createApp() {
  const fastifyOpts = {
    logger: nconf.get('TrainingOnTheCloud:Log:level') === 'debug'
  };

  if (nconf.get('TrainingOnTheCloud:ActivityServer:https:activate')) {
    fastifyOpts.https = {
      http2: nconf.get('TrainingOnTheCloud:ActivityServer:https:http2'),
      key: fs.readFileSync(nconf.get('TrainingOnTheCloud:ActivityServer:https:key')),
      cert: fs.readFileSync(nconf.get('TrainingOnTheCloud:ActivityServer:https:cert'))
    };
  }

  const app = fastify(fastifyOpts);

  await mainWorkers();

  initRoutes(app);

  return app;
}

async function createServer() {
  const app = await createApp();

  const port = nconf.get('TrainingOnTheCloud:ActivityServer:port');
  app.listen(port, '0.0.0.0');

  winston.info('Activity Collector Server listening on port ' + port);
}


function main() {
  createServer();
}
