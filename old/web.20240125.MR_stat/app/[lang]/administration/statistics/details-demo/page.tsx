'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { Box } from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import { useTranslation } from 'react-i18next';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import PageTitle from '@/components/PageTitle';
import Apis from '@/utils/apis';
import {
  defaultPeriod,
  toDetailStatList
} from '../components/statisticsUtils';
import { RawDetailStat } from './components/statType';
import DetailToolbar from './components/DetailToolbar';
import useColumns from './components/useColumn';
export default function StatisticDetail() {
  const { t } = useTranslation();
  const columns = useColumns();
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
  const { result: rowList } = toDetailStatList(rawDetailStatList);
  const onMutate = () => void mutate();
  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Full view STATISTICS')}</PageTitle>
      <Table
        sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
        {...remainningRemoteHookData}
        rows={rowList}
        maxHeight={'auto'}
        columns={columns}
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
          toolbarExportCSV: t('Export data to csv')
        }}
        unstable_headerFilters
        disableColumnFilter
      />
    </Box>
  );
}
