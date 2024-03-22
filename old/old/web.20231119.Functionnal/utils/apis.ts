const Apis = {
  globalSettings: '/node/global/settings',
  userRoles: '/node/user/roles',
  profilesLps: '/node/profiles/lps',
  profilesOwner: '/node/profiles/owner',
  profilesDomain: '/node/profiles/domain',
  profilesSize: '/node/profiles/size',
  profilesTechno: '/node/profiles/techno',
  example: ({page, size}) => `/node/example?page=${page}&size=${size}`
};

export default Apis;
