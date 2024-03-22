import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Table, {
  GridCallbackDetails,
  GridColDef,
  GridSortModel,
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import {
  Period,
  RawUserViewStat
} from '../../../administration/statistics/components/statisticsType';
import {
  getCurrentPeriod,
  last12Month,
  personalViewFilter,
  toUserViewStat,
  useColumns
} from '../../../administration/statistics/components/statisticsUtils';
import {
  baseColumnList,
  specificUserViewColumnList
} from '../../../administration/statistics/components/statisticsConstant';
import PersonalStatisticToolbar from './PersonalStatisticToolbar';

export default function PersonalStatisticTable() {
  const [period, setPeriod] = useState<Period>(getCurrentPeriod());
  const onChangePeriode = (period: Period) => {
    setPeriod(period);
  };

  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.personal,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        date: `${period.monthNumber}`
      },
      filterParamsFieldFct: (field: string) => personalViewFilter(field)
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      totalRowCountField: 'total'
    }
  });
  const {
    rows: rawDataPersonalStat,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'

  });

  const { rowList, totalChar } = useMemo(
    () => toUserViewStat(rawDataPersonalStat),
    [rawDataPersonalStat]
  );

  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificUserViewColumnList
  );


  const slotProps = useMemo(
    () => ({
      toolbar: {
        onChangePeriod: onChangePeriode,
        periodList: last12Month(),
        period: period,
        totalChar: totalChar
      }
    }),
    [onChangePeriode, last12Month(), period, totalChar]
  );
  const slots = {
    toolbar: PersonalStatisticToolbar,
    headerFilterMenu: null
  };
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };


  return (
    <Table
      maxHeight={'70vh'}
      rows={rowList}
      columns={columnList}
      {...remainningRemoteHookData}
      slots={slots}
      slotProps={slotProps}
      initialState={initialState}
      unstable_headerFilters
      disableColumnFilter
    />
  );
}
