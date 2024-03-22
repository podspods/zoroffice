import { Column, TypeStat } from './statisticsType';
import { langPair } from './statisticsUtils';

export const statCategoryAggregated: TypeStat[] = [
  { id: 0, label: 'User', name: 'Aggregated by USERS' },
  { id: 1, label: 'Group', name: 'Aggregated by GROUPS' },
  { id: 2, label: 'Profile', name: 'Aggregated by PROFILES' }
];

export const statCategory: TypeStat[] = [
  ...statCategoryAggregated,
  { id: 3, label: 'fullView', name: 'Full view STATISTICS' }
];

export const baseColumnList: Column[] = [
  {
    field: 'id',
    label: 'Id',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'date',
    label: 'Date',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userList',
    label: 'User Name',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'groupList',
    label: 'Group Name',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language pair',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    valueGetter: langPair,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'sourceLang',
    label: 'Source Lang',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'targetLang',
    label: 'Target Lang',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'profileName',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: 'User-Agent',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'mimeType',
    label: 'Mime-type',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'character',
    label: 'Characters',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'operation',
    label: 'operation',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'success',
    label: 'Success',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'request',
    label: 'Request',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccess',
    label: 'Success (Request)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestError',
    label: 'Error (Request)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: '% of Success (Request)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'segments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'segmentsCache',
    label: 'Segments in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'numberCharCache',
    label: 'Characters in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'tus',
    label: 'TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'tusFail',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'elapsedTime',
    label: 'Elapsed Time (ms)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
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
  },
  {
    field: 'profileName',
    flex: 0.2
  },
  {
    field: 'userAgent',
    flex: 0.2
  },
  {
    field: 'mimeType',
    flex: 0.2
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
  },
  {
    field: 'profileName',
    flex: 0.2
  },
  {
    field: 'userAgent',
    flex: 0.2
  },
  {
    field: 'mimeType',
    flex: 0.2
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
  },
  {
    field: 'profileName',
    flex: 0.2
  }
];

export const specificFullViewColumnList: Column[] = [
  {
    field: 'numberCharCache',
    remove: true
  }
];
