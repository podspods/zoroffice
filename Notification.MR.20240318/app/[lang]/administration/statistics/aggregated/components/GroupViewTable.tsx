import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import {
  Group,
  Period,
  RawGroupViewStat,
  TypeStat
} from '../../components/statisticsType';
import {
  initGroupList,
  last12Month,
  toGroupViewStat,
  useColumns
} from '../../components/statisticsUtils';
import {
  DOWLOAD_CSV,
  groupViewcolumnList
} from '../../components/statisticsConstant';
import GroupViewToolbar from './GroupViewToolbar';
import { useTranslation } from 'react-i18next';

export type GroupViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function GroupViewTable({ ...props }: GroupViewTableProps) {
  const { t } = useTranslation();
  const [currentGroup, setCurrentGroup] = useState<Group>({
    id: '',
    name: '',
    roles: [],
    accounts: []
  });
  const { data: rawDataGroup } = useSWR(Apis.statistics.groupList, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.groupList}: ${swrErr.message}`}
      />
    )
  });

  const { groupList, count: groupCount } = useMemo(
    () => initGroupList(rawDataGroup, currentGroup, setCurrentGroup),
    [rawDataGroup]
  );
  const useRefresh = useRefreshBuilder<RawGroupViewStat>({
    route: Apis.statistics.byGroup(currentGroup?.id ? currentGroup.id : ''),
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        date: `${props.period.monthNumber}`
      },
      filterParamsFieldFct: (field: string) => `eleFilters[${field}]`
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
    () => toGroupViewStat(rawDataStatisticGroupView),
    [rawDataStatisticGroupView, currentGroup]
  );
  const { columnList, columnVisibilityModel } = useColumns(groupViewcolumnList);
  const slotProps = useMemo(
    () => ({
      toolbar: {
        onChangePeriod: props.onChangePeriode,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat,
        typeStatList: props.typeStatList,
        onChangeGroup: setCurrentGroup,
        period: props.period,
        groupList: groupList,
        periodList: last12Month(),
        totalGroup: groupCount,
        totalChar: totalChar,
        group: currentGroup
      }
    }),
    [
      props.typeStat,
      props.typeStatList,
      props.period,
      groupList,
      groupCount,
      totalChar,
      currentGroup
    ]
  );
  const localText = {
    toolbarExportCSV: t(DOWLOAD_CSV)
  };
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };
  const slots = { toolbar: GroupViewToolbar, headerFilterMenu: null };
  return (
    <Table
      maxHeight={'70vh'}
      rows={rowList}
      columns={columnList}
      {...remainningRemoteHookData}
      slots={slots}
      slotProps={slotProps}
      initialState={initialState}
      unstable_headerFilters
      disableColumnFilter
      localeText={localText}
    />
  );
}
