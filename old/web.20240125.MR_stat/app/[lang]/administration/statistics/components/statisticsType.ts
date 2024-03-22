import {
  GridHeaderFilterCellProps,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';
import { DateTime } from 'luxon';
import { ReactNode } from 'react';

export type Column = {
  field: string;
  label?: string;
  hidden?: boolean;
  hideable?: boolean;
  renderHeaderFilter?: (params: GridHeaderFilterCellProps) => ReactNode;
  valueGetter?: ({ row }: { row: GridValidRowModel }) => string;
  sortable?: boolean;
  remove?: boolean;
};

type Statistic = {
  id: string;
  date: DateTime;
  groupList: string;
  userList: string; // Userlist concat
  profileName: string;
  operation: string;
  total: number;
  success: number;
  langPair: string;
  sourceLang: string;
  targetLang: string;
  mimeType: string;
  request: number;
  requestSuccess: number;
  requestError: number;
  requestSuccessPercent: number;
  segment: number;
  segmentInCache: number;
  segmentInCacheHit: number;
  character: number;
  characterInCache: number;
  tus: number;
  tusFail: number;
  elapsedTime: number;
  userAgent: string;
};
export type UserViewStat = Statistic;
export type ProfileViewStat = Statistic;
export type GroupViewStat = Statistic;
export type DetailStatistic = Statistic;

export type RawDetailStat = {
  id: string;
  date: string;
  accountId: string;
  accountName: string;
  sourceLanguage: string;
  targetLanguage: string;
  profileId: string;
  profileName: string;
  operation: string;
  success: boolean;
  elapsedTime: number;
  mimetype: string;
  nbCharacters: number;
  nbTokens: string;
  nbTus: number;
  nbTusFailed: number;
  userAgent: string;
  nbSegments: number;
  nbCacheHits: number;
};

export type RawUserViewStat = {
  id: string;
  lastUsed: string;
  name: string;
  source: string;
  target: string;
  total: {
    mimeType: string[];
    userAgent: string[];
    request: number;
    success: number;
    nbSegments: number;
    nbCacheHits: number;
    nbCharacters: number;
    nbCharactersCacheHits: number;
    elapsedTime: number;
    nbTus: number;
    nbTusfail: number;
  };
};

export type RawGroupViewStat = {
  id: string;
  lastUsed: string;
  name: string;
  source: string;
  target: string;
  translationResourceId: string;
  total: {
    mimeType: string[];
    userAgent: string[];
    request: number;
    success: number;
    nbSegments: number;
    nbCacheHits: number;
    nbCharacters: number;
    nbCharactersCacheHits: number;
    elapsedTime: number;
    nbTokens: number;
    nbTus: number;
    nbTusFailed: number;
  };
};

export type ZUser = {
  id: string;
  name: string;
  groupIds?: string[];
  current?: boolean;
};

export type Account = {
  id: string;
  displayName: string;
  groupIds: string[];
  current: boolean;
};

export const accountInit: Account = {
  id: '',
  displayName: '',
  groupIds: [],
  current: false
};

export type RawAccount = {
  offset: number;
  limit: number;
  total: number;
  accounts: Account[];
};

export type Group = {
  id: string;
  name: string;
  roles: string[];
  accounts: string[];
};

export const groupInit: Group = {
  id: '',
  name: '',
  roles: [],
  accounts: []
};

export type RawGroup = {
  offset: number;
  limit: number;
  total: number;
  groups: Group[];
};

export type RawProfileViewStat = {
  total: number;
  totalSuccess: number;
  avgSuccess: number;
  totalError: number;
  avgError: number;
  nbSegments: number;
  nbCacheHits: number;
  totalNbCharacters: number;
  avgNbCharacters: number;
  totalNbTokens: number;
  avgNbTokens: number;
  totalNbTus: number;
  avgNbTus: number;
  totalNbTusFailed: number;
  avgNbTusFailed: number;
  totalElapsedTime: number;
  avgElapsedTime: number;
  sourceLanguage: string;
  targetLanguage: string;
  profileName: string;
  profileId: string;
  selectors: {
    domain: string;
    owner: string;
    size: string;
    tech: {
      name: string;
      type: string;
    };
  };
  totalAccounts: number;
};

/** -+-+-+-+-+-+-+-+-+--+-+-+-+-++ not safe below -+-+-+-+-+-+-+-+-+--+-+-+-+-++ */

export type userDetailStat = {
  id: string;
  accountName: string;
  date: string;
  elapsedTime: 122;
  mimetype: string;
  nbCacheHits: number;
  nbCharacters: number;
  nbSegments: number;
  nbTokens: number;
  nbTus: number;
  nbTusFailed: number;
  operation: string;
  profileId: string;
  profileName: string;
  sourceLanguage: string;
  success: boolean;
  targetLanguage: string;
  userAgent: string;
};
