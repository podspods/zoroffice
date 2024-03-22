import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import { useMemo, useState } from 'react';
import UserToolbar from './TableDefault.Toolbar';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import { Apis, RawUserViewStat, UserViewStat } from './statisticsType';
import { userViewStat } from './statisticUtils';
import UserViewToolbar from './TableUserView.Toolbar';

export type TableDefaultProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
};

export default function TableUserView({ ...props }: TableDefaultProps) {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string>('');
  const [period, setPeriod] = useState<string>(currentPeriod());


  const {
    data: rawDataUser
    // isLoading: isloadingUser,
    // mutate: mutateUser
  } = useSWR(Apis.statistics.listUser, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.listUser}: ${swrErr.message}`}
      />
    )
  });

  /** _____________________hook __________________________ */
  // spns10-alpha.systran.net/activity/user/0/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.userView(userId),
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'request',
        sortOrder: 'desc',
        date: `${period}`
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      // rowsField: 'data',
      // rowsField: 'global',
      totalRowCountField: 'total'
    }
  });

  const {
    // mutate,
    // loading,
    // refreshRate,
    rows: rawDataStatisticDefault,
    // rowCount,
    // rowCount:(owCount) => rowCount*13,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const rowList = userViewStat(rawDataStatisticDefault);
  /** _____________________hook __________________________ */


  const onChangeUser = (idUser: string) => {
    setUserId(idUser);
  };

  const onChangeTypeStat = (typeStat: string) => {
    props.onChangeTypeStat(typeStat);
  };

  const handlePeriodChange = (period: string) => {
    setPeriod(period);
  };

  const columns = useColumns();

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          rows={rowList}
          // rows={[]}
          columns={columns}
          slots={{ toolbar: UserViewToolbar }}
          slotProps={{
            toolbar: {
              onChangePeriod: handlePeriodChange,
              onChangeTypeStat: onChangeTypeStat,
              onChangeUser: onChangeUser,

              valueList: rawDataUser ? rawDataUser.accounts : [],
              periodList: getPeriodList()
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
        headerName: t('profile'),
        field: 'profileName'
      },
      {
        headerName: t('Language pair'),
        field: 'languagePair'
      },
      {
        headerName: t('mime-type'),
        field: 'mimeType'
      },
      {
        headerName: t('Requests'),
        field: 'request'
      },
      {
        headerName: t('Success'),
        field: 'success'
      },
      {
        headerName: t('Segments'),
        field: 'segment'
      },
      {
        headerName: t('Segments in cache'),
        field: 'segmentInCache'
      },
      {
        headerName: t('Characters'),
        field: 'character'
      },
      {
        headerName: t('Characters in cache'),
        field: 'characterInCache'
      },
      {
        headerName: t('Elapsed Time (ms)'),
        field: 'elapsedTime '
      },
      {
        headerName: t('User agent'),
        field: 'userAgent'
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
