import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import PageTitle from '@/components/PageTitle';
import MainBox from '@/components/MainBox';
import Apis from '@/utils/apis';
import {
  Group,
  RawGroupViewStat,
  groupInit
} from '../../components/statisticsType';

import {
  getGroupList,
  last12Month,
  toGroupViewStat,
  useColumns
} from '../../components/statisticsUtils';
import {
  baseColumnList,
  specificGroupViewColumnList
} from '../../components/statisticsConstant';
import GroupViewToolbar from './TableGroupView.Toolbar';

export type TableGroupViewProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  onChangePeriode: (typeStat: string) => void;
  period: string;
};

export default function TableGroupView({ ...props }: TableGroupViewProps) {
  const { t } = useTranslation();
  const [currentGroup, setCurrentGroup] = useState<Group>(groupInit);

  const { data: rawDataGroup } = useSWR(Apis.statistics.groupList, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.groupList}: ${swrErr.message}`}
      />
    )
  });
  const { groupList, count: groupCount } = useMemo(
    () => getGroupList(rawDataGroup),
    [rawDataGroup]
  );

  useMemo(() => {
    if (currentGroup.id !== '' || !groupList || groupList.length <= 0) return;
    setCurrentGroup(groupList[0]);
  }, [rawDataGroup]);

  const useRefresh = useRefreshBuilder<RawGroupViewStat>({
    route: Apis.statistics.byGroup(currentGroup.id),
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
    rows: rawDataStatisticGroupView,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawGroupViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const { rowList, totalChar } = useMemo(
    () => toGroupViewStat(rawDataStatisticGroupView, currentGroup),
    [rawDataStatisticGroupView, currentGroup]
  );

  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificGroupViewColumnList
    ,
    t
  );

  return (
    <>
      <MainBox>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
          rows={rowList}
          columns={columnList}
          {...remainningRemoteHookData}
          slots={{ toolbar: GroupViewToolbar }}
          slotProps={{
            toolbar: {
              onChangePeriod: props.onChangePeriode,
              onChangeTypeStat: props.onChangeTypeStat,
              typeStat: props.typeStat,
              onChangeGroup: setCurrentGroup,
              period: props.period,
              groupList: groupList,
              periodList: last12Month(),
              totalGroup: groupCount,
              totalChar: totalChar,
              group: currentGroup
            }
          }}
          initialState={{
            columns: {
              columnVisibilityModel: columnVisibilityModel
            }
          }}
          unstable_headerFilters
          disableColumnFilter
        />
      </MainBox>
    </>
  );
}
