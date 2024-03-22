'use strict';

const settings = require('./lib/settings');
const nconf = require('nconf');

settings.loadConfig();

nconf.set('TrainingOnTheCloud:mode', 'installer');

const winston = require('winston');
require('@systran/node-helpers').winston.init(winston, nconf.get('TrainingOnTheCloud:Log'));
const DEV_MODE = process.env.NODE_ENV === 'docker';

const yargs = require('yargs')
  .usage('Usage: $0')

  .alias('h', 'help')
  .help('h', 'show this help message')

  .alias('f', 'file')
  .describe('f', 'file with installation data in yaml format')

  .alias('o', 'overwrite-settings')
  .describe('o', 'overwrite settings from the database')

  .describe('only-create-config-db-file', 'do not perform a complete installation, only write Database JSON file')

  .default('s', false)
  .default('o', false)
  .default('f', __dirname + (DEV_MODE ? '/install-dev.yaml' : '/install.yaml'))
  .default('only-create-config-db-file', false)

  .example('$0 -f my-install.yaml', 'start installer to read options from "my-install.yaml" file (default to install.yaml)')
  ;

const argv = yargs.argv;

if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

const fs = require('fs');
const async = require('async');
const yaml = require('js-yaml');

const installer = require('./routes/installer');
const licenses = require('./lib/licenses');
licenses.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'));

winston.info('Silent Installation');

let i;

try {
  i = yaml.safeLoad(fs.readFileSync(argv.file, 'utf8'));
}
catch (e) {
  winston.error(e);
  process.exit(1);
}

if (argv['only-create-config-db-file']) {
  winston.info('Only Create Config Database file Installation');
  installer.createConfigDatabaseFile(i.Installer.Database, function(conf, err) {
    if (err) {
      winston.error('Installation failed: ' + err);
      process.exit(1);
    }
    winston.info('Installation OK');
    process.exit(0);
  });
}

if (!i || !i.Installer || !i.Installer.Database || !i.Installer.Administrator) {
  winston.info('Invalid installation data');
  process.exit(1);
}

if (!i.Installer.Console || !i.Installer.Console.publicUrls.https) {
  winston.warn('publicUrls was not defined in a install.yaml file (Console:publicUrls:https)');
  winston.warn('OAuth2 features will not be configured correctly');
}

async.series([
  function(cb) {
    installer.createDatabase(i.Installer.Database, function(err) {
      if (err) {
        cb(err);
        return;
      }

      winston.info('Database OK');
      cb();
    });
  },
  function(cb) {
    if (!i.Installer.Configuration) {
      cb();
      return;
    }
    installer.mergeInstallerConfiguration(i.Installer.Configuration, function(err) {
      if (err) {
        cb(err);
        return;
      }

      winston.info('Merge Installer Configuration OK');
      cb();
    });
  },
  function(cb) {
    installer.createAdministrator(i.Installer.Administrator, function(err) {
      if (err) {
        cb(err);
        return;
      }

      winston.info('Administrator OK');
      cb();
    });
  },
  function(cb) {
    installer.createGroups(i.Installer.Groups, function(err){
      if (err) {
        cb(err);
        return;
      }

      winston.info('Add Groups OK');
      cb();
    });
  },
  function(cb) {
    if (!i.Installer.Licenses) {
      cb();
      return;
    }
    installer.addLicenses(i.Installer.Licenses, function(err) {
      if (err) {
        cb(err);
        return;
      }

      winston.info('Add Licenses OK');
      cb();
    });
  },
  function(cb) {
    installer.createJWKS().then(() => {
      winston.info('Generate JWKS OK');
      cb();
    }).catch((err) => {
      winston.error('Error while generating JWKS');
      cb(err);
    });
  },
  function(cb) {
    installer.createPKCEClients().then(() => {
      winston.info('Create PKCE clients OK');
      cb();
    }).catch((err) => {
      winston.error('Error while creating PKCE clients');
      cb(err);
    });
  },
  function(cb) {
    installer.createGatewayOidcClient(i.Installer.Oidc.credentialsPath).then(() => {
      winston.info('Create Gateway OIDC client OK');
      cb();
    }).catch((err) => {
      winston.error('Error while creating Gateway OIDC client');
      winston.debug(err);
      cb();
    });
  },
  function(cb) {
    installer.createDeviceOidcClient().then(() => {
      winston.info('Create Device Flow OIDC client OK');
      cb();
    }).catch((err) => {
      winston.error('Error while creating Device Flow OIDC client');
      winston.debug(err);
      cb();
    });
  }
], function(err) {
  if (err) {
    winston.error('Installation Failed:', err);
    process.exit(1);
  }
  winston.info('Installation OK');
  process.exit(0);
});
