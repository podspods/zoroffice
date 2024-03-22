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
  RawSessionStat,
  RawUserViewStat,
  SessionStatistic,
  UserViewStat
} from './statisticsType';

export type toDetailStatListReturn = {
  result: DetailStatistic[];
  totalChar: number;
};

export function toDetailStatList(
  rawDetailStatList: RawDetailStat[]
): toDetailStatListReturn {
  if (!rawDetailStatList?.length) return { result: [], totalChar: 0 };

  const result: DetailStatistic[] = rawDetailStatList
    .filter((oneRow) => oneRow.sourceLanguage !== 'AUTO')
    .map((oneRow) => {
      const myDate = DateTime.fromISO(oneRow.date, { zone: 'utc' });
      return {
        id: oneRow.id,
        userId: oneRow.accountId,
        date: myDate,
        moment: myDate.toRelative({ locale: 'en' }) || '',
        accountName: oneRow.accountName,
        sourceLanguage: oneRow.sourceLanguage.toUpperCase(),
        targetLanguage: oneRow.targetLanguage.toUpperCase(),
        langPair: `${oneRow.sourceLanguage.toUpperCase()} > ${oneRow.targetLanguage.toUpperCase()}`,
        profileName: oneRow.profileName,
        operation: oneRow.operation,
        userAgent: oneRow.userAgent,
        mimetype: oneRow.mimetype,
        request: 1,
        requestSuccess: oneRow.success ? 1 : 0,
        requestError: oneRow.success ? 0 : 1,
        requestSuccessPercent: oneRow.success ? 100 : 0,
        nbSegments: oneRow.nbSegments,
        nbCacheHits: oneRow.nbCacheHits,
        nbTus: oneRow.nbTus,
        nbTusFailed: oneRow.nbTusFailed,
        elapsedTime: oneRow.elapsedTime,
        nbCharacters: oneRow.nbCharacters
      };
    });
  // toDetailStat(oneRow));
  return {
    result: result,
    totalChar: rawDetailStatList
      .filter(
        (oneRow) =>
          oneRow.sourceLanguage !== 'AUTO' && oneRow.nbCharacters !== undefined
      )
      .reduce((acc, oneRow) => acc + oneRow.nbCharacters, 0)
  };
}

export type toSessionStatListReturn = {
  result: SessionStatistic[];
  totalChar: number;
};

export function toSessionStatList(
  rawSessionStatList: RawSessionStat[]
): toSessionStatListReturn {
  if (!rawSessionStatList?.length) return { result: [], totalChar: 0 };

  const result: SessionStatistic[] = rawSessionStatList
    .filter((oneRow) => oneRow.sourceLanguage !== 'AUTO')
    .map((oneRow) => {
      const myDate = DateTime.fromISO(oneRow.date, { zone: 'utc' });
      return {
        id: `${oneRow.accountId}_${oneRow.profileId}`,
        accountId: oneRow.accountId,
        date: myDate,
        moment: myDate.toRelative({ locale: 'en' }) || '',
        accountName: oneRow.accountName,
        sourceLanguage: oneRow.sourceLanguage.toUpperCase(),
        targetLanguage: oneRow.targetLanguage.toUpperCase(),
        langPair: `${oneRow.sourceLanguage.toUpperCase()} > ${oneRow.targetLanguage.toUpperCase()}`,
        profileName: oneRow.profileName,
        operation: oneRow.operation,
        userAgent: oneRow.userAgent,
        mimetype: oneRow.mimetype,
        total: oneRow.total,
        totalSuccess: oneRow.totalSuccess,
        avgError: oneRow.avgError,
        nbSegments: oneRow.nbSegments,
        nbCacheHits: oneRow.nbCacheHits,
        totalNbTus: oneRow.totalNbTus,
        totalNbTusFailed: oneRow.totalNbTusFailed,
        totalElapsedTime: oneRow.totalElapsedTime,
        avgElapsedTime: oneRow.avgElapsedTime,
        totalNbCharacters: oneRow.totalNbCharacters
      };
    });
  return {
    result: result,
    totalChar: rawSessionStatList
      .filter(
        (oneRow) =>
          oneRow.sourceLanguage !== 'AUTO' &&
          oneRow.totalNbCharacters !== undefined
      )
      .reduce((acc, oneRow) => acc + oneRow.totalNbCharacters, 0)
  };
}

export type ToUserViewStatReturn = {
  rowList: UserViewStat[];
  totalChar: number;
};

