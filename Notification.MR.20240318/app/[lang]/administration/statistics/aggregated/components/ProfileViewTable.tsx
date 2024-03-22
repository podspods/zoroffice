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
  DOWLOAD_CSV,
  profileViewcolumnList
} from '../../components/statisticsConstant';
import ProfileViewToolbar from './ProfileViewToolbar';
import { useTranslation } from 'react-i18next';

export type ProfileViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function ProfileViewTable({ ...props }: ProfileViewTableProps) {
  const { t } = useTranslation();
  const useRefresh = useRefreshBuilder<RawProfileViewStat>({
    route: Apis.statistics.byProfile,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
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
    profileViewcolumnList
  );
  const slotProps = useMemo(
    () => ({
      toolbar: {
        totalChar: totalChar,
        totalProfile: rowCount,
        totalUser: totalUser,
        setDateValue: props.setDateValue,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat,
        typeStatList: props.typeStatList,
        dateValue: props.dateValue
      }
    }),
    [
      totalChar,
      rowCount,
      totalUser,
      props.typeStat,
      props.typeStatList,
      props.dateValue
    ]
  );
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };
  const localText = {
    toolbarExportCSV: t(DOWLOAD_CSV)
  };
  const slots = {
    toolbar: ProfileViewToolbar,
    headerFilterMenu: null
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
      localeText={localText}
    />
  );
}