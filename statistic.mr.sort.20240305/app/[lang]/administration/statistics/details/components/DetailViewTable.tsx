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
  toDetailStatList,
  useColumns
} from '../../components/statisticsUtils';
import {
  DOWLOAD_CSV,
  detailViewColumnList,
  fullViewTypeStat
} from '../../components/statisticsConstant';
import { RawDetailStat, TypeStat } from '../../components/statisticsType';
import DetailStatisticToolbar from './DetailViewToolbar';

export type DetailViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function DetailViewTable({ ...props }: DetailViewTableProps) {
  const { t } = useTranslation();
  const [typeStat, setTypeStat] = useState<TypeStat>(fullViewTypeStat[0]);
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };

  const useRefresh = useRefreshBuilder<RawDetailStat>({
    route: Apis.statistics.fullView,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        startDate: dateValue[0]
          ? dateValue[0].valueOf()
          : DateTime.now().valueOf(),
        endDate: dateValue[1]
          ? dateValue[1].valueOf()
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
  const { result: rowList, totalChar } = useMemo(
    () => toDetailStatList(rawDetailStatList),
    [rawDetailStatList]
  );

  const { columnList, columnVisibilityModel } = useColumns(
    detailViewColumnList
  );
  const slotProps = useMemo(
    () => ({
      toolbar: {
        setDateValue: setDateValue,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat,
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
    toolbarExportCSV: t(DOWLOAD_CSV)
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
