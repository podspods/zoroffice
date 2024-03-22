import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import { Column, Statistic, TypeStat } from './statisticsType';
import InternalRoutes from '@/utils/internalRoutes';
import AvatarLink from './AvatarLink';

export enum StatType {
  STAT_BY_USER = 1,
  STAT_BY_GROUP = 2,
  STAT_BY_PROFILE = 3,
  STAT_BY_DETAIL = 4,
  STAT_BY_SESSION = 5
}

export const userStat: TypeStat = {
  id: StatType.STAT_BY_USER,
  label: 'Users',
  name: 'Aggregated Statistics by User'
};
export const groupStat: TypeStat = {
  id: StatType.STAT_BY_GROUP,
  label: 'Groups',
  name: 'Aggregated Statistics by Group'
};

export const profileStat: TypeStat = {
  id: StatType.STAT_BY_PROFILE,
  label: 'Profiles',
  name: 'Aggregated Statistics by Profile'
};

export const statCategoryFull: TypeStat[] = [
  {
    id: StatType.STAT_BY_DETAIL,
    label: 'Requests',
    name: 'Full view Statistics'
  },
  {
    id: StatType.STAT_BY_SESSION,
    label: 'Sessions',
    name: 'Session view Statistics'
  }
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
    field: 'moment',
    label: 'Moment',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },

  {
    field: 'userName',
    label: 'User Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams<Statistic>) => {
      const url = row?.userId ? `${InternalRoutes.users}${row.userId}` : '#';
      const label = row?.userName ? row.userName : '';
      return AvatarLink({
        url: url,
        label: label
      });
    }
  },

  {
    field: 'profileNameAgg',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language pair',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
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
    field: 'profileNameFull',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'userCount',
    label: 'Users',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'operation',
    label: 'Operation',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: 'User-Agent',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'mimeType',
    label: 'Mime-type',
    hidden: false,
    hideable: true,
    flex: 0.2,
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
    field: 'segment',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'segmentInCache',
    label: 'Segments in cache',
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
  },
  {
    field: 'character',
    label: 'Characters',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'characterInCache',
    label: 'Characters in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  }
];

export const specificUserViewColumnList: Column[] = [
  {
    field: 'id',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'moment',
    remove: true
  },
  {
    field: 'userName',
    remove: true
  },
  {
    field: 'profileNameFull',
    remove: true
  },
  {
    field: 'requestError',
    remove: true
  },
  {
    field: 'userCount',
    remove: true
  },
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
    field: 'id',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'moment',
    remove: true
  },
  {
    field: 'userName',
    remove: true
  },
  {
    field: 'profileNameFull',
    remove: true
  },
  {
    field: 'requestError',
    remove: true
  },
  {
    field: 'userCount',
    remove: true
  },
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
    field: 'id',
    remove: true
  },
  {
    field: 'date',
    remove: true
  },
  {
    field: 'moment',
    remove: true
  },
  {
    field: 'userName',
    remove: true
  },
  {
    field: 'profileNameFull',
    remove: true
  },
  {
    field: 'requestError',
    remove: true
  },
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
    field: 'numberCharCache',
    remove: true
  }
];

export const specificFullViewColumnList: Column[] = [
  {
    field: 'id',
    remove: true
  },

  {
    field: 'userCount',
    remove: true
  },
  {
    field: 'profileNameAgg',
    remove: true
  },
  {
    field: 'success',
    remove: true
  },
  {
    field: 'userCount',
    remove: true
  },
  {
    field: 'tus',
    hidden: false
  },
  {
    field: 'elapsedTime',
    hidden: false
  }
];

