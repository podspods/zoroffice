import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import {
  Account,
  Period,
  RawUserViewStat,
  TypeStat
} from '../../components/statisticsType';
import {
  initAccountList,
  last12Month,
  toUserViewStat,
  useColumns
} from '../../components/statisticsUtils';
import UserViewToolbar from './UserViewToolbar';
import { DOWLOAD_CSV, userViewColumnList } from '../../components/statisticsConstant';
import { useTranslation } from 'react-i18next';

export type UserViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function UserViewTable({ ...props }: UserViewTableProps) {
  const { t } = useTranslation();
  const [currentAccount, setCurrentAccount] = useState<Account>({
    id: '',
    displayName: '',
    groupIds: [],
    current: false
  });

  const { data: rawDataUser } = useSWR(Apis.statistics.userList, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.userList}: ${swrErr.message}`}
      />
    )
  });
  const { accountList, count: accountCount } = useMemo(
    () => initAccountList(rawDataUser, currentAccount, setCurrentAccount),
    [rawDataUser]
  );

  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.byUser(currentAccount.id),
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
    rows: rawDataStatisticUserView,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawUserViewStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  const { rowList, totalChar } = useMemo(
    () => toUserViewStat(rawDataStatisticUserView),
    [rawDataStatisticUserView, currentAccount]
  );
  const localText = {
    toolbarExportCSV: t(DOWLOAD_CSV)
  };
  const { columnList, columnVisibilityModel } = useColumns(
    userViewColumnList
  );


  const slotProps = useMemo(
    () => ({
      toolbar: {
        onChangePeriod: props.onChangePeriode,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat,
        typeStatList: props.typeStatList,
        onChangeAccount: setCurrentAccount,
        periodList: last12Month(),
        period: props.period,
        accountList: accountList,
        account: currentAccount,
        totalAccount: accountCount,
        totalChar: totalChar
      }
    }),
    [
      props.typeStat,
      props.typeStatList,
      props.period,
      accountList,
      currentAccount,
      accountCount,
      totalChar
    ]
  );
  const slots = {
    toolbar: UserViewToolbar,
    headerFilterMenu: null
  };
  const initialState = {
    columns: {
      columnVisibilityModel: columnVisibilityModel
    }
  };

  return (
    <Table
      maxHeight={'70vh'}
      rows={rowList}
      columns={columnList}
      {...remainningRemoteHookData}
      slots={slots}
      slotProps={slotProps}
      unstable_headerFilters
      disableColumnFilter
      initialState={initialState}
      localeText={localText}
    />
  );
}
