import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { TFunction } from 'i18next';
import { uniqueId } from 'lodash';
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
  ProfileViewStat,
  RawAccount,
  RawDetailStat,
  RawGroupViewStat,
  RawProfileViewStat,
  RawUserViewStat,
  UserViewStat
} from './statisticsType';
import { DATA_MISSING, DEFAULT_HEADER } from './statisticsConstant';

export type toDetailStatListReturn = {
  result: DetailStatistic[];
  totalChar: number;
  totalUser: number;
};

export function toDetailStatList(
  rawDetailStatList: RawDetailStat[]
): toDetailStatListReturn {
  let totalChar = 0;
  if (!rawDetailStatList) return { result: [], totalChar: 0, totalUser: 0 };
  if (rawDetailStatList.length <= 0)
    return { result: [], totalChar: 0, totalUser: 0 };
  const result: DetailStatistic[] = rawDetailStatList.map((oneRow) => {
    totalChar = oneRow.nbCharacters
      ? totalChar + oneRow.nbCharacters
      : totalChar;
    return convertToDetailStat(oneRow);
  });
  const totalUser = countDistinctUser(result);
  return { result: result, totalChar: totalChar, totalUser: totalUser };
}

function countDistinctUser(dataList: DetailStatistic[]) {
  const uniqueUsernames = dataList
    .map((detailStat) => detailStat.userList)
    .filter((value, index, self) => self.indexOf(value) === index);

  return uniqueUsernames.length;
}

