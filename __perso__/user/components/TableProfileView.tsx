import useSWR from 'swr';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { DateRange } from '@mui/x-date-pickers-pro';
import Table, {
  GridColumnVisibilityModel,
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import MainBox from '@/components/MainBox';
import { Column, RawProfileViewStat } from '../../components/statisticsType';
import {
  getColumnVisible,
  mergeColumn,
  toProfileViewStat,
  useColumns
} from '../../components/statisticsUtils';
import {
  baseColumnList,
  specificProfileViewColumnList
} from '../../components/statisticsConstant';
import ProfileViewToolbar from './TableProfileView.Toolbar';

export type TableDefaultProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function TableProfileView({ ...props }: TableDefaultProps) {
  const { t } = useTranslation();

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
  } = useRemoteHooks<RawProfileViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const { rowList, totalChar } = useMemo(
    () => toProfileViewStat(rawDataStatisticProfileView),
    [rawDataStatisticProfileView]
  );

  // const { rowList, totalChar } = toProfileViewStat(rawDataStatisticProfileView);
  // const { profileList, profileCount } = getProfileList(rawDataProfile);
  /** _____________________hook __________________________ */

  // console.log('remainningRemoteHookData ==>', remainningRemoteHookData);
  const profileViewDataField: Column[] = mergeColumn(
    baseColumnList,
    specificProfileViewColumnList
  );

  const columnVisibilityModel: GridColumnVisibilityModel = getColumnVisible(
    profileViewDataField
  );

  const columnList = useColumns(profileViewDataField, t);
  return (
    <>
      <MainBox>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
          rows={rowList}
          columns={columnList}
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
