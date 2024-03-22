import { ReactNode } from 'react';
import { DateTime } from 'luxon';
import {
  GridHeaderFilterCellProps,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';

export type Column = {
  field: string;
  label?: string;
  hidden?: boolean;
  hideable?: boolean;
  renderHeaderFilter?: (params: GridHeaderFilterCellProps) => ReactNode;
  valueGetter?: ({ row }: { row: GridValidRowModel }) => string;
  sortable?: boolean;
  remove?: boolean;
  flex?: number;
};

type Statistic = {
  id: string;
  moment: string;
  date: DateTime;
  groupList: string;
  userList: string; // Userlist concat
  userCount?: number;
  profileNameAgg: string;
  profileNameFull: string;
  operation: string;
  total?: number;
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
  segmentInCache?: number;
  segmentInCacheHit: number;
  character: number;
  characterInCache?: number;
  tus: number;
  tusFail: number;
  elapsedTime: number;
  userAgent: string;
};
export type UserViewStat = Statistic;
export type ProfileViewStat = Statistic;
export type GroupViewStat = Statistic;
export type DetailStatistic = Statistic;
export type PersonalStatistic = Statistic;


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
  translationResourceId?: string;
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
    nbTusFailed: number;
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

export type Account = {
  id: string;
  displayName: string;
  groupIds: string[];
  current: boolean;
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

export type Period = {
  monthNumber: string;
  monthString: string;
};

export type TypeStat = {
  id: number;
  label: string;
  name: string;
};

export type PersonalData = {
  id: string;
  lastUsed: string;
  name: string;
  source: string;
  target: string;
  translationResourceId: string;
  total: {
    elapsedTime: number;
    mimeType: string[];
    nbCacheHits: number;
    nbCharacters: number;
    nbCharactersCacheHits: number;
    nbSegments: number;
    nbTus: number;
    nbTusFailed: number;
    request: number;
    success: number;
    userAgent: string[];
  };
};

export type RawPersonalStat = {
  global: Global;
  id: string;
  name: string;
  date: string;
  data: PersonalData[];
  total: number;
  offset: number;
};