/** refait  */
export function toUserViewStat(
  rawData: RawUserViewStat[]
): ToUserViewStatReturn {
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  const result: UserViewStat[] = rawData.map((oneRow) => {
    return {
      id: oneRow.id,
      name: oneRow.name,
      success: oneRow.total.success,
      source: oneRow.source.toUpperCase(),
      target: oneRow.target.toUpperCase(),
      langPair: `${oneRow.source.toUpperCase()} > ${oneRow.target.toUpperCase()}`,
      mimeType: oneRow.total.mimeType.join(', '),
      request: oneRow.total.request,
      requestError: oneRow.total.request - oneRow.total.success,
      requestSuccessPercent:
        (oneRow.total.success * 100) / oneRow.total.request,
      nbSegments: oneRow.total.nbSegments,
      nbCacheHits: oneRow.total.nbCacheHits,
      nbCharacters: oneRow.total.nbCharacters,
      nbCharactersCacheHits: oneRow.total.nbCharactersCacheHits,
      nbTus: oneRow.total.nbTus,
      nbTusFailed: oneRow.total.nbTusFailed,
      elapsedTime: oneRow.total.elapsedTime,
      userAgent: oneRow.total.userAgent.join(', ')
    };
  });

  return {
    rowList: result,
    totalChar: rawData.reduce(
      (acc, userViewStat) => acc + userViewStat.total.nbCharacters,
      0
    )
  };
}

export type ToGroupViewStatReturn = {
  rowList: GroupViewStat[];
  totalChar: number;
};

export function toGroupViewStat(
  rawData: RawGroupViewStat[]
): ToGroupViewStatReturn {
  if (!rawData?.length) return { rowList: [], totalChar: 0 };
  const result: GroupViewStat[] = rawData.map((oneRow) => {
    return {
      id: oneRow.id,
      name: oneRow.name,
      success: oneRow.total.success,
      source: oneRow.source.toUpperCase(),
      target: oneRow.target.toUpperCase(),
      langPair: `${oneRow.source.toUpperCase()} > ${oneRow.target.toUpperCase()}`,
      mimeType: oneRow.total.mimeType.join(', '),
      request: oneRow.total.request,
      requestError: oneRow.total.request - oneRow.total.success,
      requestSuccessPercent:
        (oneRow.total.success * 100) / oneRow.total.request,
      nbSegments: oneRow.total.nbSegments,
      nbCacheHits: oneRow.total.nbCacheHits,
      nbCharacters: oneRow.total.nbCharacters,
      nbCharactersCacheHits: oneRow.total.nbCharactersCacheHits,
      nbTus: oneRow.total.nbTus,
      nbTusFailed: oneRow.total.nbTusFailed,
      elapsedTime: oneRow.total.elapsedTime,
      userAgent: oneRow.total.userAgent.join(', ')
    };
  });

  return {
    rowList: result,
    totalChar: rawData.reduce(
      (acc, oneRow) => acc + oneRow.total.nbCharacters,
      0
    )
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

  const result: ProfileViewStat[] = rawData.map((oneRow) => {
    return {
      id: `no_id_profil_${oneRow.profileName}`,
      totalAccounts: oneRow.totalAccounts,
      profileName: oneRow.profileName,
      total: oneRow.total,
      totalSuccess: oneRow.totalSuccess,
      sourceLanguage: oneRow.sourceLanguage.toUpperCase(),
      targetLanguage: oneRow.targetLanguage.toUpperCase(),
      langPair: `${oneRow.sourceLanguage.toUpperCase()} > ${oneRow.targetLanguage.toUpperCase()}`,
      avgSuccess: oneRow.avgSuccess,
      totalError: oneRow.totalError,
      nbSegments: oneRow.nbSegments,
      nbCacheHits: oneRow.nbCacheHits,
      totalNbCharacters: oneRow.totalNbCharacters,
      totalNbTus: oneRow.totalNbTus,
      totalNbTusFailed: oneRow.totalNbTusFailed,
      totalElapsedTime: oneRow.totalElapsedTime
    };
  });
  return {
    rowList: result,
    totalChar: rawData.reduce(
      (acc, userViewStat) => acc + userViewStat.totalNbCharacters,
      0
    ),
    totalUser: rawData.reduce(
      (acc, userViewStat) => acc + userViewStat.totalAccounts,
      0
    )
  };
}

export function getColumnVisible(
  columnList: Column[]
): GridColumnVisibilityModel {
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

export function useColumns(columnListInput: Column[]): UseColumnsReturn {
  const columnVisibilityModel: GridColumnVisibilityModel = getColumnVisible(
    columnListInput
  );
  const columnList = createColumns(columnListInput);

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
        renderCell: column.renderCell,
        hideable: column.hideable
      };
      return result;
    }
  );
  return useMemo<GridColDef<GridValidRowModel>[]>(() => columns, [t]);
}
