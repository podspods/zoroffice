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
import MainBox from '@/components/MainBox';

import {
  defaultPeriod,
  toDetailStatList,
  useColumns
} from '../components/statisticsUtils';
import DetailToolbar from './components/DetailToolbar';
import {
  baseColumnList,
  specificFullViewColumnList
} from '../components/statisticsConstant';
import { RawDetailStat } from '../components/statisticsType';
import { Box } from '@mui/material';

export default function DetailTable() {
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
  const onMutate = () => void mutate();
  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificFullViewColumnList
  );
  const slotProps = useMemo(
    () => ({
      toolbar: {
        setDateValue: setDateValue,
        mutate: onMutate
      }
    }),
    [setDateValue, mutate]
  );
  const slots = {
    toolbar: DetailToolbar,
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
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Full view STATISTICS')}</PageTitle>
      <Table
        sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
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
      />
    </Box>
  );
}
