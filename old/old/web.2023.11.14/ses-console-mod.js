'use strict';

const yargs = require('yargs')
  .usage('Usage: $0')

  .alias('r', 'readOnly')
  .describe('r', 'only read configurations from settings db. Do not read from files, neither perform any merge to db')

  .default('readOnly', false)

  .describe('only-config-files', 'do not load settings from database')
  .default('only-config-files', false)
;
const argv = yargs.argv;
if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

const async = require('async');
const _ = require('lodash');
const nconf = require('nconf');
const winston = require('winston');
const passport = require('passport'); // passport used in authentication-providers
const serverTools = require('@systran/node-server-tools');
const settings = require('./lib/settings');
const db = require('./lib/db');
const models = require('./models');
const QueueManager = require('./lib/fileTranslation/queues/QueueManager');
const FileConsumptionQueue = require('./lib/fileTranslation/queues/FileConsumptionQueue');
const information = require('./lib/information');
const groups = require('./lib/groups');
const preferences = require('./lib/preferences');
const tokens = require('./lib/tokens');
const feedbacks = require('./lib/feedbacks');
const stats = require('./lib/stats');
const limits = require('./lib/limits');
const systranLicense = require('./lib/licenses');
const iamFilters = require('@systran/iam/routes/middleware/iamFilters');
const iamFilter = require('@systran/iam/routes/middleware/iamFilter');
const iamAuthorization = require('@systran/iam/routes/middleware/iamAuthorization');
const { charactersConsumptionAuthorization, setCharactersConsumption } = require('./routes/middleware/groupsCharactersConsumption');
const { usageAuthorization, setUsage } = require('./routes/middleware/groupsLimits');
const libOidc = require('./lib/oidc');
const jwksHandler = require('./lib/oidc/jwksHandler');
const clientHandler = require('./lib/oidc/clientHandler');
const buildSelectors = require('./lib/translate/buildSelectors');
const routes = require('./routes');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const feedback = require('./routes/feedback');
const activity = require('./routes/activity');
const translate = require('./routes/translate');
const monitoring = require('./routes/monitoring');
const notifications = require('./routes/notifications');
const domainRoutes = require('./routes/domains');
const definePasswordTokens = require('./lib/definePasswordTokens');
const libPassword = require('@systran/iam/lib/password/passwordLib');
const rulesConfig = require('./lib/passwordRules/rules.json');
const limitRoutes = require('./routes/limits');
const { getSupportedFeatures } = require('./routes/supportedFeatures');
const { getSupportedSelectors } = require('./routes/supportedSelectors');
const cors = require('cors');

let app;
let cookieName;
let withResetPassword;
let withLimits;
let resetPassword;
let resetPasswordTokens;
let coversSes;
let queueManager;
const setNoCache = routes.setNoCacheMiddleware;
const checkAjaxRequestHeader = routes.checkAjaxRequestHeader;

function initDBConfig() {
  settings.initSSLConfig();
}

