const Apis = {
  globalSettings: '/node/global/settings',
  userRoles: '/node/user/roles',
  profilesLps: '/node/profiles/lps',
  profilesOwner: '/node/profiles/owner',
  profilesDomain: '/node/profiles/domain',
  profilesSize: '/node/profiles/size',
  profilesTechno: '/node/profiles/techno',
  license: {
    list: '/node/admin/licenses/list',
    add: '/node/admin/license/add',
    delete: '/node/admin/license/delete',
    activate: (action: string) => '/node/admin/license/activate/' + action
  },
  setting: {
    listSettings: '/node/settings',
    listTemplate: '/node/settings/template',
    save: '/node/settings'
  },
  service: {
    list: '/node/monitoring/list',
    broker: (action: string) => '/node/queue/' + action,
    computingNode: (action: string) => '/node/computingNode/' + action,
    dispatcher: (action: string) => '/node/dispatcher/' + action,
    routingServer: (action: string) => '/node/route/' + action,
    redistNode: (action: string) => '/node/cache/' + action
  },
  notification: {
    list: '/node/notifications/list',
    read: '/node/notification/read',
    unRead: '/node/notification/unread',
    readAll: '/node/notification/read/all',
    profiler: 'profilesManagement/',
    tm: 'linguisticConfiguration/resources/translationMemory/',
    tr: 'administration/translationResources/',
    node: 'advancedConfiguration/computingNode/',
    nodeView: 'advancedConfiguration/computingNode/view/',
    fileTranslation: 'translationTools/file/'
  }
};
export default Apis;
