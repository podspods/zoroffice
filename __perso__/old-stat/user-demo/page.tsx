'use client';

import useSWR from 'swr';
import { Box, SelectChangeEvent } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import useColumns from './components/useColumns';
import { Apis, Statistic } from './components/statisticsType';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import { useTranslation } from 'react-i18next';
import StatisticToolbar from './components/StatisticToolbar';
import { useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {
  convertData,
  defaultPeriod,
  formatDate
} from './components/statisticUtils';
// import datajson from '../data/userDetail.json';
import datajson from '../data/data-demo.json';
import { useGridApiRef } from '@mui/x-data-grid';

const show = false;
// const show = true;s

export default function AdministrationStatisticsUser() {
  const { result: rowList, totalChar: totalChar2 } = convertData(datajson);
  const columns = useColumns();
  const { t } = useTranslation();
  const [totalChar, setTotalChar] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(42);
  const [dateValue, setDateValue] = useState<DateRange<Dayjs>>(defaultPeriod());

  const {
    data: rawDataUser,
    isLoading: isloadingUser,
    mutate: mutateUser
  } = useSWR(Apis.statistics.listLight, {
    // refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.listLight}: ${swrErr.message}`}
      />
    )
  });

  // const rawData: {
  //   data: Statistic[];
  // } = { data: [] };

  // const isLoading = true;
  // const mutate = () => null;

  const { data: rawData, isLoading, mutate } = useSWR(
    // Apis.statistics.listAdmin,
    Apis.statistics.listGlobal,

    {
      // refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
      shouldRetryOnError: false,
      onError: (swrErr: Error) => (
        <ErrorCard
          errorMessage={`Error useSWR on ${Apis.statistics.listAdmin}: ${swrErr.message}`}
        />
      )
    }
  );

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
  const apiRef = useGridApiRef();

  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Statistics')}</PageTitle>
      <Table
        rows={[...rowList, ...rowList, ...rowList, ...rowList, ...rowList]}
        columns={columns}
        // checkboxSelection
        slots={{ toolbar: StatisticToolbar }}
        slotProps={{
          toolbar: {
            // totalChar: totalChar,
            totalChar: totalChar2,
            totalUsers: totalUsers,
            setDateValue: setDateValue
          }
        }}
        // getDetailPanelHeight={() => 'auto'}
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

          <ul>
            {rawDataUser &&
              rawDataUser.accounts.map((value: any) => (
                <li key={value.id}>{value.displayName}</li>
              ))}
          </ul>

          <ul>
            {rawData &&
              rawData.data.map((value: any) => (
                <li key={value.id}>{value.name}</li>
              ))}
          </ul>
          <ul>
            {rowList &&
              rowList.map((value: Statistic) => (
                <li key={value.id}>
                  {value.profileName}
                  {value.languagePair}
                </li>
              ))}
          </ul>
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