function initApp(cb) {
  const csrf = require('csurf');
  const http = require('http');
  const https = require('https');
  http.globalAgent.maxSockets = Infinity;
  https.globalAgent.maxSockets = Infinity;

  const gdict = new (require('@systran/gdictjs'))(nconf.get('TrainingOnTheCloud:Dictionary:GDict'));
  const timeout = nconf.get('TrainingOnTheCloud:Security:TranslateBox:timeout') || 120000;// 2*60*1000
  const dispatcherClient = require('@systran/dispatcher-client');
  dispatcherClient.init({
    product: 'SYSTRAN Pure Neural® Server',
    userAgent: 'SES Console',
    timeout: timeout
  }, winston);

  models.init(nconf.get('TrainingOnTheCloud:Database')); // init models before any mongoose model usage

  const UploadMiddleware = require('./lib/uploadMiddleware');
  const cmUpload = new UploadMiddleware('cmUpload');
  const cmAppend = new UploadMiddleware('cmAppend');
  const csUpload = new UploadMiddleware('csUpload');
  const fileTranslationUpload = new UploadMiddleware('fileTranslationUpload');

  const permissions = require('./lib/permissions');
  const libAccounts = require('./lib/accounts');
  const apiKeys = require('./lib/apiKeys');
  const quotas = require('./lib/quotas');
  const libRoles = require('./lib/roles');
  const libUtils = require('./lib/utils');
  const libCorpusManager = require('./lib/corpusManagerClient');
  const { getFileFormatWhitelistAll } = require('./lib/fileWhitelist');
  const applicationHealth = require('./lib/applicationHealth');

  const account = require('./routes/account');
  const accounts = require('./routes/accounts');
  const dictionary = require('./routes/gdict/dictionary');
  const normalization = require('./routes/gdict/normalization');
  const corpusManager = require('./routes/corpusManager');
  const concordanceSearch = require('./routes/concordanceResources');
  const routeInformation = require('./routes/information');
  const profileManager = require('./routes/profileManager');
  const libProfileManager = require('./lib/profileManager');
  const resources = require('./routes/resources');
  const lookup = require('./routes/lookup');
  const concordance = require('./routes/concordance');
  const routeLicenses = require('./routes/licenses');
  const signup = require('./routes/signup');
  const translationResource = require('./routes/translationResource');
  const translationResourceStore = require('./routes/translationResourceStore');
  const computingNode = require('./routes/computingNode');
  const envRoute = require('./routes/envRoute');
  const routeGroups = require('./routes/groups');
  const envService = require('./routes/envService');
  const envQueue = require('./routes/queue');
  const fileTranslation = require('./routes/fileTranslation');
  const sessionRoute = require('./routes/session');
  const roles = require('./routes/roles');
  const routeSettings = require('./routes/settings');
  const routeOidcApi = require('./routes/oidc/api');
  const routeOidcSession = require('./routes/oidc/session');
  const rulesRouter = require('./routes/rules');
  const translateHealthRouter = require('./routes/translateHealth');

  translate.init();
  libAccounts.init({User: models.User, ApiKey: models.ApiKey, Group: models.Group, Role: models.Role});
  account.init({Domain: models.Domain});
  accounts.init({User: models.User, Group: models.Group, Role: models.Role});
  apiKeys.init();
  apiRoutes.init();
  dictionary.init();
  normalization.init();
  corpusManager.init();
  concordanceSearch.init();
  libCorpusManager.init(nconf.get('TrainingOnTheCloud:CorpusManager'));
  envService.init({mode: nconf.get('TrainingOnTheCloud:mode'), Gdict: gdict, User: models.User, Group: models.Group});
  feedback.init(nconf.get('TrainingOnTheCloud'), gdict);
  feedbacks.init();
  fileTranslation.init(nconf.get('TrainingOnTheCloud:CorpusManager'));
  groups.init({Group: models.Group, User: models.User, Role: models.Role});
  routeGroups.init({User: models.User, Group: models.Group});
  domainRoutes.init({Domain: models.Domain});
  permissions.init({
    concordance: systranLicense.covers('Concordance Search'),
    advancedGroupsManagement: systranLicense.covers('users') === -1, // if nb users is unlimited, we allow advancedGroupsManagement features and roles (licence level 4)
    systranlinks: nconf.get('TrainingOnTheCloud:Auth:systranlinksRole')
  });
  preferences.init();
  profileManager.init(nconf.get('TrainingOnTheCloud:TranslationResourceManagerSES'),
    nconf.get('TrainingOnTheCloud:EngineManager'),
    nconf.get('TrainingOnTheCloud:Dictionary'),
    nconf.get('TrainingOnTheCloud:TranslationResourceStore'),
    gdict);
  libProfileManager.init(nconf.get('TrainingOnTheCloud:CorpusManager:url'));
  buildSelectors.init({enablePreferredDomain: nconf.get('TrainingOnTheCloud:Features:PreferredDomain:enable')});
  quotas.init();
  lookup.init(nconf.get('TrainingOnTheCloud:Dictionary'), gdict);
  resources.init(gdict);
  libRoles.init();
  roles.init();
  signup.init();
  stats.init();
  limits.init({getAggregatedStatsManagerMethod: stats.getAggregatedStatsManager});
  tokens.init();
  definePasswordTokens.init();
  translationResource.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'), nconf.get('TrainingOnTheCloud:TranslationResourceManagerSES'));
  translationResourceStore.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'));
  applicationHealth.init();

  withResetPassword = nconf.get('TrainingOnTheCloud:Security:withResetPassword') || false;
  withLimits = nconf.get('TrainingOnTheCloud:Stats:AggregatedStats:Limits:enabled') || false;
  if (withResetPassword) {
    resetPassword = require('./routes/resetPassword');
    resetPassword.init();
    resetPasswordTokens = require('./lib/resetPasswordTokens');
    resetPasswordTokens.init();
  }

  libPassword.init(nconf.get('TrainingOnTheCloud:Security:Password:policy'), rulesConfig);
  function configureUpload(module) {
    module.configure({
      cmUrl: nconf.get('TrainingOnTheCloud:CorpusManager:url')
    });
  }

  configureUpload(cmUpload);
  configureUpload(cmAppend);
  configureUpload(csUpload);

  app = serverTools.createConsoleApp();
  // serverTools.cors.allowCrossDomainV2({originCorsWhitelist: nconf.get('TrainingOnTheCloud:Security:Advanced:Csp:frameAncestors')});
  const corsOptions = {
    origin: nconf.get('TrainingOnTheCloud:Security:Advanced:Csp:frameAncestors'),
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));

  serverTools.i18n.registerApp(app);
  const User = models.User;

  const externalEndpoint = '/external';
  let authConfig = nconf.get('TrainingOnTheCloud:Auth');
  authConfig.enabledProviders = _.union(authConfig.enabledProviders, [nconf.get('TrainingOnTheCloud:Auth:mode')]);

  const cookiesOptions = serverTools.utils.getCookieOptions();
  cookiesOptions.maxAge = nconf.get('TrainingOnTheCloud:Security:Cookies:maxAge') || 86400000; // One day if no HTTPS

  if (nconf.get('TrainingOnTheCloud:https:activate')) {
    authConfig.nodeHost = nconf.get('TrainingOnTheCloud:Console:publicUrls:https');
  }
  else {
    authConfig.nodeHost = nconf.get('TrainingOnTheCloud:Console:publicUrls:http');
  }
  authConfig.bruteForce = serverTools.bruteForce;
  authConfig = authRoutes.buildAuthenticationProvidersConfiguration(authConfig);
  authConfig.externalEndpoint = externalEndpoint;
  const authenticationProviders = require('@systran/authentication-providers')({
    getUserFunction: function(user, cb) {
      User.findByProviderAndProviderIdAndMergeUpsert(user.providerId, 'oauth', user, function(err, user) {
        if (err) {
          winston.error(err);
          cb(err);
          return;
        }
        if (user.enable) {
          cb(null, user.toObject()); // don't return a modifiable User object, for security
          return;
        }
        cb(null, false, { message: 'User disabled.' });
      });
    },
    serializeUser: function(user, done) {
      done(null, user.id);
    },
    deserializeUser: async function(id, done) {
      try {
        const user = await models.User.findById(id, { stats: 0 });
        if (!user) {
          winston.warn('passport.deserializeUser', id, 'not found in db');
          done(null, false);
          return;
        }
        if (user.enable) {
          done(null, user.toObject()); // don't return a modifiable User object, for security
          return;
        }
        done(null, false, { message: 'User disabled.' });
      }
      catch(err) {
        winston.error(err);
        done(err);
      }
    },
    passport,
    successRoute: '/',
    failureRoute: '/unauthorized',
    Auth: authConfig,
    cookieProvider: {
      name: 'ses.provider',
      options: cookiesOptions
    },
    sessionManager: serverTools.sessionManager
  });

  permissions.setFailureHandler(function(req, res) {
    res.status(403);
    const accept = req.acceptsForError();

    if (accept === 'html') {
      // web page
      if (req.user && !req.user.isAnonymousUser) { // user is authenticated
        res.render('error', {
          title: 'Forbidden',
          error: req.i18n.t('You are not authorized to access this page !')
        });
      }
      else {
        res.redirect(`/signin?service=${req.url}`); // we will redirect the user to req.url after login
      }
    }
    else if (accept === 'json') {
      res.json({ error: '403 Forbidden' });
    }
    else {
      res.send('403 Forbidden');
    }
  });

  const auth = function(actions) {
    return permissions.check(actions);
  };
  const actions = permissions.actions;

  iamFilters.init({Group: models.Group});
  iamFilter.init({actions, iamFilters: iamFilters.filters});
  iamAuthorization.init({logger: winston, actions, iamFilters: iamFilters.filters, User: models.User, Group: models.Group, Role: models.Role});

  app.use(routes.initializeResourcePrefix());

  app.get(`${externalEndpoint}/resume`, interactionPausedMiddleware);
  function interactionPausedMiddleware(req, res, next) {
    const interactionPaused = req.cookies['_interaction.paused'];
    if (!interactionPaused) {
      next();
      return;
    }
    res.clearCookie('_interaction.paused');
    res.clearCookie('_redirection'); // we clear the _redirection cookie to avoid issues when login with ext/addins
    res.redirect(`/oidc/interaction/${interactionPaused}`);
  }

  if (authenticationProviders) {
    app.use(authenticationProviders);
  }

  apiRoutes.initAuth(app);

  app.use(User.anonymousMiddleware()); // after passport and before permissions middlewares
  serverTools.utils.enableIsConnectedCookie(app, 'ses');
  serverTools.utils.enableIsConnectedLocals(app);
  app.use(permissions);
  app.use(routes.setDefaultHeaders);

  app.use((req, res, next) => {
    const userLanguage = _.get(req, 'user.localizationLanguage', 'auto');
    if (!req.i18n || userLanguage === 'auto') {
      next();
      return;
    }

    req.i18n.changeLanguage(req.user.localizationLanguage).then(() => next()).catch(next);
  });

  const coversFeature = systranLicense.coversFeatureMiddleware;
  coversSes = coversFeature('ses10');

  const csrfCheckOtherMethods = serverTools.csrf.checkHTTPMethods;
  function initUploadModules(resourcePath, whitelist, uploadModule, feature, authObj, fileHandlerOptions = {}, additionalMiddlewares = []) {
    fileHandlerOptions.acceptFileTypes = new RegExp('(\\.|\\/)(' + libUtils.manageFileUploadWhitelist(whitelist).join('|') + ')$', 'i');
    fileHandlerOptions.maxFileSize = fileHandlerOptions.largerFileSize ? fileHandlerOptions.largerFileSize * 1024 * 1024 : nconf.get('TrainingOnTheCloud:Security:FileUpload:sizeLimit');
    app.use(resourcePath, coversSes);
    if(feature){
      app.use(resourcePath, coversFeature(feature));
    }
    app.use(resourcePath, csrf());
    app.use(resourcePath, csrfCheckOtherMethods);
    if(Array.isArray(authObj)){
      app.use(resourcePath, auth(authObj));
    }
    else if (authObj) {
      app.use(resourcePath, function(req, res, next) {
        if (req.method === 'POST') {
          auth(authObj.write)(req, res, next);
        }
        else {
          auth(authObj.read)(req, res, next);
        }
      });
    }
    additionalMiddlewares.forEach(function(additionalMiddleware) {
      app.use(resourcePath, additionalMiddleware);
    });
    app.use(resourcePath, uploadModule.fileHandler(fileHandlerOptions));
  }

  initUploadModules('/concordanceSearch/upload', nconf.get('TrainingOnTheCloud:Security:FileUpload:WhiteList:corpus'), csUpload, 'Concordance Search', [actions.RSC_CONCORDANCE]);
  initUploadModules('/corpusManager/upload', nconf.get('TrainingOnTheCloud:Security:FileUpload:WhiteList:corpus'), cmUpload, 'translation memory', [actions.RSC_TM]);
  initUploadModules('/corpusManager/append', nconf.get('TrainingOnTheCloud:Security:FileUpload:WhiteList:corpus'), cmAppend, 'translation memory', actions.RSC_TM_ALL);

  queueManager = new QueueManager([FileConsumptionQueue], nconf.get('TrainingOnTheCloud:Queue'), winston, {reconnect: true, maxRetry: 100});
  queueManager.on('error', (e) => {
    winston.error('Queue manager error', e);
  });
  const largerFileSize = _.max(_.map(nconf.get('TrainingOnTheCloud:Security:FileUpload:FileTranslationType'), (sizeCategory) => sizeCategory.size));
  initUploadModules('/fileTranslation/upload', getFileFormatWhitelistAll(), fileTranslationUpload, undefined, undefined, {largerFileSize, queueManager, queueName: FileConsumptionQueue.NAME}, [charactersConsumptionAuthorization, usageAuthorization]);

  app.use(routes.initialize());

  if (nconf.get('TrainingOnTheCloud:env') === 'DEV') {
    app.locals.pretty = true;
  }

  app.locals = _.extend(app.locals, routes.locals);

  app.get('/signin', (req, res) => {
    if (['local', 'ldap'].includes(nconf.get('TrainingOnTheCloud:Auth:mode'))) {
      // signin started from the iframe because the session in iframe has expired
      if (req.query.service && req.query.service.startsWith('/views/')) {
        routes.authSuccess(req, res);
        return;
      }
    }

    res.redirect(`/authentication/${nconf.get('TrainingOnTheCloud:Auth:mode')}`);
  });

  app.get('/', translateRedirectMiddleware);

  // TODO: remove this route after the migration of signin page in the front-end server
  // this blank page execute a parent reload
  app.get('/auth_success', routes.authSuccess);

  function translateRedirectMiddleware(req, res) {
    if (nconf.get('TrainingOnTheCloud:Security:TranslateBox:exposeTranslateFree')) {
      routes.translate(req, res);
      return;
    }
    res.redirect('/auth_success');
  }

  gdict.options.securityFct = {
    read: [auth(actions.RSC_DICT_ALL.concat(actions.RSC_NORM_ALL))],
    write: [auth(actions.RSC_DICT_ALL.concat(actions.RSC_NORM_ALL))],
    create: [auth([actions.RSC_DICT, actions.RSC_NORM])]
  };
  gdict.options.getAccount = serverTools.utils.getAccountId;
  gdict.options.getResourceVisibilityForUser = resources.getResourceVisibilityForUser;
  gdict.options.deleteResourceVisibility = db.deleteResourceVisibility;
  gdict.options.getResourceVisibility = db.getResourceVisibility;
  gdict.options.filePrefix = '/components/gdict/';
  gdict.options.apiPrefix = '/gdict/';
  gdict.register(app);


  app.get('/detectLanguage', routes.setSameOriginFrameHeader, checkAjaxRequestHeader, translate.detectLanguage);
  app.post('/detectLanguage', checkAjaxRequestHeader, translate.detectLanguage);

  // No Auth
  app.get('/dispatcher', coversSes, setNoCache, fileTranslation.getDispatcher);
  app.get('/activeProfiles/names', setNoCache, envService.getAllActiveProfilesNames); // used by gateway on soap input interface

  app.get('/api/user/self', coversSes, auth(actions.USER_INFO), accounts.authenticateSelf); // if authenticated, return UserData Object
  app.get('/api/user/authenticate', coversSes, auth(actions.ADMIN_USERS), accounts.authenticate); // if authenticated, return UserData Object
  app.get('/api/user/self/authorize', coversSes, auth(actions.USER_INFO), accounts.verifyAccessSelf); // if authorized, return hasAccess: true, otherwise hasAccess: false
  app.get('/api/user/:accountId/authorize', coversSes, auth(actions.ADMIN_USERS), accounts.verifyAccess); // if authorized, return hasAccess: true, otherwise hasAccess: false
  app.post('/api/user/:userId/role/push/:roleId', coversSes, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), accounts.pushRole);
  app.post('/api/user/:userId/role/pull/:roleId', coversSes, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), accounts.pullRole);


  app.get('/api/translate/lps', coversSes, auth(actions.TRSL_ALL), translate.getLanguagePairs); // used by ses-translation-gateway /supportedLanguages
  app.get('/api/translate/supportedFeatures', coversSes, getSupportedFeatures); // used by ses-translation-gateway /supportedFeatures
  app.get('/translate/supportedFeatures', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, getSupportedFeatures);
  app.get('/api/translate/supportedSelectors', coversSes, getSupportedSelectors); // used by ses-translation-gateway /supportedSelectors
  app.get('/translate/supportedSelectors', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, getSupportedSelectors);
  app.get('/api/activeProfiles/names', envService.getActiveProfilesNames); // used by ses-translation-gateway, /supportedProfiles call
  app.get('/translate/supportedProfiles', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, envService.getActiveProfilesNames);

  app.get('/api/activity', coversSes, auth(actions.ADMIN_STATS), activity.get);
  app.get('/api/activity/user/personal', coversSes, auth(actions.USER_PERSONAL_STATS), activity.getUserPersonal);
  app.get('/api/activity/user/personal/details', coversSes, auth(actions.USER_PERSONAL_STATS), activity.getUserPersonalDetails);
  app.get('/api/activity/user/:id', coversSes, auth(actions.USERS_STATS), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), activity.getUser);
  app.get('/api/activity/user/:id/details', coversSes, auth(actions.USERS_STATS), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), activity.getUserDetails);
  app.get('/api/activity/group/:id', coversSes, auth(actions.GROUPS_STATS), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), activity.getGroup);
  app.get('/api/activity/group/:id/details', coversSes, auth(actions.GROUPS_STATS), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), activity.getGroupDetails);
  app.get('/api/activity/csv', coversSes, auth(actions.ADMIN_STATS), activity.getCsv);
  app.get('/api/activity/details', coversSes, auth(actions.ADMIN_STATS), activity.getDetails);
  app.get('/api/activity/details/csv', coversSes, auth(actions.ADMIN_STATS), activity.getDetailsCsv);
  app.get('/api/activity/credential/:id', coversSes, setNoCache, activity.getCredential);
  app.get('/api/activity/credential/:id/details', coversSes, setNoCache, activity.getCredentialDetails);
  app.get('/api/activity/aggregatedStats/:aggregator', coversSes, auth(actions.AGGREGATED_STATS), activity.getAggregatedStats);

  app.post('/api/notification/push', coversSes, auth(actions.NOTIF), notifications.push);

  app.get('/api/status', routes.status);

  app.get('/api/admin/translationResourceStore/importAll', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.routeImportAll);

  app.post('/api/translationResource/:id/instances/update', coversSes, auth(actions.PROFILES_CONFIG), translationResource.updateInstances);
  app.post('/api/translationResource/:id/instances/node/update', coversSes, auth(actions.ADMIN_BASE), translationResource.updateNodeInstances);
  app.post('/api/translationResource/instance/:id/node/terminate', coversSes, auth(actions.ADMIN_BASE), translationResource.terminateInstance);
  app.get('/api/translationResource/:id', coversSes, auth(actions.ADMIN_BASE), translationResource.get);
  app.post('/api/translationResource/:id/delete', coversSes, auth(actions.ADMIN_BASE), translationResource.deleteTr);

  app.post('/api/feedback/add', coversSes, auth(actions.FEEDBACK_SUBMIT), feedback.post);

  app.post('/api/translationResourceStore/import/:id', coversSes, auth(actions.ADMIN_TRS), translationResourceStore.routeImportTrById);
  app.post('/api/translationResourceStore/deleteCache/:id', coversSes, auth(actions.ADMIN_TRS), translationResourceStore.deleteCache);
  app.get('/api/translationResource/list', coversSes, auth(actions.ADMIN_TRS), translationResourceStore.list);
  app.get('/api/translationResources', coversSes, auth(actions.ADMIN_BASE), translationResource.list);
  app.post('/api/translationResources/:id/upgrade', coversSes, auth(actions.ADMIN_BASE), translationResource.upgradeTr);
  app.post('/api/translationResources/pivot', coversSes, coversFeature('pivot profile'), auth(actions.ADMIN_BASE), translationResource.createPivot);
  // app.post('/api/translationResources/pivot/delete', coversSes, coversFeature('pivot profile'), auth(actions.ADMIN_BASE), translationResource.deletePivot);

  app.get('/api/production/profiles/byActiveProfile/:activeProfileId', coversSes, auth(actions.PROFILES_LIST), profileManager.getProfilebyActiveProfile); // legacy API for training server

  const accessService = envService.accessService;

  app.post('/api/computingNode/deregister', coversSes, auth(actions.ADMIN_BASE), computingNode.deregister);
  app.get('/api/configuration', coversSes, auth(actions.ADMIN_BASE), computingNode.configuration);

  app.post('/api/user/create', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), signup.signup);
  app.get('/api/user/:id', coversSes, auth(actions.ANY_LIST_USERS), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), accounts.get);
  app.get('/api/user/:id/rules', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getRules);
  app.get('/api/user/:id/rules/groups', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getGroupRules);
  app.get('/api/user/:id/rules/all', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getAllRules);
  app.post('/api/user/:id/disable', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.disableAccount);
  app.post('/api/user/:id/enable', coversSes, auth(actions.ANY_ADMIN_USERS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.enableAccount);
  app.get('/api/users', coversSes, auth(actions.ANY_LIST_USERS), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), accounts.list);
  app.post('/api/user/:userId/rules/:ruleId', coversSes, auth(actions.ANY_ADMIN_USERS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), accounts.pushRule);
  app.delete('/api/user/:userId/rules/:ruleId', coversSes, auth(actions.ANY_ADMIN_USERS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), accounts.removeRule);
  app.post('/api/user/:id/rules', coversSes, auth(actions.ANY_ADMIN_USERS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'id'), accounts.setRules);
  app.get('/api/user/:id/metadata', accounts.getMetadata);
  // Only meant to be used in platform-test
  app.get('/api/user/:accountId/apiKey/list', coversSes, auth(actions.ADMIN_APIKEYS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.getApiKeys);

  app.post('/api/group/create', coversSes, auth(actions.ANY_ADMIN_GROUPS), routeGroups.create);
  app.get('/api/group', coversSes, auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), routeGroups.listLight);
  app.get('/api/group/:id', coversSes, auth(actions.ANY_LIST_GROUPS), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), routeGroups.get);
  app.get('/api/group/:id/rules', coversSes, auth(actions.ANY_ADMIN_GROUPS), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.getRules);
  app.post('/api/group/delete/:id', coversSes, auth(actions.ANY_ADMIN_GROUPS), iamFilter.makeIamFilter('ADMIN_GROUPS', 'STRONG'), routeGroups.remove);
  app.post('/api/group/:groupId/rules/:ruleId', coversSes, auth(actions.ANY_ADMIN_GROUPS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), routeGroups.pushRule);
  app.delete('/api/group/:groupId/rules/:ruleId', coversSes, auth(actions.ANY_ADMIN_GROUPS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), routeGroups.removeRule);
  app.post('/api/group/:id/rules', coversSes, auth(actions.ANY_ADMIN_GROUPS), auth(actions.ADMIN_RULES), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'id'), routeGroups.setRules);
  app.post('/api/group/:id/scim/patch', coversSes, auth(actions.ANY_ADMIN_GROUPS), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'id'), routeGroups.patchGroup);

  app.get('/api/role', coversSes, auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), roles.list);
  app.get('/api/role/:id', coversSes, auth(actions.ANY_LIST_ROLES), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), roles.get);


  app.use('/api/rules', coversSes, auth(actions.ADMIN_RULES), rulesRouter);

  // Only meant to be called during platform-test
  app.post('/api/apiKey/generate', coversSes, auth(actions.ADMIN_APIKEYS), account.generateApiKey);
  app.post('/api/:accountId/apiKey/generate', coversSes, auth(actions.ADMIN_APIKEYS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.generateApiKey);
  app.post('/api/apiKey/disable/:apiKey', coversSes, auth(actions.ADMIN_APIKEYS), account.disableApiKey);
  app.post('/api/admin/group/:id/limits', auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.setMaxCharactersConsumption);

  if (withLimits) {
    // limits CRD endpoints
    app.post('/api/group/:groupId/limits/v2', coversSes, auth([actions.CREATE_LIMIT_AGGREGATED_STATS, actions.ANY_ADMIN_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), limitRoutes.createLimit);
    app.get('/api/group/:groupId/limits/v2', coversSes, auth([actions.LIST_LIMIT_AGGREGATED_STATS, actions.LIST_GROUPS]), limitRoutes.getLimits);
    app.delete('/api/group/:groupId/limits/v2/all', coversSes, auth([actions.DELETE_LIMIT_AGGREGATED_STATS, actions.ANY_ADMIN_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), limitRoutes.deleteAll);
    app.delete('/api/group/:groupId/limits/v2/:limitId', coversSes, auth([actions.DELETE_ALL_LIMIT_AGGREGATED_STATS, actions.ANY_ADMIN_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), limitRoutes.deleteOne);
  }

  app.post('/api/dictionary/:id/apply', coversSes, auth(actions.RSC_DICT_ALL), dictionary.apply);
  app.post('/api/normalization/:id/apply', coversSes, auth(actions.RSC_NORM_ALL), normalization.apply);

  if (withResetPassword) {
    app.get('/views/resetPassword', routes.resetPassword);
    app.post('/views/resetPassword', routes.resetPasswordConfirm);
    app.get('/views/resetPassword/:id([0-9a-z\\-]{36})', routes.resetPasswordAction);
    app.post('/resetPassword/:id([0-9a-z\\-]{36})', checkAjaxRequestHeader, resetPassword.reset);
    app.get('/views/definePassword/:id([0-9a-z\\-]{36})', routes.definePasswordAction);
    app.post('/definePassword/:id([0-9a-z\\-]{36})', checkAjaxRequestHeader, resetPassword.define);
  }

  const resourcesPermissions = ['RSC_DICT', 'RSC_NORM', 'RSC_TM', 'RSC_CONCORDANCE'];
  const resourcesListPermissions = resourcesPermissions.map((r) => r + '_LIST');
  const allResourcesPermissions = resourcesPermissions.concat(resourcesListPermissions).map((r) => actions[r]);

  // Pages
  app.get('/views/resourcesManagement*', auth(allResourcesPermissions), routes.resources);
  app.get('/views/translationTools*', auth(actions.TRSL_ALL), setCharactersConsumption, setUsage, routes.translation);
  app.get('/views/feedbacks*', auth(actions.FEEDBACK_MGR), routes.feedback);
  app.get('/views/profilesManagement', auth([actions.PROFILES_LIST, actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_PUBLIC]), routes.profilesManagement);
  app.get('/views/advancedConfiguration*', auth([actions.ADMIN_BASE, actions.ADMIN_MONITORING, actions.ADMIN_TRS]), routes.advancedConfiguration);
  app.get('/views/notifications', auth(actions.NOTIF), routes.notifications);
  app.get('/views/administration*', auth(actions.ADMIN_ALL), routes.admin);
  app.get('/views/users*', auth(actions.ADMIN_ALL), routes.admin);
  app.get('/views/groups*', auth(actions.ADMIN_ALL), routes.admin);
  app.get('/views/admin/licenses', auth(actions.ADMIN_LICENSES), routes.licenses);
  app.get('/views/help', auth(actions.HELP), routes.help);
  app.get('/views/user', auth(actions.USER_INFO), routes.account);
  if (nconf.get('TrainingOnTheCloud:mode') === 'ses') {
    app.get('/views/statistics*', auth([actions.ADMIN_STATS, actions.USER_PERSONAL_STATS, actions.USERS_STATS, actions.GROUPS_STATS, actions.AGGREGATED_STATS]), routes.statistics);
    app.get('/views/admin/monitoring', auth(actions.ADMIN_MONITORING), routes.monitoring);
  }

  app.get('/user/password/change', auth(actions.USER_INFO), routes.passwordChange);
  app.post('/user/password/change', checkAjaxRequestHeader, auth(actions.USER_INFO), account.passwordChange);

  const enabledProviders = _.union(nconf.get('TrainingOnTheCloud:Auth:enabledProviders'), [nconf.get('TrainingOnTheCloud:Auth:mode')]);
  if (enabledProviders.includes('local')) {
    app.get('/auth/local', (req, res, next) => {
      res.clearCookie('_redirection'); // to avoid redirection in the authentication iframe
      res.removeHeader('x-frame-options');
      next();
    },
    routes.signin('email'));
    app.get('/signup', auth(actions.USER_CREATE), routes.signup);
    app.post('/selfSignup', checkAjaxRequestHeader, auth(actions.USER_CREATE), signup.selfSignup);
    app.post('/signup', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), signup.signup);
  }
  if (enabledProviders.includes('ldap')) {
    app.get('/auth/ldap', (req, res, next) => {
      res.clearCookie('_redirection'); // to avoid redirection in the authentication iframe
      res.removeHeader('x-frame-options');
      next();
    },
    routes.signin('name'));
  }

  // API

  app.get('/concordanceSearch/list', coversSes, coversFeature('Concordance Search'), csrfCheckOtherMethods, auth(actions.RSC_CONCORDANCE_ALL), checkAjaxRequestHeader, concordanceSearch.list);
  app.get('/concordanceSearch/download/:id', coversSes, coversFeature('Concordance Search'), auth(actions.RSC_CONCORDANCE_ALL), setNoCache, concordanceSearch.download);
  app.post('/concordanceSearch/delete/:id', coversSes, coversFeature('Concordance Search'), auth(actions.RSC_CONCORDANCE_ALL), checkAjaxRequestHeader, concordanceSearch.delete);
  app.get('/concordanceSearch/details/:id', coversSes, coversFeature('Concordance Search'), csrfCheckOtherMethods, auth(actions.RSC_CONCORDANCE_ALL), checkAjaxRequestHeader, concordanceSearch.details);
  app.post('/concordanceSearch/rename/:id', coversSes, coversFeature('Concordance Search'), auth(actions.RSC_CONCORDANCE_ALL), checkAjaxRequestHeader, concordanceSearch.rename);
  app.get('/concordanceSearch/names', coversSes, coversFeature('Concordance Search'), csrfCheckOtherMethods, auth(actions.RSC_CONCORDANCE_ALL.concat(actions.PROFILES_LIST)), checkAjaxRequestHeader, concordanceSearch.names);
  app.get('/concordanceSearch/segment/list/:corpusId', coversSes, coversFeature('Concordance Search'), csrfCheckOtherMethods, auth(actions.RSC_CONCORDANCE_ALL), checkAjaxRequestHeader, concordanceSearch.listSegment);

  app.post('/dictionary/:id/apply', coversSes, auth(actions.RSC_DICT_ALL), checkAjaxRequestHeader, dictionary.apply);
  app.post('/normalization/:id/apply', coversSes, auth(actions.RSC_NORM_ALL), checkAjaxRequestHeader, normalization.apply);

  app.get('/corpusManager/list', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.list);
  app.get('/corpusManager/download/:id', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), setNoCache, corpusManager.download);
  app.post('/corpusManager/delete/:id', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.delete);
  app.get('/corpusManager/details/:id', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.details);
  app.post('/corpusManager/merge', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM), checkAjaxRequestHeader, corpusManager.merge);
  app.post('/corpusManager/partition/:id', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM), checkAjaxRequestHeader, corpusManager.partition);
  app.post('/corpusManager/rename/:id', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.rename);
  app.get('/corpusManager/names', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.RSC_TM_ALL.concat(actions.PROFILES_LIST)), checkAjaxRequestHeader, corpusManager.names);
  app.post('/corpusManager/addCorpus', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.addCorpus);
  app.get('/corpusManager/segment/list/:corpusId', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.listSegment);
  app.post('/corpusManager/segment/update/:corpusId', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.updateSegment);
  app.post('/corpusManager/segment/delete/:corpusId', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.deleteSegment);
  app.post('/corpusManager/segment/add/:corpusId', coversSes, coversFeature('translation memory'), auth(actions.RSC_TM_ALL), checkAjaxRequestHeader, corpusManager.addSegment);

  app.get('/translationResources', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.list);
  app.get('/translationResources/technos', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.getTechnos);
  app.get('/translationResources/domains', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.getDomains);
  app.get('/translationResources/owners', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.getOwners);
  app.get('/translationResources/status', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.getStatus);
  app.get('/translationResource/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.get);
  app.get('/translationResource/upgrade/list/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.upgradeList);
  app.post('/translationResource/upgrade/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.upgradeTr);
  app.get('/translationResource/downgrade/list/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.downgradeList);
  app.post('/translationResource/downgrade/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.downgradeTr);
  app.post('/translationResource/upgradeAll', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.upgradeAllTr);
  app.post('/translationResource/:id/routes/deactivate/all', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.deactivateAll);
  app.post('/translationResource/:id/routes/activate/all', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.activateAll);
  app.post('/translationResource/instances/update/:id', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.updateInstances);
  app.post('/translationResource/instancesOnNode/update/:id', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.updateNodeInstances);
  app.post('/translationResource/uninstall/:id', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.uninstall);
  app.post('/translationResource/install/:id', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.install);
  app.post('/translationResource/delete/:id', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translationResource.deleteTr);
  app.post('/translationResources/pivot', coversSes, checkAjaxRequestHeader, coversFeature('pivot profile'), auth(actions.ADMIN_BASE), translationResource.createPivot);

  app.get('/computingNodes', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.list);
  app.get('/computingNodes/light', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.listLight);
  app.get('/computingNode/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.get);
  app.get('/computingNode/hostname/:hostname', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.getByHostname);
  app.get('/computingNodes/hostname', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.hostnames);
  app.post('/computingNode/register', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, computingNode.register);
  app.post('/computingNode/deregister', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, checkAjaxRequestHeader, computingNode.deregister);

  app.get('/profiles', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.listProfiles);
  app.post('/profiles/create', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), checkAjaxRequestHeader, envService.createProfile);
  app.post('/profiles/update', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), checkAjaxRequestHeader, accessService('update'), envService.updateService);
  app.post('/profiles/edit', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), checkAjaxRequestHeader, envService.editProfile);
  app.post('/profiles/deactivate', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), checkAjaxRequestHeader, accessService('update'), envService.deactivateService);
  app.post('/profiles/delete', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), checkAjaxRequestHeader, accessService('delete'), envService.deleteProfile);
  app.get('/profiles/owner', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.getOwners);
  app.get('/profiles/domain', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.getDomains);
  app.get('/profiles/size', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.getSizes);
  app.get('/profiles/techno', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.getTechnos);
  app.get('/profiles/lps', coversSes, csrfCheckOtherMethods, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), checkAjaxRequestHeader, envService.getLps);

  app.get('/api/profiles', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST]), envService.listProfilesAPI);
  app.get('/api/profiles/:id/permissions', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_LIST, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), envService.getProfilePermissions);
  app.post('/api/profiles/create', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), permissions.installTrPermission, iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), envService.createProfileAPI);
  app.post('/api/profiles/update', coversSes, auth([actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), accessService('update'), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), envService.updateServiceAPI);
  app.post('/api/profiles/edit', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), envService.editProfile);
  app.post('/api/profiles/deactivate', coversSes, auth(actions.ADMIN_BASE), accessService('update'), envService.deactivateService);
  app.post('/api/profiles/delete', coversSes, auth([actions.PROFILES_CONFIG, actions.PROFILES_CONFIG_SHARED, actions.PROFILES_CONFIG_PUBLIC]), accessService('delete'), envService.deleteProfile);

  app.get('/routes', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.list);
  app.get('/route/hostname', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.hostname);
  app.post('/route/register', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.register);
  app.post('/route/add/account', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.addAccount);
  app.post('/route/add', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.addRoute);
  app.post('/route/update', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.updateRoute);
  app.post('/route/delete', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.deleteRoute);
  app.post('/route/check', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.checkRoute);
  app.get('/route', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.get);
  app.post('/route/deregister', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envRoute.deregister);

  app.get('/queues', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.list);
  app.get('/queue/hostname', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.hostname);
  app.get('/queue/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.get);
  app.post('/queue/register', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.register);
  app.post('/queue/deregister', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.deregister);
  app.post('/cache/register', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.registerCache);
  app.post('/cache/deregister', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, envQueue.deregisterCache);

  function authOrTranslateFree(permission) {
    return (req, res, next) => {
      if (nconf.get('TrainingOnTheCloud:Security:TranslateBox:exposeTranslateFree')) {
        next();
        return;
      }

      auth(permission)(req, res, next);
    };
  }

  app.get('/translate', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_BOX), checkAjaxRequestHeader, translate.translate);
  app.get('/translate/lps', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, translate.getLanguagePairs);
  app.post('/translate/html', coversSes, csrfCheckOtherMethods, authOrTranslateFree([actions.TRSL_BOX, actions.TRSL_CONCORDANCE]), checkAjaxRequestHeader, translate.translateHtml);
  app.post('/translate/json', coversSes, csrfCheckOtherMethods, authOrTranslateFree([actions.TRSL_BOX, actions.TRSL_CONCORDANCE]), checkAjaxRequestHeader, translate.translateJson);

  app.post('/corpusMatch', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, authOrTranslateFree([actions.TRSL_BOX, actions.TRSL_FILE]), checkAjaxRequestHeader, fileTranslation.corpusMatch);
  app.get('/corpus/segment/search', coversSes, coversFeature('translation memory'), csrfCheckOtherMethods, auth(actions.TRSL_CONCORDANCE), checkAjaxRequestHeader, corpusManager.searchSegment);

  app.get('/speechTranslation/list', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, fileTranslation.listSpeech);
  app.get('/speechTranslation/fileInfo/:id', coversSes, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, fileTranslation.fileInfo);
  app.post('/speechTranslation/delete', coversSes, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, fileTranslation.deleteFile);
  app.post('/speechTranslation/:id/cancel', coversSes, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, fileTranslation.cancel);
  app.get('/speechTranslation/postEditor/:id', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.postEditor);
  app.get('/speechTranslation/stream/:id', coversSes, auth(actions.TRSL_SPEECH_PE), fileTranslation.getStream);
  app.post('/speechTranslation/:segId/word/validate', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.validateWord);
  app.post('/speechTranslation/:fileId/:segId/segment/update', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.updateSegment);
  app.post('/speechTranslation/:segId/segment/validate', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.validateSegment); // Validate and Edit 1 segment
  app.get('/speechTranslation/download/:action/:id', coversSes, auth(actions.TRSL_SPEECH), setNoCache, fileTranslation.download);
  app.get('/speechTranslation/download/:action', coversSes, auth(actions.TRSL_SPEECH), setNoCache, fileTranslation.speechBulkExport);
  app.get('/speechTranslation/postEditor/export/:action/:id', coversSes, auth(actions.TRSL_SPEECH_PE), setNoCache, fileTranslation.download);
  app.post('/speechTranslation/segments/validate', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.validateSegments); // Validate multiple segments
  app.post('/speechTranslation/postEditor/tm/create', coversSes, auth(actions.TRSL_SPEECH_PE), auth(actions.RSC_TM), checkAjaxRequestHeader, fileTranslation.speechCreateTm);
  app.post('/speechTranslation/postEditor/tm/append', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.speechAppendTm);
  app.post('/speechTranslation/postEditor/tm/download', coversSes, auth(actions.TRSL_SPEECH_PE), setNoCache, fileTranslation.speechDownloadTm);
  app.get('/speechTranslation/lps', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, fileTranslation.speechSupportedLanguages);

  // should be UpdateTranslation
  app.post('/speechTranslation/saveSentence', coversSes, auth(actions.TRSL_SPEECH_PE), checkAjaxRequestHeader, fileTranslation.updateSegment); // Validate & Edit only 1 segment


  app.get('/fileTranslation/list', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_FILE), checkAjaxRequestHeader, fileTranslation.list);
  app.get('/fileTranslation/archive/:id/list', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_FILE), checkAjaxRequestHeader, fileTranslation.archiveList);
  app.post('/fileTranslation/delete', coversSes, auth(actions.TRSL_FILE), checkAjaxRequestHeader, fileTranslation.deleteFile);
  app.post('/fileTranslation/:id/cancel', coversSes, auth(actions.TRSL_FILE), checkAjaxRequestHeader, fileTranslation.cancel);
  app.get('/fileTranslation/download/:id', coversSes, auth(actions.TRSL_FILE), setNoCache, fileTranslation.download);
  app.get('/fileTranslation/download', coversSes, auth(actions.TRSL_FILE), setNoCache, fileTranslation.downloadFiles);
  app.get('/fileTranslation/postEditor/:id', coversSes, auth(actions.TRSL_FILE_PE), checkAjaxRequestHeader, fileTranslation.postEditor);
  app.get('/fileTranslation/fileInfo/:id', coversSes, auth(actions.TRSL_FILE), checkAjaxRequestHeader, fileTranslation.fileInfo);
  app.post('/fileTranslation/saveSentence', coversSes, auth(actions.TRSL_FILE_PE), checkAjaxRequestHeader, fileTranslation.saveSentence);
  app.get('/fileTranslation/postEditor/export/:id', coversSes, auth(actions.TRSL_FILE_PE), setNoCache, fileTranslation.download);
  app.post('/fileTranslation/postEditor/tm/create', coversSes, auth(actions.TRSL_FILE_PE), auth(actions.RSC_TM), checkAjaxRequestHeader, fileTranslation.createTm);
  app.post('/fileTranslation/postEditor/tm/append', coversSes, auth(actions.TRSL_FILE_PE), checkAjaxRequestHeader, fileTranslation.appendTm);
  app.post('/fileTranslation/postEditor/find/page', coversSes, auth(actions.TRSL_FILE_PE), checkAjaxRequestHeader, fileTranslation.findPage);
  app.post('/fileTranslation/postEditor/tm/download', coversSes, auth(actions.TRSL_FILE_PE), setNoCache, fileTranslation.downloadTm);


  app.get('/concordance/lps', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_CONCORDANCE), checkAjaxRequestHeader, concordance.supportedLanguages);
  app.get('/lookup/lps', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_ALL), checkAjaxRequestHeader, lookup.lookupSupportedLanguages);
  app.post('/lookup', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, lookup.lookup);
  app.get('/lookup/autoComplete', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_ALL), checkAjaxRequestHeader, lookup.getAutoComplete);
  app.get('/lps', coversSes, csrfCheckOtherMethods, auth([...allResourcesPermissions, actions.PROFILES_LIST]), checkAjaxRequestHeader, lookup.getLanguagePairs);

  app.post('/feedback', coversSes, auth(actions.FEEDBACK_SUBMIT), checkAjaxRequestHeader, feedback.post);
  app.get('/feedback/submitter', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getSubmitters);
  app.get('/feedback/reviewer', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getReviewers);
  app.get('/feedback/accounts', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getAccounts);
  app.get('/feedback/list', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.list);
  app.get('/feedback/detail/:id', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.get);
  app.get('/feedback/activities', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getActivities);
  app.get('/feedback/dictionary/list', coversSes, csrfCheckOtherMethods, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getDictionaries);
  app.post('/feedback/update/:id', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.update);
  app.post('/feedback/tm/append', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.appendTm);
  app.post('/feedback/delete/:id', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.delete);
  app.get('/feedback/status', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getStatus);
  app.get('/feedback/problemSeverity', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getProblemSeverities);
  app.get('/feedback/translationRating', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getTranslationRating);
  app.get('/feedback/languagePair', coversSes, auth(actions.FEEDBACK_MGR), checkAjaxRequestHeader, feedback.getLanguagePair);

  app.post('/dispatcher/register', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translate.register);
  app.post('/dispatcher/deregister', coversSes, auth(actions.ADMIN_BASE), checkAjaxRequestHeader, translate.deregister);

  app.get('/notifications/list', auth(actions.NOTIF), notifications.list);
  app.get('/notification/level', coversSes, auth(actions.NOTIF), notifications.getLevels);
  app.get('/notification/:id', csrfCheckOtherMethods, auth(actions.NOTIF), notifications.get);
  app.post('/notification/read/:id', auth(actions.NOTIF), notifications.read);
  app.post('/notification/unread/:id', auth(actions.NOTIF), notifications.unread);
  app.post('/notification/pushed/:id', auth(actions.NOTIF), notifications.pushNotification);


  // app.get('/notifications/list', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.list);
  // app.get('/notification/level', coversSes, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.getLevels);
  // app.get('/notification/:id', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.get);
  // app.post('/notification/read/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.read);
  // app.post('/notification/unread/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.unread);
  // app.post('/notification/pushed/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.pushNotification);
  // // app.get('/notification/count/unread', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.countUnread);

  app.get('/admin/translationResourceStore/list', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.list);
  app.get('/admin/translationResourceStore/list/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.get);
  app.get('/admin/translationResourceStore/importAll', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.routeImportAll);
  app.get('/admin/translationResourceStore/import/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.routeImportTrById);
  app.post('/admin/translationResourceStore/deleteCache/:id', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_TRS), checkAjaxRequestHeader, translationResourceStore.deleteCache);

  app.get('/admin/licenses/list', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.list);
  app.post('/admin/license/add', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.add);
  app.post('/admin/license/activate/online/secure', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.activateOnlineSecure);
  app.post('/admin/license/delete', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.deleteLicense);
  app.post('/admin/license/activate/offline/secure', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.activateOfflineSecure);
  app.post('/admin/license/activate/offline/phone', csrfCheckOtherMethods, auth(actions.ADMIN_LICENSES), checkAjaxRequestHeader, routeLicenses.activateOfflinePhone);

  app.get('/admin/users', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.list);
  app.get('/admin/users/light', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), accounts.listLight);
  app.get('/admin/users/status', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_APIKEYS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getStatus); // TODO What permissions for this route ?
  app.get('/admin/users/provider', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getProvider); // TODO What permissions for this route ?
  app.get('/admin/users/groups', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getGroups); // TODO What permissions for this route ?
  app.get('/admin/users/roles', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.getRoles); // TODO What permissions for this route ?
  app.post('/admin/user/disable/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.disableAccount);
  app.post('/admin/user/enable/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.enableAccount);
  app.post('/admin/user/delete/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth(actions.DELETE_USERS), auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.deleteAccount);
  app.get('/admin/user/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), accounts.get);
  app.post('/admin/user/:userId/role/push/:roleId', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), accounts.pushRole);
  app.post('/admin/user/:userId/role/remove/:roleId', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'userId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), accounts.pullRole);
  app.post('/admin/user/:id', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamAuthorization.makeIamAuthorization('ADMIN_USERS', 'WEAK', 'id'), accounts.setAccount);
  app.get('/admin/user/:id/groups', checkAjaxRequestHeader, permissions.isConnectedUserOrHasRights([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), routeGroups.getUserGroups); // TODO remove these routes, use session data on client side
  app.get('/admin/user/:id/roles', checkAjaxRequestHeader, permissions.isConnectedUserOrHasRights([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), roles.getUserRoles); // TODO remove these routes, use session data on client side
  app.post('/admin/user/:id/roles', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), accounts.setRoles);
  app.post('/admin/user/:id/limits', checkAjaxRequestHeader, auth([actions.ADMIN_USERS, actions.ADMIN_SELF_USERS]), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), accounts.setLimits);

  app.get('/user/preferences', checkAjaxRequestHeader, csrfCheckOtherMethods, auth(actions.USER_INFO), account.getPreferences);
  app.post('/user/preferences', checkAjaxRequestHeader, csrfCheckOtherMethods, auth(actions.USER_INFO), account.setPreferences);

  app.get('/admin/roles', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_ROLES, actions.ADMIN_SELF_ROLES]), iamFilter.makeIamFilter('ADMIN_ROLES', 'WEAK'), roles.list);
  app.get('/admin/roles/light', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), roles.listLight);
  app.get('/admin/role/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_ROLES, actions.ADMIN_SELF_ROLES]), iamFilter.makeIamFilter('ADMIN_ROLES', 'WEAK'), roles.get);
  app.post('/admin/role/create', checkAjaxRequestHeader, auth([actions.ADMIN_ROLES, actions.ADMIN_SELF_ROLES]), roles.create);
  app.post('/admin/role', checkAjaxRequestHeader, auth([actions.ADMIN_ROLES, actions.ADMIN_SELF_ROLES]), iamFilter.makeIamFilter('ADMIN_ROLES', 'STRONG'), roles.update);
  app.post('/admin/role/delete/:id', checkAjaxRequestHeader, auth([actions.ADMIN_ROLES, actions.ADMIN_SELF_ROLES]), iamFilter.makeIamFilter('ADMIN_ROLES', 'STRONG'), roles.delete);

  app.get('/admin/groups', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.list);
  app.get('/admin/groups/light', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), routeGroups.listLight);
  app.get('/admin/groups/users', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.getUsers);
  app.get('/admin/groups/roles', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.getRoles);
  app.get('/admin/group/:id', csrfCheckOtherMethods, checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), iamFilter.makeIamFilter('LIST_ROLES', 'WEAK'), routeGroups.get);
  app.post('/admin/group/:groupId/user/push/:userId', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), iamAuthorization.makeIamAuthorization('LIST_USERS', 'WEAK', 'userId'), routeGroups.pushUser);
  app.post('/admin/group/:groupId/user/remove/:userId', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), iamAuthorization.makeIamAuthorization('LIST_USERS', 'WEAK', 'userId'), routeGroups.pullUser);
  app.post('/admin/group/:groupId/role/push/:roleId', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), routeGroups.pushRole);
  app.post('/admin/group/:groupId/role/remove/:roleId', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), auth([actions.LIST_ROLES, actions.LIST_SELF_ROLES]), iamAuthorization.makeIamAuthorization('ADMIN_GROUPS', 'WEAK', 'groupId'), iamAuthorization.makeIamAuthorization('LIST_ROLES', 'WEAK', 'roleId'), routeGroups.pullRole);
  app.post('/admin/group/:id/limits', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'WEAK'), routeGroups.setMaxCharactersConsumption);
  app.post('/admin/group/create', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), routeGroups.create);
  app.post('/admin/group/delete/:id', checkAjaxRequestHeader, auth([actions.ADMIN_GROUPS, actions.ADMIN_SELF_GROUPS]), iamFilter.makeIamFilter('ADMIN_GROUPS', 'STRONG'), routeGroups.remove);

  // TODO Refactor global and self permissions into sets of permissions following the model 'ANY_USERS_LIST', 'ANY_ADMIN_GROUPS'...
  // TODO: And add a flatten call to lib/userAuthorizations.js::check
  app.get('/resources/:resource/users/:fileId', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), resources.listUser);
  app.get('/resources/:resource/user/:accountId/:fileId', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), resources.getUser);
  app.post('/resources/:resource/user/permission', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), resources.savePermission);
  app.post('/resources/:resource/users/permission', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), resources.savePermissions);
  app.get('/resources/:resource/groups/:fileId', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), resources.listGroup);
  app.get('/resources/:resource/group/:groupId/:fileId', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), resources.getGroup);
  app.post('/resources/:resource/group/permission', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), resources.saveGroupPermission);
  app.post('/resources/:resource/groups/permission', coversSes, checkAjaxRequestHeader, auth(resources.listPermissions), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), resources.saveGroupPermissions);

  app.get('/resources/dictionary/list', coversFeature('ud'), coversSes, csrfCheckOtherMethods, auth(actions.RSC_DICT_ALL.concat(actions.RSC_NORM_ALL).concat([actions.PROFILES_LIST])), checkAjaxRequestHeader, profileManager.getDictionaries);
  app.get('/resources/engine/list', coversSes, csrfCheckOtherMethods, auth(actions.PROFILES_LIST), checkAjaxRequestHeader, profileManager.getEngines);
  app.get('/resources/userDictionary/quota', coversFeature('ud'), auth(actions.RSC_DICT), checkAjaxRequestHeader, quotas.userDictQuota);
  app.get('/resources/translationMemory/quota', coversFeature('translation memory'), auth(actions.RSC_TM), checkAjaxRequestHeader, quotas.translationMemoryQuota);

  app.get('/session/translate/languages', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, sessionRoute.getLanguagePairs);
  app.post('/session/translate/languages', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, sessionRoute.saveLanguagePairs);
  app.get('/session/translate/options', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, sessionRoute.getTextTranslationSettings);
  app.post('/session/translate/options', coversSes, csrfCheckOtherMethods, authOrTranslateFree(actions.TRSL_ALL), checkAjaxRequestHeader, sessionRoute.saveTextTranslationSettings);
  app.get('/session/fileTranslation/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_FILE), checkAjaxRequestHeader, sessionRoute.getFileRefreshRate);
  app.post('/session/fileTranslation/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_FILE), checkAjaxRequestHeader, sessionRoute.saveFileRefreshRate);
  app.get('/session/speechTranslation/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, sessionRoute.getSpeechRefreshRate);
  app.post('/session/speechTranslation/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.TRSL_SPEECH), checkAjaxRequestHeader, sessionRoute.saveSpeechRefreshRate);
  app.get('/session/services/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.PROFILES_CONFIG), checkAjaxRequestHeader, sessionRoute.getServiceRefreshRate);
  app.post('/session/services/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.PROFILES_CONFIG), checkAjaxRequestHeader, sessionRoute.saveServiceRefreshRate);
  app.get('/session/notification/refreshRate', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, sessionRoute.getNotificationRefreshRate);
  app.post('/session/notification/refreshRate', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, sessionRoute.saveNotificationRefreshRate);
  app.get('/session/profile/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.PROFILES_LIST), checkAjaxRequestHeader, sessionRoute.getProfileRefreshRate);
  app.post('/session/profile/refreshRate', coversSes, csrfCheckOtherMethods, auth(actions.PROFILES_LIST), checkAjaxRequestHeader, sessionRoute.saveProfileRefreshRate);

  app.get('/activity', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_STATS), checkAjaxRequestHeader, activity.get);
  app.get('/activity/user/personal', coversSes, csrfCheckOtherMethods, auth(actions.USER_PERSONAL_STATS), checkAjaxRequestHeader, activity.getUserPersonal);
  app.get('/activity/user/personal/details', coversSes, csrfCheckOtherMethods, auth(actions.USER_PERSONAL_STATS), checkAjaxRequestHeader, activity.getUserPersonalDetails);
  app.get('/activity/user/:id', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth(actions.USERS_STATS), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), activity.getUser);
  app.get('/activity/user/:id/details', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth(actions.USERS_STATS), auth([actions.LIST_USERS, actions.LIST_SELF_USERS]), iamFilter.makeIamFilter('LIST_USERS', 'WEAK'), activity.getUserDetails);
  app.get('/activity/group/:id', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth(actions.GROUPS_STATS), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), activity.getGroup);
  app.get('/activity/group/:id/details', coversSes, csrfCheckOtherMethods, checkAjaxRequestHeader, auth(actions.GROUPS_STATS), auth([actions.LIST_GROUPS, actions.LIST_SELF_GROUPS]), iamFilter.makeIamFilter('LIST_GROUPS', 'WEAK'), activity.getGroupDetails);
  // app.get('/activity/users', coversSes, csrfCheckOtherMethods, auth(actions.USERS_STATS), checkAjaxRequestHeader, activity.getUsers);
  app.get('/activity/csv', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_STATS), activity.getCsv);
  app.get('/activity/details', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_STATS), checkAjaxRequestHeader, activity.getDetails);
  app.get('/activity/details/csv', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_STATS), activity.getDetailsCsv);
  app.get('/activity/:fields', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_STATS), checkAjaxRequestHeader, activity.getValuesStatsFilter);

  app.get('/settings', /* csrfCheckOtherMethods, */ auth(actions.ADMIN_SETTINGS), checkAjaxRequestHeader, routeSettings.get);
  app.get('/global/settings', checkAjaxRequestHeader, routeSettings.fetchSettingsPage); // used in Next.js App
  app.get('/settings/template', csrfCheckOtherMethods, auth(actions.ADMIN_SETTINGS), checkAjaxRequestHeader, routeSettings.getTemplate);
  app.post('/settings/restore/files', auth(actions.ADMIN_SETTINGS), checkAjaxRequestHeader, routeSettings.restoreFromFiles);
  app.post('/settings', auth(actions.ADMIN_SETTINGS), checkAjaxRequestHeader, routeSettings.set);
  app.get('/settings/policy', checkAjaxRequestHeader, routeSettings.getSecurityPolicy);
  app.get('/settings/features', coversSes, auth(actions.TRSL_ALL), checkAjaxRequestHeader, routeSettings.getFeatures);
  app.get('/api/settings/features', coversSes, auth(actions.TRSL_ALL), routeSettings.getFeatures); // used by ses-translation-gateway /settings/features

  app.get('/monitoring/list', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_MONITORING), checkAjaxRequestHeader, monitoring.list);
  app.get('/api/monitoring/list', coversSes, auth(actions.ADMIN_MONITORING), monitoring.list);

  app.get('/information/content/md', coversSes, csrfCheckOtherMethods, auth(actions.ADMIN_INFO), checkAjaxRequestHeader, routeInformation.getContentMd);
  app.post('/information/content', coversSes, auth(actions.ADMIN_INFO), checkAjaxRequestHeader, routeInformation.updateContent);
  app.get('/information/content', coversSes, csrfCheckOtherMethods, auth(actions.INFO), checkAjaxRequestHeader, routeInformation.getContent);

  // information page
  app.get('/views/information*', auth(actions.INFO), routes.information);

  app.get('/domains', auth(actions.LIST_DOMAINS), checkAjaxRequestHeader, domainRoutes.list);

  app.get('/user/apiKey/list', auth(actions.USER_APIKEYS), checkAjaxRequestHeader, account.getApiKeys);
  app.post('/user/apiKey/disable/:apiKey', auth(actions.USER_APIKEYS), checkAjaxRequestHeader, account.disableApiKey);
  app.post('/user/apiKey/generate', auth(actions.USER_APIKEYS), checkAjaxRequestHeader, account.generateApiKey);
  app.post('/user/apiKey/edit/:apiKey', auth(actions.USER_APIKEYS), checkAjaxRequestHeader, account.editApiKey);

  app.post('/user/:accountId/apiKey/generate', auth(actions.ADMIN_APIKEYS), checkAjaxRequestHeader, iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.generateApiKey);
  app.post('/user/:accountId/apiKey/edit/:apiKey', auth(actions.ADMIN_APIKEYS), checkAjaxRequestHeader, iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.editApiKey);
  app.post('/user/:accountId/apiKey/disable/:apiKey', auth(actions.ADMIN_APIKEYS), checkAjaxRequestHeader, iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.disableApiKey);
  app.get('/user/:accountId/apiKey/list', auth(actions.ADMIN_APIKEYS), checkAjaxRequestHeader, iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.getApiKeys);

  app.get('/user/:accountId/activeTokens', auth(actions.ADMIN_ACTIVE_APPLICATIONS), iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), checkAjaxRequestHeader, account.getRefreshTokens);
  app.get('/user/activeTokens', auth(actions.USER_ACTIVE_APPLICATIONS), checkAjaxRequestHeader, account.getRefreshTokens);

  app.get('/user/:accountId/clientCredentials', auth(actions.ADMIN_APICREDENTIALS), checkAjaxRequestHeader, iamFilter.makeIamFilter('ADMIN_USERS', 'WEAK'), account.getClientCredentials);
  app.get('/user/clientCredentials', auth(actions.USER_APICREDENTIALS), checkAjaxRequestHeader, account.getClientCredentials);

  app.post('/user/personalData', auth(actions.USER_SELF_UPDATE), checkAjaxRequestHeader, account.setPersonalData);
  app.get('/user/personal', checkAjaxRequestHeader, accounts.getPersonalUser);
  app.get('/user/roles', accounts.getPersonalUserPermissions);
  // Page made to deploy Next js App & React 18, New UI and Features
  if (nconf.get('TrainingOnTheCloud:Features:Labs:enabled')){
    app.get('/app', auth(actions.LABS_MANAGEMENT), routes.labs);
  }

  app.use('/user/oidc', routeOidcSession);

  app.use(libOidc.getPrefix(), routeOidcApi);

  if (nconf.get('TrainingOnTheCloud:ServicesHealth:enable')) {
    app.use('/', translateHealthRouter);
  }

  cb();
}

