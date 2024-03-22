'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');
const winston = require('winston');
const db = require('./lib/db');
const {promisify} = require('util');
const fs = require('fs');

const yargs = require('yargs')
  .usage('Usage: $0')
  .alias('h', 'help')
  .help('h', 'show this help message')
  .alias('f', 'file')
  .describe('f', 'json file contains data about inactive groups')
  .demandOption('f')
  .alias('d', 'delete')
  .describe('d', 'delete all inactive free trial groups and users')
  .default('d', false)
  .example('$0', 'Start extracting and delete all inactive free trial groups and users from db')
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

async function removeInactiveUsers() {
  const argv = yargs.argv;
  await init();
  const models = require('./models');
  models.init(nconf.get('TrainingOnTheCloud:Database'));

  try {
    winston.info('Start extracting all inactive free trial groups and users ...');
    const jsonData = fs.readFileSync(argv.file, 'utf8');
    const data = JSON.parse(jsonData);
    const spnsIds = data.map((item) => item.spnsId);
    const inactiveGroups = await models.Group.find({_id: {$in: spnsIds}});
    const inactiveUsers = [];
    for (const gr of inactiveGroups) {
      inactiveUsers.push(...gr.users);
    }
    const inactiveGroupIds = inactiveGroups.map((g) => g._id);
    const inactiveUserIds = inactiveUsers.map((u) => u.id);
    winston.info('Total:', inactiveGroupIds.length, 'groups and', inactiveUserIds.length + ' users');
    if (argv.delete && (inactiveUserIds.length || inactiveGroupIds.length)) {
      winston.info('Start deleting all inactive free trial groups and users ...');
      await models.User.deleteMany({_id: {$in: inactiveUserIds}});
      await models.Role.updateMany({'users.id': {$in: inactiveUserIds}},
        {$pull: {users: {id: {$in: inactiveUserIds}}}});
      await models.Group.deleteMany({_id: {$in: inactiveGroupIds}});
      await models.Role.updateMany({'groups.id': {$in: inactiveGroupIds}},
        {$pull: {groups: {id: {$in: inactiveGroupIds}}}});
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

removeInactiveUsers().then();
