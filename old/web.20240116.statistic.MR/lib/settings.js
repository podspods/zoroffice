const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const winston = require('winston');
const nconf = require('nconf');


function loadConfig() {
  nconf.use('memory');

  const confDir = path.normalize(process.env.NODE_CONFIG_DIR || __dirname + '/../config');
  let confFile = confDir + '/' + process.env.NODE_ENV + '.yaml';

  if (process.env.NODE_ENV && fs.existsSync(confFile)) {
    winston.info('settings', 'load config file', confFile);
    try {
      nconf.overrides(yaml.load(fs.readFileSync(confFile, 'utf8')));
    }
    catch (e) {
      winston.error('settings', 'loadConfig', e);
    }
  }
  else {
    const h = require('os').hostname();

    confFile = confDir + '/' + h + '.yaml';
    if (fs.existsSync(confFile)) {
      winston.info('settings', 'load config file', confFile);
      try {
        nconf.overrides(yaml.load(fs.readFileSync(confFile, 'utf8')));
      }
      catch (e) {
        winston.error('settings', 'loadConfig', e);
      }
    }
  }

  try {
    confFile = confDir + '/default.yaml';
    winston.info('settings', 'load default config file', confFile);
    const defaultConfig = yaml.load(fs.readFileSync(confFile, 'utf8'));
    nconf.defaults(defaultConfig);
  }
  catch (e) {
    winston.error('settings', 'loadConfig', e);
  }
}

exports.loadConfig = loadConfig;