function shutdown(err) {
  models.close();
  db.close();
  serverTools.destroy();

  if(err) {
    winston.error(err);
    process.exit(1);
  }
}

function mainWorkers() {
  async.series([
    async function(cb) {
      db.init(nconf.get('TrainingOnTheCloud:Database'), nconf.get('TrainingOnTheCloud:FileTranslation'));
      try {
        const oidcDb = await db.open('user');
        jwksHandler.init({
          db: oidcDb,
          logger: winston
        });
        clientHandler.init({
          db: oidcDb,
          logger: winston
        });
        const jwks = await jwksHandler.getJWKS();
        libOidc.init({
          oidcDb,
          logger: winston,
          jwks
        });
      }
      catch (e) {
        cb(e);
        return;
      }
      systranLicense.init(nconf.get('TrainingOnTheCloud:TranslationResourceStore'));
      routes.init();
      cb();
    },
    async.apply(initApp),
    async function(cb) {
      queueManager.init();
      cb();
    },
    async.apply(db.openTr),
    function(cb) {
      db.openAllEnvironments(cb);
    },
    function(cb) {
      const config = nconf.get('TrainingOnTheCloud');
      monitoring.upsertMonitoringServices(config, cb);
    },
    async function(cb) {
      try {
        await models.GlobalRules.initStartUpInstance();
        cb();
        return;
      }
      catch (error) {
        cb(error); // eslint-disable-line callback-return
      }
    },
    async function(cb) {
      try {
        await models.RateLimiterRuleIds.initInstance();
        cb();
        return;
      }
      catch (error) {
        cb(error); // eslint-disable-line callback-return
      }
    },
    async.apply(db.openNotifications),
    async.apply(db.openResources),
    async.apply(db.openProfiles),
    async.apply(stats.open),
    async.apply(feedbacks.open),
    async.apply(tokens.open),
    async.apply(preferences.open),
    async.apply(groups.open),
    async.apply(information.open),
    async.apply(definePasswordTokens.open),
    function(cb) {
      if (!withResetPassword) {
        cb();
        return;
      }

      resetPasswordTokens.open(cb);
    },
    function(cb) {
      notifications.start();
      stats.cleanupStats('insertedAt', parseInt(nconf.get('TrainingOnTheCloud:Stats:statsTTL'), 10));
      serverTools.createServer(app);
    }
  ], shutdown);
}

