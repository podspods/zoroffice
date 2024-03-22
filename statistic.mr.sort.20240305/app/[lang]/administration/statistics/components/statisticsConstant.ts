import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import {
  Column,
  DetailStatistic,
  SessionStatistic,
  TypeStat
} from './statisticsType';
import InternalRoutes from '@/utils/internalRoutes';
import AvatarLink from './AvatarLink';

export enum StatType {
  STAT_BY_USER = 1,
  STAT_BY_GROUP,
  STAT_BY_PROFILE,
  STAT_BY_REQUESTS,
  STAT_BY_SESSIONS
}

export const DOWLOAD_CSV = 'Download CSV';

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

export const fullViewTypeStat: TypeStat[] = [
  {
    id: StatType.STAT_BY_REQUESTS,
    label: 'Requests',
    name: 'Full view Statistics'
  },
  {
    id: StatType.STAT_BY_SESSIONS,
    label: 'Sessions',
    name: 'Session view Statistics'
  }
];

export const userViewColumnList: Column[] = [
  {
    field: 'name',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language Pair',
    hidden: true,
    hideable: true,
    flex: 0.1,
    renderHeaderFilter: () => null,
    sortable: false
  },
  {
    field: 'source',
    label: 'Source',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'target',
    label: 'Target',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: 'User Agent',
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
    label: 'Requests',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'success',
    label: 'Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestError',
    label: 'Error (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: '% of Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'nbSegments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCacheHits',
    label: 'Segments in Cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbTus',
    label: 'TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbTusFailed',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'elapsedTime',
    label: 'Elapsed Time',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCharacters',
    label: 'Characters',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCharactersCacheHits',
    label: 'Characters in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  }
];

export const groupViewcolumnList: Column[] = [
  {
    field: 'name',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language Pair',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'source',
    label: 'Source',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'target',
    label: 'Target',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: 'User Agent',
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
    label: 'Requests',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'success',
    label: 'Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestError',
    label: 'Error (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: '% of Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbSegments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCacheHits',
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
    label: 'Elapsed Time',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCharacters',
    label: 'Characters',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCharactersCacheHits',
    label: 'Characters in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  }
];

export const profileViewcolumnList: Column[] = [
  {
    field: 'profileName',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language Pair',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'sourceLanguage',
    label: 'Source',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'targetLanguage',
    label: 'Target',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalAccounts',
    label: 'Users',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'total',
    label: 'Requests',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalSuccess',
    label: 'Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalError',
    label: 'Error (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'avgSuccess',
    label: '% of Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbSegments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCacheHits',
    label: 'Segments cache hit',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },

  {
    field: 'totalNbTus',
    label: 'TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalNbTusFailed',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalElapsedTime',
    label: 'Elapsed Time',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalNbCharacters',
    label: 'Characters',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  }
];

export const detailViewColumnList: Column[] = [
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
    sortable: false
  },
  {
    field: 'accountName',
    label: 'User Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams<DetailStatistic>) => {
      const url = row?.userId ? `${InternalRoutes.users}${row.userId}` : '#';
      const label = row?.accountName ? row.accountName : '';
      return AvatarLink({
        url: url,
        label: label
      });
    }
  },
  {
    field: 'langPair',
    label: 'Language Pair',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'sourceLanguage',
    label: 'Source',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'targetLanguage',
    label: 'Target',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },

  {
    field: 'profileName',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
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
    label: 'User Agent',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },

  {
    field: 'mimetype',
    label: 'Mime-type',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'request',
    label: 'Requests',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'requestSuccess',
    label: 'Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestError',
    label: 'Error (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: '% of Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbSegments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCacheHits',
    label: 'Segments in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },

  {
    field: 'nbTus',
    label: 'TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbTusFailed',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'elapsedTime',
    label: 'Elapsed Time',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCharacters',
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
export const sessionViewColumnList: Column[] = [
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
    sortable: false
  },
  {
    field: 'accountName',
    label: 'User Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams<SessionStatistic>) => {
      const url = row?.accountId
        ? `${InternalRoutes.users}${row.accountId}`
        : '#';
      const label = row?.accountName ? row.accountName : '';
      return AvatarLink({
        url: url,
        label: label
      });
    }
  },
  {
    field: 'langPair',
    label: 'Language Pair',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'sourceLanguage',
    label: 'Source',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'targetLanguage',
    label: 'Target',
    hidden: false,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'profileName',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
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
    label: 'User Agent',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'mimetype',
    label: 'Mime-type',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'total',
    label: 'Requests',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalSuccess',
    label: 'Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalError',
    label: 'Error (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'avgError',
    label: '% of Success (Requests)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbSegments',
    label: 'Segments',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'nbCacheHits',
    label: 'Segments in cache',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalNbTus',
    label: 'TUs',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalNbTusFailed',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalElapsedTime',
    label: 'Elapsed Time',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'totalNbCharacters',
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