function convertToDetailStat(oneRow: RawDetailStat): DetailStatistic {
  const result: DetailStatistic = {
    id: oneRow.id,
    date: DateTime.fromISO(oneRow.date, { zone: 'utc' }),
    userList: oneRow.accountName,
    groupList: 'no-group',
    profileName: oneRow.profileName,
    operation: oneRow.operation,
    total: -1,
    success: oneRow.success ? 1 : 0,
    langPair: `${oneRow.sourceLanguage} > ${oneRow.targetLanguage}`,
    sourceLang: oneRow.sourceLanguage,
    targetLang: oneRow.targetLanguage,
    mimeType: oneRow.mimetype,
    request: -1,
    requestSuccess: -1,
    requestError: -1,
    requestSuccessPercent: -1,
    segment: oneRow.nbSegments,
    segmentInCache: -1,
    segmentInCacheHit: oneRow.nbCacheHits,
    character: oneRow.nbCharacters,
    characterInCache: -1,
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
  account: Account
): ToUserViewStatReturn {
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  let totalChar = 0;
  const result: UserViewStat[] = rawData.map((value) => {
    totalChar += value.total.nbCharacters;
    return {
      id: value.id,
      date: DateTime.fromISO(value.lastUsed, { zone: 'utc' }),
      userList: account.displayName,
      groupList: DATA_MISSING,
      profileName: value.name,
      operation: DATA_MISSING,
      total: value.total.nbCharacters,
      success: value.total.success,
      langPair: `${value.source.toUpperCase()} > ${value.target.toUpperCase()}`,
      sourceLang: value.source,
      targetLang: value.target,
      mimeType: value.total.mimeType.join(', '),
      request: value.total.request,
      requestSuccess: value.total.success,
      requestError: value.total.request - value.total.success,
      requestSuccessPercent: (value.total.success * 100) / value.total.request,
      segment: value.total.nbSegments,
      segmentInCache: -1,
      segmentInCacheHit: value.total.nbCacheHits,
      character: value.total.nbCharacters,
      characterInCache: value.total.nbCharactersCacheHits,
      tus: value.total.nbTus,
      tusFail: value.total.nbTusfail,
      elapsedTime: value.total.elapsedTime,
      userAgent: value.total.userAgent.join(', ')
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
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  let totalChar = 0;
  const result: GroupViewStat[] = rawData.map((value) => {
    totalChar += value.total.nbCharacters;
    return {
      id: value.id,
      date: DateTime.fromISO(value.lastUsed, { zone: 'utc' }),
      userList: DATA_MISSING,
      groupList: group.name,
      profileName: value.name,
      operation: DATA_MISSING,
      total: value.total.nbCharacters,
      success: value.total.success,
      langPair: `${value.source.toUpperCase()} > ${value.target.toUpperCase()}`,
      sourceLang: value.source,
      targetLang: value.target,
      mimeType: value.total.mimeType.join(', '),
      request: value.total.request,
      requestSuccess: value.total.success,
      requestError: value.total.request - value.total.success,
      requestSuccessPercent: (value.total.success * 100) / value.total.request,
      segment: value.total.nbSegments,
      segmentInCache: -1,
      segmentInCacheHit: value.total.nbCacheHits,
      character: value.total.nbCharacters,
      characterInCache: value.total.nbCharactersCacheHits,
      tus: value.total.nbTus,
      tusFail: value.total.nbTusFailed,
      elapsedTime: value.total.elapsedTime,
      userAgent: value.total.userAgent.join(', ')
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
};

export function toProfileViewStat(
  rawData: RawProfileViewStat[]
): ToProfileViewStatReturn {
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  let totalChar = 0;
  const result: ProfileViewStat[] = rawData.map((value) => {
    totalChar += value.totalNbCharacters;
    return {
      id: uniqueId('profil_'),
      date: DateTime.fromObject({ year: 1970, month: 1, day: 1 }),
      userList: DATA_MISSING,
      groupList: DATA_MISSING,
      profileName: value.profileName,
      operation: DATA_MISSING,
      total: value.total,
      success: value.totalSuccess,
      langPair: `${value.sourceLanguage.toUpperCase()} > ${value.targetLanguage.toUpperCase()}`,
      sourceLang: value.sourceLanguage,
      targetLang: value.targetLanguage,
      mimeType: DATA_MISSING,
      request: value.total,
      requestSuccess: value.totalSuccess,
      requestError: value.totalError,
      requestSuccessPercent: value.avgSuccess,
      segment: value.nbSegments,
      segmentInCache: -1,
      segmentInCacheHit: value.nbCacheHits,
      character: value.totalNbCharacters,
      characterInCache: -1,
      tus: value.totalNbTus,
      tusFail: value.totalNbTusFailed,
      elapsedTime: value.totalElapsedTime,
      userAgent: DATA_MISSING
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}

export function getColumnVisible(
  AcolumnList: Column[]
): GridColumnVisibilityModel {
  if (!AcolumnList) return {};

  const result: string[] = AcolumnList.filter((column) => column.hidden).map(
    (column) => column.field
  );

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

export function last12Month(): string[] {
  const array12 = Array(12).fill(1);
  let currentDate = DateTime.now(); // date actuelle

  const last12month = array12.map(() => {
    const period = currentDate.toFormat('yyyy-MM');
    currentDate = currentDate.minus({ months: 1 });
    return period;
  });
  return last12month;
}
export function getCurrentPeriod(): string {
  return DateTime.now().toFormat('yyyy-MM');
}

export type getGroupListReturn = {
  groupList: Group[];
  count: number;
};

export function getGroupList(rawData: any): getGroupListReturn {
  if (!rawData || !rawData.groups || rawData.groups.length <= 0)
    return { groupList: [], count: 0 };

  return {
    groupList: rawData.groups,
    count: rawData.total ? rawData.total : rawData.groups.length
  };
}
export function getgroupList(rawData: RawAccount): GetAccountListReturn {
  if (!rawData || !rawData.accounts || rawData.accounts.length <= 0)
    return { accountList: [], count: 0 };

  return {
    accountList: rawData.accounts,
    count: rawData.total ? rawData.total : rawData.accounts.length
  };
}

export type GetUserListReturn = {
  userList: string[];
  userCount: number;
};

export function getUserList(rawData: RawAccount): GetUserListReturn {
  if (!rawData || !rawData.accounts || rawData.accounts.length <= 0)
    return { userList: [], userCount: 0 };

  const accountList: Account[] = rawData.accounts;

  const result: string[] = accountList.map((value) => value.displayName);

  return {
    userList: result,
    userCount: rawData.total ? rawData.total : result.length
  };
}

export type GetAccountListReturn = {
  accountList: Account[];
  count: number;
};

export function getAccountList(rawData: RawAccount): GetAccountListReturn {
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

export type useColumnsProps = {
  baseColumList: Column[];
  modColumnList: Column[];
  t: TFunction;
};
export type useColumnsReturn = {
  columnVisibilityModel: GridColumnVisibilityModel;
  columnList: GridColDef<GridValidRowModel>[];
};

export function useColumns(
  baseColumnList: Column[],
  specificUserViewColumnList: Column[],
  t: TFunction
) {
  const userViewDataField: Column[] = mergeColumn(
    baseColumnList,
    specificUserViewColumnList
  );
  const columnVisibilityModel: GridColumnVisibilityModel = getColumnVisible(
    userViewDataField
  );
  const columnList = createColumns(userViewDataField, t);
  return { columnList, columnVisibilityModel };
}

export function createColumns(columnList: Column[], t: TFunction) {
  const columnListFilter = columnList.filter((column) => !column.remove);
  const columns: GridColDef<GridValidRowModel>[] = columnListFilter.map(
    (column) => {
      const result: GridColDef<GridValidRowModel> = {
        headerName: column.label ? t(column.label) : t(DEFAULT_HEADER),
        sortable: column.sortable,
        field: column.field,
        renderHeaderFilter: column.renderHeaderFilter,
        valueGetter: column.valueGetter || undefined,
        flex: column.flex
      };
      return result;
    }
  );
  return useMemo<GridColDef<GridValidRowModel>[]>(() => columns, [t]);
}
