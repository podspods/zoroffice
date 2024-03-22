import { useMemo } from 'react';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import { RawProfileViewStat, TypeStat } from '../../components/statisticsType';
import {
  toProfileViewStat,
  useColumns
} from '../../components/statisticsUtils';
import {
  baseColumnList,
  specificProfileViewColumnList
} from '../../components/statisticsConstant';
import ProfileViewToolbar from './ProfileViewToolbar';

export type ProfileViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function ProfileViewTable({ ...props }: ProfileViewTableProps) {
  const useRefresh = useRefreshBuilder<RawProfileViewStat>({
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
        groupBy: 'profiles',
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
      totalRowCountField: 'total'
    }
  });
  const {
    rows: rawDataStatisticProfileView,
    rowCount,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawProfileViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const { rowList, totalChar, totalUser } = useMemo(
    () => toProfileViewStat(rawDataStatisticProfileView),
    [rawDataStatisticProfileView]
  );
  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificProfileViewColumnList
  );
  const slotProps = useMemo(
    () => ({
      toolbar: {
        totalChar: totalChar,
        totalProfile: rowCount,
        totalUser: totalUser,
        setDateValue: props.setDateValue,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat
      }
    }),
    [
      totalChar,
      rowCount,
      totalUser,
      props.setDateValue,
      props.onChangeTypeStat,
      props.typeStat
    ]
  );
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };
  const slots = {
    toolbar: ProfileViewToolbar
  };
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
    />
  );
}
