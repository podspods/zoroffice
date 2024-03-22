'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import Apis from '@/utils/apis';
import { toDetailStatList, useColumns } from '../../components/statisticsUtils';
import {
  STAT_BY_SESSION,
  baseColumnList,
  specificFullViewColumnList
} from '../../components/statisticsConstant';
import { RawDetailStat, TypeStat } from '../../components/statisticsType';
import DetailStatisticToolbar from './DetailStatisticToolbar';

export type DetailStatisticTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function DetailStatisticTable({
  ...props
}: DetailStatisticTableProps) {
  const { t } = useTranslation();  const [typeStat, setTypeStat] = useState<TypeStat>(statCategoryFull[0]);
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };





  const apiRoute =
    props.typeStat.id === STAT_BY_SESSION
      ? Apis.statistics.bySession
      : Apis.statistics.fullView;
  const groupBy = props.typeStat.id === STAT_BY_SESSION ? 'sessions' : 'id';

  const useRefresh = useRefreshBuilder<RawDetailStat>({
    route: apiRoute,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'date',
        sortOrder: 'desc',
        groupBy: groupBy,
        startDate: props.dateValue[0]
          ? props.dateValue[0].valueOf()
          : DateTime.now().valueOf(),
        endDate: props.dateValue[1]
          ? props.dateValue[1].valueOf()
          : DateTime.now().valueOf()
      },
      filterParamsFieldFct: (field: string) => `eleFilters[${field}]`
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
  const { result: rowList } = useMemo(
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
        setDateValue: props.setDateValue,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat
      }
    }),
    [props.setDateValue, props.onChangeTypeStat, props.typeStat]
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
