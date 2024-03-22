'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const winston = require('winston');
const winstonworkers = require('@systran/winston-workers');
const db = require('./lib/db');
const systranLicense = require('./lib/licenses');
const FileTranslationWorker = require('./lib/fileTranslation/Worker');
const redisLib = require('./lib/fileTranslation/redisTranslation');
winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));

settings.loadConfig();
winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));
systranLicense.disable();

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
        workers: nconf.get('TrainingOnTheCloud:Workers:sesFileTranslationConsumer') || 2,
        pingTimeout: nconf.get('TrainingOnTheCloud:Workers:pingTimeout') || 60
      };

      workers.init(() => {}, { default: startFileTranslationWorker }, null, workerOptions);
    }, undefined, undefined, undefined, true);
  });
});

function startFileTranslationWorker() {
  redisLib.init(nconf);

  const worker = new FileTranslationWorker(undefined, undefined, redisLib);

  worker.on('ready', () => {
    winston.info('Worker started : ', worker.id);
  });
  worker.on('error', (e) => {
    winston.error('Worker error : ', e);
  });
  worker.on('exit', (e) => {
    winston.warn('Worker exited');
    process.exit(1);
  });
  registerExitCb(worker);
}

function registerExitCb(worker) {
  const register = (event) => {
    process.on(event, async () => {
      try {
        winston.info('Exiting ses-file-translation-consumer ...');
        await worker.exit();
      }
      catch(e) {
        winston.error('Error while disconnecting from worker queues ...', e);
        process.exit(1);
      }
    });
  };
  register('SIGINT');
}
