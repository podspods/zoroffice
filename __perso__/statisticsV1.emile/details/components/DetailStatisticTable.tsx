'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Table, {

  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import Apis from '@/utils/apis';
import {
  defaultPeriod,
  detailViewFilter,
  toDetailStatList,
  useColumns
} from '../../components/statisticsUtils';
import {
  StatType,
  baseColumnList,
  specificFullViewColumnList,
  statCategoryFull
} from '../../components/statisticsConstant';
import { RawDetailStat, TypeStat } from '../../components/statisticsType';
import DetailStatisticToolbar from './DetailStatisticToolbar';

export default function DetailStatisticTable() {
  const { t } = useTranslation();
  const [typeStat, setTypeStat] = useState<TypeStat>(statCategoryFull[0]);
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };

  const apiRoute =
    typeStat.id === StatType.STAT_BY_SESSION
      ? Apis.statistics.bySession
      : Apis.statistics.fullView;
  const groupBy = typeStat.id === StatType.STAT_BY_SESSION ? 'sessions' : 'id';

  const useRefresh = useRefreshBuilder<RawDetailStat>({
    route: apiRoute,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        groupBy: groupBy,
        startDate: dateValue[0]
          ? dateValue[0].valueOf()
          : DateTime.now().valueOf(),
        endDate: dateValue[1]
          ? dateValue[1].valueOf()
          : DateTime.now().valueOf()
      },
      filterParamsFieldFct: (field: string) => detailViewFilter(field)
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'data',
      totalRowCountField: 'total'
    }
  });
  const {
    rows: rawDetailStatList,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawDetailStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const { result: rowList, totalChar } = useMemo(
    () => toDetailStatList(rawDetailStatList),
    [rawDetailStatList]
  );
  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificFullViewColumnList
  );
  const slotProps = useMemo(
    () => ({
      toolbar: {
        setDateValue: setDateValue,
        onChangeTypeStat: onChangeTypeStat,
        typeStat: typeStat,
        totalChar: totalChar
      }
    }),
    [setDateValue, onChangeTypeStat, typeStat, totalChar]
  );

  const slots = {
    toolbar: DetailStatisticToolbar,
    headerFilterMenu: null
  };
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };
  const localText = {
    toolbarExportCSV: t('Export data to csv')
  };

  return (
    <Table
      {...remainningRemoteHookData}
      rows={rowList}
      columns={columnList}
      pagination
      slots={slots}
      slotProps={slotProps}
      localeText={localText}
      initialState={initialState}
      unstable_headerFilters
      disableColumnFilter
      maxHeight={'70vh'}
    />
  );
}
