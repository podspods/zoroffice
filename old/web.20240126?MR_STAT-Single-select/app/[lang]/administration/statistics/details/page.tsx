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
import PageTitle from '@/components/PageTitle';
import Apis from '@/utils/apis';
import {
  defaultPeriod,
  toDetailStatList,
  useColumns
} from '../components/statisticsUtils';
import DetailToolbar from './components/DetailToolbar';
import {
  EXPORT_TO_CSV,
  STAT_FULL,
  baseColumnList,
  specificFullViewColumnList
} from '../components/statisticsConstant';
import { RawDetailStat } from '../components/statisticsType';
import MainBox from '@/components/MainBox';

export default function StatisticDetail() {
  const { t } = useTranslation();
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );

  const useRefresh = useRefreshBuilder<RawDetailStat>({
    route: Apis.statistics.fullView,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'date',
        sortOrder: 'desc',
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
    mutate,
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

  // const { result: rowList } = toDetailStatList(rawDetailStatList);
  const onMutate = () => void mutate();

  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificFullViewColumnList,
    t
  );

  return (
    <MainBox>
      <PageTitle>{t(STAT_FULL)}</PageTitle>
      <Table
        sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
        {...remainningRemoteHookData}
        rows={rowList}
        maxHeight={'auto'}
        columns={columnList}
        pagination
        slots={{
          toolbar: DetailToolbar,
          headerFilterMenu: null
        }}
        slotProps={{
          toolbar: {
            setDateValue: setDateValue,
            mutate: onMutate
          }
        }}
        localeText={{
          toolbarExportCSV: t(EXPORT_TO_CSV)
        }}
        initialState={{
          columns: {
            columnVisibilityModel: columnVisibilityModel
          }
        }}
        unstable_headerFilters
        disableColumnFilter
      />
    </MainBox>
  );
}
