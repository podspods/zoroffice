import { Column } from './statisticsType';
import { langPair } from './statisticsUtils';

export const EXPORT_TO_CSV = 'Export data to csv';
export const DATE_PERIOD = 'Date Period';
export const _DATE = 'Date';

export const STAT_USER = 'Aggregated by USERS';
export const STAT_PROFILE = 'Aggregated by PROFILES';
export const STAT_GROUP = 'Aggregated by GROUPS';
export const STAT_FULL = 'Full view STATISTICS';

export const ID = 'Id';
export const USER_NAME = 'User Name';
export const GROUP_NAME = 'Group Name';
export const LANG_PAIR = 'Language pair';
export const SOURCE_LANG = 'Source Lang';
export const TARGET_LANG = 'Target Lang';
export const PROFILE_NAME = 'Profile Name';
export const USER_AGENT = 'User-Agent';
export const MIME_TYPE = 'Mime-type';
export const CHARACTER = 'Characters';
export const OPERATION = 'operation';
export const SUCCESS = 'Success';
export const REQUEST = 'request';
export const REQUEST_SUCCESS = 'Success (Request)';
export const REQUEST_ERROR = 'Error (Request)';
export const REQUEST_SUCCESS_PERCENT = '% of Success (Request)';
export const SEGMENTS = 'Segments';
export const SEGMENT_CACHE = 'Segments in cache';
export const CHARACTER_CACHE = 'Characters in cache';
export const TUS = 'TUs';
export const TUS_FAIL = 'Failed TUs';
export const ELAPSED_TIME = 'Elapsed Time (ms)';
export const PERIOD = 'Period';
export const AGGREGATE_BY = 'Aggregate by';
export const TOTAL_CHAR = 'Total Characters';
export const TOTAL_USER = 'Total Users';
export const TOTAL_PROFILE = 'Total Profile';
export const ALL = 'All';
export const USER = 'User';
export const GROUP = 'Group';
export const PROFILE = 'Profile';
export const SELECT_USER = 'Select Users';
export const SELECT_GROUP = 'Select Groups';

export const DEFAULT_HEADER = 'no header name';
export const DATA_MISSING = 'data-missing';

export const statCategory: string[] = [USER, GROUP, PROFILE];

export const ID_INIT = 0;
export const ID_TOTAL_CHAR = ID_INIT + 1;

export const baseColumnList: Column[] = [
  {
    field: 'id',
    label: ID,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'date',
    label: _DATE,
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'userList',
    label: USER_NAME,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'groupList',
    label: GROUP_NAME,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'langPair',
    label: LANG_PAIR,
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    valueGetter: langPair,
    flex: 1,
    sortable: true
  },
  {
    field: 'sourceLang',
    label: SOURCE_LANG,
    hidden: true,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'targetLang',
    label: TARGET_LANG,
    hidden: true,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'profileName',
    label: PROFILE_NAME,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: USER_AGENT,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'mimeType',
    label: MIME_TYPE,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'character',
    label: CHARACTER,
    hidden: false,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'operation',
    label: OPERATION,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'success',
    label: SUCCESS,
    hidden: true,
    hideable: true,
    flex: 1,
    sortable: true
  },
  {
    field: 'request',
    label: REQUEST,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'requestSuccess',
    label: REQUEST_SUCCESS,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'requestError',
    label: REQUEST_ERROR,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: REQUEST_SUCCESS_PERCENT,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'segments',
    label: SEGMENTS,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'segmentsCache',
    label: SEGMENT_CACHE,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'numberCharCache',
    label: CHARACTER_CACHE,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'tus',
    label: TUS,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'tusFail',
    label: TUS_FAIL,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 1,
    sortable: true
  },
  {
    field: 'elapsedTime',
    label: ELAPSED_TIME,
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    sortable: true
  }
];

export const specificUserViewColumnList: Column[] = [
  {
    field: 'userList',
    remove: true
  },
  {
    field: 'groupList',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'operation',
    remove: true
  }
];

export const specificGroupViewColumnList: Column[] = [
  {
    field: 'userList',
    remove: true
  },
  {
    field: 'groupList',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'operation',
    remove: true
  }
];
export const specificProfileViewColumnList: Column[] = [
  {
    field: 'userList',
    remove: true
  },
  {
    field: 'groupList',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'operation',
    remove: true
  },
  {
    field: 'mimeType',
    hidden: true
  },
  {
    field: 'segmentsCache',
    remove: true
  },
  {
    field: 'numberCharCache',
    remove: true
  },
  {
    field: 'userAgent',
    remove: true
  }
];

export const specificFullViewColumnList: Column[] = [
  {
    field: 'numberCharCache',
    remove: true
  }
];
