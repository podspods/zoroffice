import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import {
  GridColDef,
  GridColumnVisibilityModel,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';

import {
  Account,
  Column,
  DetailStatistic,
  Group,
  GroupViewStat,
  Period,
  ProfileViewStat,
  RawAccount,
  RawDetailStat,
  RawGroup,
  RawGroupViewStat,
  RawProfileViewStat,
  RawUserViewStat,
  UserViewStat
} from './statisticsType';

export type toDetailStatListReturn = {
  result: DetailStatistic[];
  totalChar: number;
  totalUser: number;
};

export function toDetailStatList(
  rawDetailStatList: RawDetailStat[]
): toDetailStatListReturn {
  let totalChar = 0;
  if (!rawDetailStatList?.length)
    return { result: [], totalChar: 0, totalUser: 0 };

  const result: DetailStatistic[] = rawDetailStatList
    .filter((oneRow) => oneRow.sourceLanguage !== 'AUTO')
    .map((oneRow) => {
      totalChar = oneRow.nbCharacters
        ? totalChar + oneRow.nbCharacters
        : totalChar;
      return toDetailStat(oneRow);
    });
  const totalUser = countDistinctUser(result);
  return { result: result, totalChar: totalChar, totalUser: totalUser };
}

function countDistinctUser(dataList: DetailStatistic[]) {
  const uniqueUsernames = dataList
    .map((detailStat) => detailStat.userName)
    .filter((value, index, self) => self.indexOf(value) === index);

  return uniqueUsernames.length;
}

function toDetailStat(oneRow: RawDetailStat): DetailStatistic {
  const myDate = DateTime.fromISO(oneRow.date, { zone: 'utc' });
  const result: DetailStatistic = {
    id: oneRow.id,
    date: myDate,
    moment: myDate.toRelative({ locale: 'en' }) || '',
    userId: oneRow.accountId,
    userName: oneRow.accountName,
    groupList: '',
    profileNameAgg: oneRow.profileName,
    profileNameFull: oneRow.profileName,
    operation: oneRow.operation,
    total: undefined,
    success: oneRow.success ? 1 : 0,
    langPair: `${oneRow.sourceLanguage} > ${oneRow.targetLanguage}`,
    sourceLang: oneRow.sourceLanguage,
    targetLang: oneRow.targetLanguage,
    mimeType: oneRow.mimetype,
    request: 1,
    requestSuccess: oneRow.success ? 1 : 0,
    requestError: oneRow.success ? 0 : 1,
    requestSuccessPercent: oneRow.success ? 100 : 0,
    segment: oneRow.nbSegments,
    segmentInCache: undefined,
    segmentInCacheHit: oneRow.nbCacheHits,
    character: oneRow.nbCharacters,
    characterInCache: undefined,
    tus: oneRow.nbTus,
    tusFail: oneRow.nbTusFailed,
    elapsedTime: oneRow.elapsedTime,
    userAgent: oneRow.userAgent
  };
  return result;
}

export type ToUserViewStatReturn = {
  rowList: UserViewStat[];
  totalChar: number;
};

export function toUserViewStat(
  rawData: RawUserViewStat[],
  account: Account = {
    id: '',
    displayName: '',
    groupIds: [],
    current: false
  }
): ToUserViewStatReturn {
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  let totalChar = 0;

  const result: UserViewStat[] = rawData.map((oneRow) => {
    const myDate = DateTime.fromISO(oneRow.lastUsed, { zone: 'utc' });
    totalChar += oneRow.total.nbCharacters;
    return {
      id: oneRow.id,
      date: myDate,
      moment: myDate.toRelative({ locale: 'en' }) || '',
      userName: account.displayName,
      groupList: '',
      profileNameAgg: oneRow.name,
      profileNameFull: oneRow.name,
      operation: '',
      total: oneRow.total.nbCharacters,
      success: oneRow.total.success,
      langPair: `${oneRow.source.toUpperCase()} > ${oneRow.target.toUpperCase()}`,
      sourceLang: oneRow.source,
      targetLang: oneRow.target,
      mimeType: oneRow.total.mimeType.join(', '),
      request: oneRow.total.request,
      requestSuccess: oneRow.total.success,
      requestError: oneRow.total.request - oneRow.total.success,
      requestSuccessPercent:
        (oneRow.total.success * 100) / oneRow.total.request,
      segment: oneRow.total.nbSegments,
      segmentInCache: oneRow.total.nbCacheHits,
      segmentInCacheHit: oneRow.total.nbCacheHits,
      character: oneRow.total.nbCharacters,
      characterInCache: oneRow.total.nbCharactersCacheHits,
      tus: oneRow.total.nbTus,
      tusFail: oneRow.total.nbTusFailed,
      elapsedTime: oneRow.total.elapsedTime,
      userAgent: oneRow.total.userAgent.join(', ')
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}

export type ToGroupViewStatReturn = {
  rowList: GroupViewStat[];
  totalChar: number;
};

export function toGroupViewStat(
  rawData: RawGroupViewStat[],
  group: Group
): ToGroupViewStatReturn {
  if (!rawData?.length) return { rowList: [], totalChar: 0 };
  let totalChar = 0;
  const result: GroupViewStat[] = rawData.map((oneRow) => {
    totalChar += oneRow.total.nbCharacters;
    const myDate = DateTime.fromISO(oneRow.lastUsed, { zone: 'utc' });

    return {
      id: oneRow.id,
      date: myDate,
      moment: myDate.toRelative({ locale: 'en' }) || '',
      userName: '',
      groupList: group.name,
      profileNameAgg: oneRow.name,
      profileNameFull: oneRow.name,
      operation: '',
      total: oneRow.total.nbCharacters,
      success: oneRow.total.success,
      langPair: `${oneRow.source.toUpperCase()} > ${oneRow.target.toUpperCase()}`,
      sourceLang: oneRow.source,
      targetLang: oneRow.target,
      mimeType: oneRow.total.mimeType.join(', '),
      request: oneRow.total.request,
      requestSuccess: oneRow.total.success,
      requestError: oneRow.total.request - oneRow.total.success,
      requestSuccessPercent:
        (oneRow.total.success * 100) / oneRow.total.request,
      segment: oneRow.total.nbSegments,
      segmentInCache: oneRow.total.nbCacheHits,
      segmentInCacheHit: oneRow.total.nbCacheHits,
      character: oneRow.total.nbCharacters,
      characterInCache: oneRow.total.nbCharactersCacheHits,
      tus: oneRow.total.nbTus,
      tusFail: oneRow.total.nbTusFailed,
      elapsedTime: oneRow.total.elapsedTime,
      userAgent: oneRow.total.userAgent.join(', ')
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}

export type ToProfileViewStatReturn = {
  rowList: ProfileViewStat[];
  totalChar: number;
  totalUser: number;
};

export function toProfileViewStat(
  rawData: RawProfileViewStat[]
): ToProfileViewStatReturn {
  if (!rawData?.length) return { rowList: [], totalChar: 0, totalUser: 0 };

  let totalChar = 0;
  let totalUser = 0;
  const result: ProfileViewStat[] = rawData.map((oneRow) => {
    totalChar += oneRow.totalNbCharacters;
    totalUser += oneRow.totalAccounts;
    const myDate = DateTime.fromObject({ year: 1970, month: 1, day: 1 });
    return {
      id: `no_id_profil_${oneRow.profileName}`,
      date: myDate,
      moment: myDate.toRelative({ locale: 'en' }) || '',
      userName: '',
      userCount: oneRow.totalAccounts,
      groupList: '',
      profileNameAgg: oneRow.profileName,
      profileNameFull: oneRow.profileName,
      operation: '',
      total: oneRow.total,
      success: oneRow.totalSuccess,
      langPair: `${oneRow.sourceLanguage.toUpperCase()} > ${oneRow.targetLanguage.toUpperCase()}`,
      sourceLang: oneRow.sourceLanguage,
      targetLang: oneRow.targetLanguage,
      mimeType: '',
      request: oneRow.total,
      requestSuccess: oneRow.totalSuccess,
      requestError: oneRow.totalError,
      requestSuccessPercent: oneRow.avgSuccess,
      segment: oneRow.nbSegments,
      segmentInCache: oneRow.nbCacheHits,
      segmentInCacheHit: oneRow.nbCacheHits,
      character: oneRow.totalNbCharacters,
      characterInCache: undefined,
      tus: oneRow.totalNbTus,
      tusFail: oneRow.totalNbTusFailed,
      elapsedTime: oneRow.totalElapsedTime,
      userAgent: ''
    };
  });
  return {
    rowList: result,
    totalChar: totalChar,
    totalUser: totalUser
  };
}

function getColumnVisible(columnList: Column[]): GridColumnVisibilityModel {
  if (!columnList) return {};
  const result: string[] = columnList
    .filter((column) => column.hidden)
    .map((column) => column.field);
  const resultReturn: GridColumnVisibilityModel = result.reduce(
    (acc, key: string) => {
      acc[key] = false;
      return acc;
    },
    {} as GridColumnVisibilityModel
  );
  return resultReturn;
}

export function langPair({ row }: { row: GridValidRowModel }): string {
  return `${row.sourceLang as string} > ${row.targetLang as string}`;
}
export function defaultPeriod(): [DateTime, DateTime] {
  const endDate: DateTime = DateTime.now();
  const dayOfMonth = endDate.day;
  const startDate =
    dayOfMonth !== 1
      ? endDate.startOf('month')
      : endDate.minus({ months: 1 }).startOf('month');
  return [startDate, endDate];
}

export function last12Month(): Period[] {
  const array12 = Array(12).fill(1);
  let currentDate = DateTime.now();

  const last12month: Period[] = array12.map(() => {
    const periodNumber = currentDate.toFormat('yyyy-M');
    const periodString = currentDate.setLocale('en').toFormat('MMMM yyyy');
    currentDate = currentDate.minus({ months: 1 });
    return { monthNumber: periodNumber, monthString: periodString };
  });
  return last12month;
}
export function getCurrentPeriod(): Period {
  const currentDate = DateTime.now();
  return {
    monthNumber: currentDate.toFormat('yyyy-M'),
    monthString: currentDate.setLocale('en').toFormat('MMMM yyyy')
  };
}

export type InitGroupListReturn = {
  groupList: Group[];
  count: number;
};

export function initGroupList(
  rawData: RawGroup,
  currentGroup: Group,
  setCurrentGroup: (group: Group) => void
): InitGroupListReturn {
  const result = getGroupList(rawData);
  if ((!currentGroup || currentGroup.id === '') && result.groupList.length > 0)
    setCurrentGroup(result.groupList[0]);
  return result;
}

function getGroupList(rawData: any): InitGroupListReturn {
  if (!rawData || !rawData.groups || rawData.groups.length <= 0)
    return { groupList: [], count: 0 };

  return {
    groupList: rawData.groups,
    count: rawData.total ? rawData.total : rawData.groups.length
  };
}

export type InitAccountListReturn = {
  accountList: Account[];
  count: number;
};

export function initAccountList(
  rawData: RawAccount,
  currentAccount: Account,
  setCurrentAccount: (accont: Account) => void
): InitAccountListReturn {
  const result: InitAccountListReturn = getAccountList(rawData);

  if (currentAccount.id === '' && result.accountList.length > 0)
    setCurrentAccount(result.accountList[0]);

  return result;
}

function getAccountList(rawData: RawAccount): InitAccountListReturn {
  if (!rawData || !rawData.accounts || rawData.accounts.length <= 0)
    return { accountList: [], count: 0 };

  return {
    accountList: rawData.accounts,
    count: rawData.total ? rawData.total : rawData.accounts.length
  };
}

export function mergeColumn(
  baseColumnList: Column[],
  specifiqueColumnList: Column[] = []
): Column[] {
  if (!baseColumnList) return [];
  if (specifiqueColumnList.length <= 0 && baseColumnList) return baseColumnList;

  const resultColumnList: Column[] = baseColumnList.map((column) => {
    const columnMod = specifiqueColumnList.find((columnMod) => {
      return columnMod.field === column.field;
    });
    return columnMod ? { ...column, ...columnMod } : column;
  });
  return resultColumnList;
}

export type UseColumnsReturn = {
  columnVisibilityModel: GridColumnVisibilityModel;
  columnList: GridColDef<GridValidRowModel>[];
};

export function useColumns(
  baseColumnList: Column[],
  specificUserViewColumnList: Column[]
): UseColumnsReturn {
  const userViewDataField: Column[] = mergeColumn(
    baseColumnList,
    specificUserViewColumnList
  );

  const columnVisibilityModel: GridColumnVisibilityModel = getColumnVisible(
    userViewDataField
  );
  const columnList = createColumns(userViewDataField);
  return { columnList, columnVisibilityModel };
}

export function createColumns(columnList: Column[]) {
  const { t } = useTranslation();
  const columnListFilter = columnList.filter((column) => !column.remove);
  const columns: GridColDef<GridValidRowModel>[] = columnListFilter.map(
    (column) => {
      const result: GridColDef<GridValidRowModel> = {
        headerName: column.label ? t(column.label) : t('No header name'),
        sortable: column.sortable,
        field: column.field,
        renderHeaderFilter: column.renderHeaderFilter,
        valueGetter: column.valueGetter || undefined,
        flex: column.flex,
        renderCell: column.renderCell
      };
      return result;
    }
  );
  return useMemo<GridColDef<GridValidRowModel>[]>(() => columns, [t]);
}
