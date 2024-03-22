'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const axios = require('axios');
const winston = require('winston');
const FormData = require('form-data');
const util = require('util');
const groups = require('./lib/groups');
const db = require('./lib/db');
const { promisify } = require('util');

const yargs = require('yargs')
  .usage('Usage: $0')

  .alias('h', 'help')
  .help('h', 'show this help message')

  .alias('d', 'delete')
  .describe('d', 'delete all listed orphan data')
  .alias('t', 'type')
  .describe('t', 'resource type (UD/TM/ND or default ALL)')
  .alias('o', 'onlyUsersWithData')
  .describe('o', 'only lists information about users with orphaned data')
  .default('d', false)
  .default('t', 'ALL')
  .default('o', false)

  .example('$0', 'start extracting information about orphan data (all resources not linked to users) from db')
;

async function init() {
  try {
    settings.loadConfig();
    settings.initSSLConfig();
    db.init(nconf.get('TrainingOnTheCloud:Database'));
    await promisify(settings.open)();
    await new Promise((resolve, reject) => {
      settings.getAndMergeSettings((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }, null, null, null, true);
    });
  }
  catch (e) {
    winston.error(e);
    process.exit(1);
  }
}

async function getListDictionary(GdictUrl, account_id) {
  try {
    const data = await axios.get(`${GdictUrl}/dictionary/list?account_id=${account_id}`);
    return data.data;
  }
  catch (e) {
    winston.error(e);
    return process.exit(1);
  }
}

async function removeDictionary(GdictUrl, account_id, dict_ids) {
  try {
    for (const dict_id of dict_ids) {
      await axios.get(`${GdictUrl}/dictionary/remove?account_id=${account_id}&dict_id=${dict_id}`);
    }
  }
  catch (e) {
    winston.error(e);
    process.exit(1);
  }
}

async function getListCorpus(CorpusManagerUrl, account_id) {
  try {
    const formData = new FormData();
    formData.append('accountId', account_id);
    const response = await axios.post(`${CorpusManagerUrl}/corpus/list`, formData, {
      headers: formData.getHeaders()});
    return response.data;
  }
  catch (e) {
    winston.error(e);
    return process.exit(1);
  }
}

async function deleteCorpus(CorpusManagerUrl, accountId, corpusIds) {
  try {
    await axios.get(`${CorpusManagerUrl}/corpus/delete?accountId=${accountId}&id=${corpusIds.join('&id=')}`);
  }
  catch (e) {
    winston.error(e);
    process.exit(1);
  }
}

async function extractOrphanData() {
  const argv = yargs.argv;
  await init();
  const models = require('./models');
  models.init(nconf.get('TrainingOnTheCloud:Database'));
  const GdictUrl = nconf.get('TrainingOnTheCloud:Dictionary').GDict.url;
  const CorpusManagerUrl = nconf.get('TrainingOnTheCloud:CorpusManager').url;
  winston.info('Start listing all orphan data relative to the user ...');

  try {
    const users = await groups.getInactiveUserViaGroup();
    const listTm = {};
    const listDict = {};
    for (const user of users) {
      const tmData = await getListCorpus(CorpusManagerUrl, user.id);
      const dictionaryData = await getListDictionary(GdictUrl, user.id);
      if (argv.onlyUsersWithData && !tmData.files.length && !dictionaryData.dictionaries.length) continue;
      listTm[user.id] = tmData.files.map((tm) => tm.id);
      listDict[user.id] = dictionaryData.dictionaries.map((dict) => dict.id);

      let userInfo = {
        name: user.name,
        email: user.email,
        enable: user.enable,
        groups: user.groups
      };
      if (argv.type === 'TM') {
        userInfo.tm = tmData.files;
        if (argv.onlyUsersWithData && !userInfo.tm.length) continue;
      }
      else if (argv.type === 'UD') {
        userInfo.ud = dictionaryData.dictionaries.filter((dict) => dict.type === 'UD');
        if (argv.onlyUsersWithData && !userInfo.ud.length) continue;
      }
      else if (argv.type === 'ND') {
        userInfo.nd = dictionaryData.dictionaries.filter((dict) => dict.type === 'NORM');
        if (argv.onlyUsersWithData && !userInfo.nd.length) continue;
      }
      else {
        const updateInfo = {
          tm: tmData.files,
          ud: dictionaryData.dictionaries.filter((dict) => dict.type === 'UD'),
          nd: dictionaryData.dictionaries.filter((dict) => dict.type === 'NORM')
        };
        userInfo = {...userInfo, ...updateInfo};
      }

      console.log(util.inspect(userInfo, false, null, true)); /* eslint-disable-line no-console */
      console.log('============================================================='); /* eslint-disable-line no-console */
    }

    if (argv.delete) {
      winston.info('Start deleting all orphan data ...');
      for (const [accountId, corpusIds] of Object.entries(listTm)) {
        if (corpusIds.length) {
          await deleteCorpus(CorpusManagerUrl, accountId, corpusIds);
        }
      }
      for (const [account_id, dict_ids] of Object.entries(listDict)) {
        if (dict_ids.length) {
          await removeDictionary(GdictUrl, account_id, dict_ids);
        }
      }
    }

    winston.info('All jobs are completed!');
    process.exit(0);
  }
  catch (e) {
    winston.error(e);
    models.close();
    process.exit(1);
  }
}

extractOrphanData().then();
