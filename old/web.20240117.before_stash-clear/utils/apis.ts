export type EleFilters = {
  deactivated?: boolean;
  running?: boolean;
  service?: string;
  translationResource?: string;
  owner?: string;
  domain?: string;
  size?: string;
  techno?: string;
  sharingStatus?: string;
  lps?: string;
  limit?: number;
  skip?: number;
  sortName?: string;
  sortOrder?: string;
  withRoles?: boolean;
  enable?: boolean;
};

export function formatEleFilters(eleFilters: EleFilters = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(eleFilters).forEach(([filterName, filterValue]) => {
    if (filterValue !== undefined) {
      if (Array.isArray(filterValue)) {
        filterValue.forEach((value?: string) => value !== undefined && queryParams.append(`eleFilters[${filterName}][]`, value));
      } else {
        queryParams.append(`eleFilters[${filterName}]`, `${filterValue}`);
      }
    }
  });
  return queryParams;
}

const Apis = {
  globalSettings: '/node/global/settings',
  userRoles: '/node/user/roles',
  lps: '/node/lps',
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
    readAll: '/node/notification/read/all'
  },
  fileTranslation: {
    files: '/node/fileTranslation/list',
    profiles: '/node/translate/supportedProfiles',
    cancel: (id: string) => `/node/fileTranslation/${id}/cancel`,
    delete: '/node/fileTranslation/delete',
    downloadFiles: (ids: string[]) => `/node/fileTranslation/download?${new URLSearchParams(ids.map((id) => ['ids', id])).toString()}`,
    downloadFile: (id: string) => `/node/fileTranslation/download/${id}`,
    upload: '/node/fileTranslation/upload',
    lps: '/node/translate/lps',
    features: '/node/translate/supportedFeatures',
    selectors: '/node/translate/supportedSelectors',
    cache: (type?: string) => `/node/session/translate/languages${type ? '?' + new URLSearchParams({type: 'file'}) : ''}`
  },
  filePostEditor: {
    translation: (id: string) => `/node/fileTranslation/postEditor/${id}`,
    fileInfo: (id: string) => `/node/fileTranslation/fileInfo/${id}`,
    download: (id: string) => `/node/fileTranslation/postEditor/export/${id}`,
    saveSentence: '/node/fileTranslation/saveSentence',
    createTM: '/node/fileTranslation/postEditor/tm/create',
    appendTM: '/node/fileTranslation/postEditor/tm/append',
    downloadTM: '/node/fileTranslation/postEditor/tm/download'
  },
  corpus: {
    list: ({directory}: {directory: string}) => `/node/corpusManager/list?${new URLSearchParams({directory}).toString()}`,
    details: ({id}: {id: string}) => `/node/corpusManager/details/${id}`,
    add: '/node/corpusManager/addCorpus',
    merge: '/node/corpusManager/merge',
    rename: ({id}: {id: string}) => `/node/corpusManager/rename/${id}`,
    delete: ({id}: {id: string}) => `/node/corpusManager/delete/${id}`,
    download: ({corpusId, ownerId, format}: {corpusId: string; ownerId?: string; format: 'text/bitext' | 'application/x-tmx+xml'}) => {
      const params = new URLSearchParams({
        format: format,
        ownerId: ownerId ?? ''
      });
      return `/node/corpusManager/download/${corpusId}?${params.toString()}`;
    },
    upload: '/node/corpusManager/upload'
  },
  resources: {
    tm: (type: 'users' | 'groups', resourceId: string) => `/node/resources/tm/${type}/${resourceId}`,
    permissions: (type: 'users' | 'groups') => `/node/resources/tm/${type}/permission`
  },
  feedback: {
    list: '/node/feedback/list',
    delete: (id: string) => '/node/feedback/delete/' + id,
    update: (id: string) => '/node/feedback/update/' + id,
    getFeedback: (id: string) => '/node/feedback/detail/' + id,
    getAccounts: '/node/feedback/accounts',
    listTM: '/node/corpusManager/list',
    addToTM: '/node/feedback/tm/append'
  },
  dictionary: {
    list: ({type}: {type: 'UD' | 'NORM'}) => `/node/gdict/dictionary/list?dictType=${type}`,
    add: '/node/gdict/dictionary',
    update: '/node/gdict/dictionary/update',
    delete: '/node/gdict/dictionary/delete',
    download: ({id}: {id: string}) => `/node/gdict/dictionary/export/${id}`,
    upload: ({id, accountId}: {id: string, accountId: string}) => `/node/gdict/dictionary/import?dictId=${id}&accountId=${accountId}`,
    users: (resourceId: string) => `/node/resources/dictionary/users/${resourceId}`,
    groups: (resourceId: string) => `/node/resources/dictionary/groups/${resourceId}`,
    permissions: (type: 'users' | 'groups') => `/node/resources/dictionary/${type}/permission`,
    addToUD: '/node/gdict/entry/add'
  },
  password: {
    rules: '/node/PasswordRules/',
    define: (id: string) => `/node/definePassword/${id}`,
    reset: (id: string) => `/node/resetPassword/${id}`,
    sendReset: '/node/resetPassword'
  },
  profiles: {
    profilesLps: '/node/profiles/lps',
    profilesOwner: '/node/profiles/owner',
    profilesDomain: '/node/profiles/domain',
    profilesSize: '/node/profiles/size',
    profilesTechno: '/node/profiles/techno',
    getCoversPivotProfile: '/node/getCoversPivotProfile',
    getEnabledProfilesNFA: '/node/getEnabledProfilesNFA',
    getListActivedProfile: (queryParams: string) => `/node/profiles?${queryParams}`,
    getLanguagePair: ({onlyRunning}: {onlyRunning: boolean}) => `/node/lps?onlyRunning=${onlyRunning}`,
    getDictionaries: ({source, target}: {source: string; target: string}) => `/node/resources/dictionary/list?source=${source}&target=${target}`,
    getTranslationMemories: ({source, target}: {source: string; target: string}) => `/node/corpusManager/names?source=${source}&target=${target}`,
    getEngines: ({source, target, onlyLastVersion}: {source: string; target: string; onlyLastVersion: boolean}) =>
      `/node/resources/engine/list?source=${source}&target=${target}&onlyLastVersion=${onlyLastVersion ?? true}`,
    getGroupListLight: (withRoles: boolean) => `/node/admin/groups/light?withRoles=${withRoles}`,
    getAccountListLight: (queryParams: string) => `/node/admin/users/light?${queryParams}`,
    createProfile: '/node/profiles/create',
    activateProfiles: '/node/profiles/activate',
    deactivateProfiles: '/node/profiles/deactivate',
    deleteProfiles: '/node/profiles/delete',
    updateProfile: '/node/profiles/update',
    editProfile: '/node/profiles/edit',
    getEntityRules: '/node/resources/entityRule/names',
    getStyleSheets: '/node/resources/sts/names',
    getTranslationChoices: '/node/resources/trc/names'
  },
  statistics: {
    fullView: '/node/activity/details',
    byUser: (userId: string) => `/node/activity/user/${userId}/details`,
    byGroup: (groupId: string) => `/node/activity/group/${groupId}/details`,
    byProfile: '/node/activity/'
  }
};

export default Apis;
