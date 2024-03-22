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
import { Apis, RawUserViewStat } from './statisticsType';
import { getGroupList, groupViewStat } from './statisticUtils';
import GroupViewToolbar from './TableGroupView.Toolbar';

export type TableDefaultProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  onChangePeriode: (typeStat: string) => void;
  period: string;
};

export default function TableGroupView({ ...props }: TableDefaultProps) {
  const { t } = useTranslation();
  const [groupId, setGroupId] = useState<string>('');

  // https://spns10-alpha.systran.net/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true
  // const routeForGroup = `${Apis.statistics.listGroup}?limit=50&eleFilters[name]=&withRoles=true`;

  const { data: rawDataGroup } = useSWR(Apis.statistics.listGroup, {
    // const { data: rawDataGroup } = useSWR(routeForGroup, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.listGroup}: ${swrErr.message}`}
        // errorMessage={`Error useSWR on ${routeForGroup}: ${swrErr.message}`}
      />
    )
  });

  /** _____________________hook __________________________ */
  // spns10-alpha.systran.net/activity/user/0/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.groupView(groupId),
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
      // rowsField: 'all',
      totalRowCountField: 'total'
    }
  });

  const {
    rows: rawDataStatisticGroupView,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });


  const { rowList, totalChar } = groupViewStat(
    rawDataStatisticGroupView,
    groupId
  );
  const { groupList, groupCount } = getGroupList(rawDataGroup);
  /** _____________________hook __________________________ */

  const columns = useColumns();

  return (
    <>
      <Box sx={{ width: '100%', margin: '2rem' }}>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          rows={rowList}
          columns={columns}
          {...remainningRemoteHookData}
          slots={{ toolbar: GroupViewToolbar }}
          slotProps={{
            toolbar: {
              onChangePeriod: props.onChangePeriode,
              onChangeTypeStat: props.onChangeTypeStat,
              typeStat: props.typeStat,
              onChangeGroup: setGroupId,
              period: props.period,
              groupList: groupList,
              periodList: getPeriodList(),
              totalGroup: groupCount,
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
        headerName: t('Group'),
        field: 'groupName'
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
