'use client';

import useSWR from 'swr';
import { Box, SelectChangeEvent } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useColumns from './components/useColumns';
import { Apis, Statistic } from './components/statisticsType';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import { useTranslation } from 'react-i18next';
import StatisticToolbar from './components/StatisticToolbar';
import { useRef, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@systran/react-components/lib/atoms/TextField';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {
  convertData,
  defaultPeriod,
  formatDate,
  // toRowList,
  toStatProfile
} from './components/statisticUtils';
// import datajson from '../data/userDetail.json';
import datajson from '../data/activity_chineese-spns8.json';

// const show = false;
const show = true;

export default function AdministrationStatisticsUser() {
  const columns = useColumns();
  const { t } = useTranslation();
  const [totalChar, setTotalChar] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [dateValue, setDateValue] = useState<DateRange<Dayjs>>(defaultPeriod());

  const useRefresh = useRefreshBuilder<Statistic>({
    route: Apis.statistics.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'sourceLanguage',
        sortOrder: 'desc',
        startDate: dateValue[0] ? dateValue[0].valueOf() : new Date().getTime(),
        endDate: dateValue[1] ? dateValue[1].valueOf() : new Date().getTime(),
        groupBy: 'profiles'
      }
      // dayjs(date).valueOf()
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'data',
      totalRowCountField: 'total'
    }
  });

  const {
    mutate,
    loading,
    refreshRate,
    setRefreshRate: setRefreshInterval,
    rows: rawData,
    rowCount,
    // rowCount:(owCount) => rowCount*13,
    ...remainningRemoteHookData
  } = useRemoteHooks<Statistic>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const rowList = toStatProfile(rawData);

  const updateTotalChar = () => {
    // console.log(' updateTotalChar==>', totalChar);

    setTotalChar(totalChar + 1);
  };
  const updateTotalUser = () => {
    // console.log(' updateTotalUser==>', totalUsers);
    setTotalUsers(totalUsers + 11);
  };

  const handleMutate = () => {
    void mutate();
  };
  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Statistics')}</PageTitle>
      <Table
        pagination
        sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
        rows={rowList}
        maxHeight={'auto'} // allow to have vertical scroll on overflow
        columns={columns}
        // checkboxSelection
        slots={{ toolbar: StatisticToolbar }}
        slotProps={{
          toolbar: {
            totalChar: rowCount,
            totalUsers: totalUsers,
            setDateValue: setDateValue
          }
        }}
      />
      {show && (
        <div>
          <button onClick={updateTotalChar}>updateChar</button>
          <button onClick={updateTotalUser}>updateUser</button>
          <button onClick={handleMutate}>mutateData</button>
          {/* <button onClick={void mutateUser()}>mutateUser</button> */}
          <button onClick={() => convertData(datajson)}>convertData</button>
          <TextField
            id='outlined-read-only-input'
            label={t('dateValue')}
            value={formatDate(dateValue)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id='outlined-read-only-input'
            value={dateValue[0]}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id='outlined-read-only-input'
            value={dateValue[1]}
            InputProps={{
              readOnly: true
            }}
          />

        </div>
      )}
    </Box>
  );
}
// https://localhost:3450/administration/statistics/fullview

/**
 * old : https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
 * new : https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
 *
 */
