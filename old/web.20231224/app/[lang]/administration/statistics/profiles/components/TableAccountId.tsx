import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSWRConfig } from 'swr';
import countedRawData from '../../data/Counted-sample.json';
import uncountedRawData from '../../data/encounted-sample.json';
import PageTitle from '@/components/PageTitle';
import CustomToolbar from '../../components/Toolbar';
import { Box, SelectChangeEvent } from '@mui/material';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import {
  indicatorStatistic,
  usePeriode
} from '../../components/StatisticUtils';
export default function TableAccountId() {
  const { t } = useTranslation();
  const [periodGroups, setPeriodGroups] = useState<string>(usePeriode()[0]);
  const { accountId } = indicatorStatistic(countedRawData, uncountedRawData);

  function onChange(event: SelectChangeEvent<string>) {
    console.log('onChangeGroups(event: 61==>', event);
    setPeriodGroups(event.target.value);
  }
  console.log('accountId ==>', accountId);

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>
          {t('Statistics Source')}: {periodGroups}
        </PageTitle>

        <Table
          rows={accountId}
          columns={useColumns()}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{ toolbar: { onChange: onChange } }}
        />
      </Box>
    </>
  );
}

export function useColumns() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('isCounted'),
        field: 'isCounted',
        type: 'boolean'
      },
      {
        headerName: t('Name'),
        field: 'name'
      },
      {
        headerName: t('nbCharacters'),
        field: 'nbCharacters',
        width: 300
      },
      {
        headerName: t('request'),
        field: 'request',
        width: 150
      }
    ],
    []
  );
}
