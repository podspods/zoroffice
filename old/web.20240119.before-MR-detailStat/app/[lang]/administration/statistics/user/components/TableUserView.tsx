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
import { ALL, Apis, RawUserViewStat } from './statisticsType';
import { getUserList, userViewStat } from './statisticUtils';
import UserViewToolbar from './TableUserView.Toolbar';

export type TableDefaultProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  onChangePeriode: (typeStat: string) => void;
  period: string;
};

export default function TableUserView({ ...props }: TableDefaultProps) {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string>(ALL);

  const { data: rawDataUser } = useSWR(Apis.statistics.listUser, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.listUser}: ${swrErr.message}`}
      />
    )
  });

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
        date: `${props.period}`
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      totalRowCountField: 'total'
    }
  });

  const {
    rows: rawDataStatisticUserView,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const { rowList, totalChar } = userViewStat(rawDataStatisticUserView);

  const { userList, userCount } = getUserList(rawDataUser);

  const columns = useColumns();

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          rows={rowList}
          columns={columns}
          {...remainningRemoteHookData}
          slots={{ toolbar: UserViewToolbar }}
          slotProps={{
            toolbar: {
              onChangePeriod: props.onChangePeriode,
              onChangeTypeStat: props.onChangeTypeStat,
              typeStat: props.typeStat,
              onChangeUser: setUserId,

              periodList: getPeriodList(),
              period: props.period,
              userList: userList,
              user: userId,
              totalUsers: userCount,
              totalChar: totalChar
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