async function initSettings(cb) {
  const winstonworkers = require('@systran/winston-workers');
  winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));

  settings.loadConfig();
  winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));
  initDBConfig();

  const secretsConfigStorage = await settings.loadConjurSecretsAndGetConfigStorage();
  const dbConfig = settings.getDatabaseConfigFromSecretsStorage(secretsConfigStorage);

  db.init(dbConfig);

  async.series([
    async.apply(settings.open),
    function(cb) {
      if (argv['only-config-files']) {
        cb();
        return;
      }
      settings.getAndMergeSettings(cb, undefined, undefined, undefined, argv.readOnly);
    },
    function(cb) {
      settings.setConfigFromSecretsStorage(secretsConfigStorage);
      cb();
    },
    function(cb) {
      winstonworkers.init(winston, nconf.get('TrainingOnTheCloud:Log'));

      cookieName = 'ses.sid';
      const urlsWhiteList = [
        '/unauthorized',
        '/api/.*', // authentication via api-key only, no session: no csrf
        // '/[^/\\?\\&]+/detectLanguage',
        '/[^/\\?\\&]+/bookmarklet/translate',
        '.*/postEditor/tm/download',
        '/signin/callback',
        '/oidc/.*'
      ];

      if (nconf.get('TrainingOnTheCloud:https:http2') === undefined) {
        nconf.set('TrainingOnTheCloud:https:http2', false);
      }

      const securityConfig = settings.buildSecurityConfigServerTools(nconf.get('TrainingOnTheCloud:Security:Advanced'));

      nconf.set('TrainingOnTheCloud:Security:BruteForce:version', '2');
      serverTools.init({
        name: 'SES console',
        path: __dirname,
        cookie: cookieName,
        jsonRoutes: ['/api/.*', '/accountId', '/service/access'],
        crossDomain: ['/detectLanguage', '/oidc/*'],
        urlsWhiteList: urlsWhiteList,
        Workers: {number: nconf.get('TrainingOnTheCloud:Workers:sesConsole'), pingTimeout: nconf.get('TrainingOnTheCloud:Workers:pingTimeout')},
        config: nconf.get('TrainingOnTheCloud'),
        websocket: {onConnection: notifications.onConnection},
        logger: winston,
        security: securityConfig,
        rateLimit: nconf.get('TrainingOnTheCloud:Security:RateLimit')
      });

      cb();
    }
  ], cb);
}

initSettings(function(err) {
  if (err) {
    shutdown(err);
    return;
  }

  serverTools.startWorkers(mainWorkers);
});
