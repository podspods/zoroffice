/* eslint-disable no-console */

'use client';


import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import useSWR from 'swr';
import { SelectChangeEvent } from '@mui/material/Select';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import PageTitle from '@/components/PageTitle';
import Apis from 'utils/apis';

import countedRawData from '../data/Counted-sample.json';
import uncountedRawData from '../data/encounted-sample.json';
import useColumnsGlobal from './components/useColumns';
import { formatData, usePeriode } from '../components/StatisticUtils';
import CustomToolbar from './components/Toolbar';

export default function AdministrationStatisticsGlobal() {
  const { t } = useTranslation();
  const [periodGlobal, setPeriodGlobal] = useState<string>(usePeriode()[0]);
  const { data: rawData, isLoading } = useSWR(
    Apis.statistics.uncountedList('12345') + '?period=' + periodGlobal,
    {
      shouldRetryOnError: false,
      onError: (swrErr: Error) => (
        <ErrorCard
          errorMessage={`Error useSWR on ${Apis.service.list}: ${swrErr.message}`}
        />
      )
    }
  );

  function onChangeGlobal(event: SelectChangeEvent<string>) {
    console.log('onChangeGlobal(event: 61==>', event);
    setPeriodGlobal(event.target.value);
  }

  const { statisticsGroupRowList, statisticsGlobalRowList } = formatData(
    countedRawData,
    uncountedRawData
  );

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>
          {t('Statistics Global')}: {periodGlobal}
        </PageTitle>
        <Table
          rows={statisticsGlobalRowList}
          columns={useColumnsGlobal()}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{ toolbar: { onChange: onChangeGlobal } }}
        />
      </Box>
    </>
  );
}
