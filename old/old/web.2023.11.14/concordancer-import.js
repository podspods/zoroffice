'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const request = require('request');
const winston = require('winston');
const corpusManager = require('./lib/corpusManagerClient');
const yaml = require('js-yaml');
const async = require('async');
const fs = require('fs');
const path = require('path');
const licenses = require('./lib/licenses');
const db = require('./lib/db');
const WAIT_FOR = 1000;
const MAX_RETRY = 100;

const argv = require('yargs')
  .usage('Usage: $0 -f concordancer-import-example.yaml --accountId 5890c0becd3c810009a62ada')
  .help('h')
  .alias('h', 'help')
  .alias('f', 'file')
  .describe('f', 'file with configuration data in yaml format')
  .describe('accountId', 'file with configuration data in yaml format')
  .demand(['f', 'accountId'])
  .argv;

settings.loadConfig();

db.init(nconf.get('TrainingOnTheCloud:Database'));

corpusManager.init(nconf.get('TrainingOnTheCloud:CorpusManager'));

licenses.init();
if (!licenses.hasProductLicense('Concordance Search')) {
  winston.error('You must have a Concordancer Licence');
  process.exit(1);
}

function waitForRabbitMQ(displayName, cb) {
  let retry = 0;
  let rabbitmqUrlManagement = nconf.get('TrainingOnTheCloud:Queue:management');
  const user = nconf.get('TrainingOnTheCloud:Queue:user');
  const pass = nconf.get('TrainingOnTheCloud:Queue:pass');
  const auth = { user, pass };
  // remove the end "/"
  const idx = rabbitmqUrlManagement.slice(rabbitmqUrlManagement.length - 1, rabbitmqUrlManagement.length).indexOf('/');
  if (idx !== -1) {
    rabbitmqUrlManagement = rabbitmqUrlManagement.slice(0, rabbitmqUrlManagement.length - 1);
  }

  const interval = setInterval(function() {
    request({ url: rabbitmqUrlManagement + '/api/queues/%2F/CorpusManager.DeferredWork', auth },
      function(err, res, body) {
        const waitForRabbitMQCb = function(err) {
          if(err) {
            winston.error(err);
          }
          clearInterval(interval);
          cb(err);
        };

        if (err || res.statusCode !== 200) {
          retry++;
          winston.info('Retry connection to rabbitmq');
          if (retry > MAX_RETRY) {
            waitForRabbitMQCb(new Error('Problem with the queue'));
          }
          return;
        }

        const json = JSON.parse(body);
        if (json.idle_since !== undefined) {
          winston.info('Queue available since:', json.idle_since);
          waitForRabbitMQCb();
          return;
        }

        winston.info('RabbitMQ DeferredWork', 'Wait for', displayName, 'to finish indexation.', '(sleep for', WAIT_FOR / 1000, 'seconds)');
      }
    );
  }, WAIT_FOR);
}

function sequence(accountId, filepath, displayName, hidden, cb) {
  importCorpus(accountId, filepath, displayName, hidden, function(err, data) {
    if (err) {
      winston.error(err);
      cb(err);
      return;
    }

    waitForRabbitMQ(displayName, function(err) {
      if (err) {
        winston.error(err);
        cb(err);
        return;
      }
      cb(null, data);
    });
  });
}

function importCorpus(accountId, filepath, displayName, hidden, callback) {

  let format = '';
  let corpus = null;
  if (!fs.existsSync(filepath)) {
    callback(new Error('File ', filepath, ' doesn\'t exists'));
    return;
  }
  corpus = fs.createReadStream(filepath);

  if (path.extname(filepath) === '.tmx') {
    format = 'application/x-tmx+xml';
  }
  else {
    format = 'text/bitext';
  }

  let filename;
  if (hidden === true) {
    filename = '/hidden/' + displayName;
  }
  else {
    filename = '/' + displayName;
  }
  winston.info('Import file', filepath, 'as', displayName, new Date());

  // TODO: this script are not working since SPNS 9.5, we need to specify the correct corpus length before send request
  const corpusLength = 0;

  corpusManager.import(undefined, accountId, filename, format, corpus, ['es2', 'align', 'context'], 'systran_concordancer', corpusLength, function(err, id) {
    if (err) {
      callback(err);
      return;
    }

    winston.info('Import file', filepath, 'as', displayName, ': finished', new Date());

    db.upsertResourcePermission('concordance', { fileId: id, accountId: accountId }, {
      ownerId: accountId,
      fileId: id,
      accountId: accountId,
      permission: 'all',
      updatedBy: accountId
    }, function(err) {
      if (err)
        winston.warn('upsertResourcePermission', 'concordance', err);

      callback(null, { path: filepath, displayName: displayName, hidden: hidden, id: id });
    });
  });
}

function run() {
  const corpora = yaml.safeLoad(fs.readFileSync(argv.file, 'utf8')).Corpora;
  const tasks = [];

  for (let i = 0; i < corpora.length; i++) {
    tasks.push(add(argv.accountId, path.join(path.dirname(argv.file), corpora[i].path), corpora[i].displayName, corpora[i].hidden));
  }
  function add(accountId, path, displayName, hidden) {
    return function(callback) {
      sequence(accountId, path, displayName, hidden, callback);
    };
  }
  db.openResources(function() {
    waitForRabbitMQ('potential previous corpus', function(err) {
      if (err) {
        winston.error(err);
        process.exit(1);
      }
      async.series(tasks, function(err, results) {
        if (err) {
          winston.error('Final error', err);
          process.exit(1);
        }
        results.forEach(function(item) {
          winston.info('Succesfull import for', item);
        });
        process.exit(0);
      });
    });
  });

}

// global call
run();
