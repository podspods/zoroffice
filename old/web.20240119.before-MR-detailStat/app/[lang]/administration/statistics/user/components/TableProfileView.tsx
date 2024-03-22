import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import { RawUserViewStat } from './statisticsType';
import { profileViewStat } from './statisticUtils';
import ProfileViewToolbar from './TableProfileView.Toolbar';
import Apis from '@/utils/apis';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
export type TableDefaultProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function TableProfileView({ ...props }: TableDefaultProps) {
  const { t } = useTranslation();

  // const { data: rawDataProfile } = useSWR(Apis.statistics.listProfile, {
  //   // const { data: rawDataGroup } = useSWR(routeForGroup, {
  //   shouldRetryOnError: false,
  //   onError: (swrErr: Error) => (
  //     <ErrorCard
  //       errorMessage={`Error useSWR on ${Apis.statistics.listProfile}: ${swrErr.message}`}
  //       // errorMessage={`Error useSWR on ${routeForGroup}: ${swrErr.message}`}
  //     />
  //   )
  // });

  /** _____________________hook __________________________ */
  //       activity?startDate=1701688140000&endDate=1705576180497&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
  // /node/activity/?limit=10&skip=0&sortName=date&sortOrder=desc&groupBy=profile&startDate=1704063600000&endDate=1708297200000
  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.byProfile,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'date',
        sortOrder: 'desc',
        groupBy: 'profile',
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
      // rowsField: 'all',
      totalRowCountField: 'total'
    }
  });

  const {
    rows: rawDataStatisticProfileView,
    rowCount,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const { rowList, totalChar } = profileViewStat(rawDataStatisticProfileView);
  // const { profileList, profileCount } = getProfileList(rawDataProfile);
  /** _____________________hook __________________________ */

  const columns = useColumns();
  console.log('remainningRemoteHookData ==>', remainningRemoteHookData);

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          rows={rowList}
          columns={columns}
          {...remainningRemoteHookData}
          slots={{ toolbar: ProfileViewToolbar }}
          slotProps={{
            toolbar: {
              totalChar: totalChar,
              totalProfile: rowCount,
              setDateValue: props.setDateValue,

              onChangeTypeStat: props.onChangeTypeStat,
              typeStat: props.typeStat
            }
          }}
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
        headerName: t('Profile Name'),
        field: 'profileName'
      },
      {
        headerName: t('Users'),
        field: 'userList'
      },
      {
        headerName: t('Groups'),
        field: 'groupList'
      },
      {
        headerName: t('Language pair'),
        field: 'languagePair'
      },
      {
        headerName: t('User agent'),
        field: 'userAgent'
      },
      {
        headerName: t('mime-type'),
        field: 'mimeType'
      },
      {
        headerName: t('Characters'),
        field: 'character'
      }
    ],
    []
  );
}

export type User = {
  id: string;
  displayName: string;
  groupIds?: string[];
  current?: boolean;
};

export function currentPeriod(): string {
  return dayjs().format('YYYY-MM');
}

export function getPeriodList(): string[] {
  const array12 = Array(12).fill(1);
  let currentDate = dayjs(); // date actuelle
  const last12month = array12.map(() => {
    const period = currentDate.format('YYYY-MM');
    currentDate = currentDate.subtract(1, 'month');
    return period;
  });
  return last12month;
}
