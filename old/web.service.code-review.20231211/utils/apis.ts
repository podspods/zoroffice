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
  }
};
export default Apis;
