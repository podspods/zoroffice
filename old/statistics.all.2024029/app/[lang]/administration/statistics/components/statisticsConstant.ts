import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import { Column, Statistic, TypeStat } from './statisticsType';
import InternalRoutes from '@/utils/internalRoutes';
import LinkInternal from './LinkInternal';
import Avatar from '@mui/material/Avatar';
import MyAvatar from './MyAvatar';

export const STAT_ID = 0;
export const STAT_BY_USER = STAT_ID + 1;
export const STAT_BY_GROUP = STAT_ID + 2;
export const STAT_BY_PROFILE = STAT_ID + 3;
export const STAT_BY_DETAIL = STAT_ID + 4;
export const STAT_BY_SESSION = STAT_ID + 5;

export const userStat: TypeStat = {
  id: STAT_BY_USER,
  label: 'Users',
  name: 'Aggregated Statistics by User'
};
export const groupStat: TypeStat = {
  id: STAT_BY_GROUP,
  label: 'Groups',
  name: 'Aggregated Statistics by Group'
};

export const profileStat: TypeStat = {
  id: STAT_BY_PROFILE,
  label: 'Profiles',
  name: 'Aggregated Statistics by Profile'
};

export const statCategoryFull: TypeStat[] = [
  { id: STAT_BY_DETAIL, label: 'Requests', name: 'Full view Statistics' },
  { id: STAT_BY_SESSION, label: 'Sessions', name: 'Session view Statistics' }
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
      return LinkInternal({
        url: url,
        label: label
      });
    }
  },
  {
    field: 'userName2',
    label: 'User Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true,
    // renderCell: ({ row }: GridRenderCellParams<Statistic>) => MyAvatar({ row })
    renderCell: ({ row }: GridRenderCellParams<Statistic>) => {
      return MyAvatar({
        username: row.userName
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