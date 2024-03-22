import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import UserViewToolbar from './UserViewToolbar';
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
import {
  baseColumnList,
  specificUserViewColumnList
} from '../../components/statisticsConstant';

export type UserViewTableProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function UserViewTable({ ...props }: UserViewTableProps) {
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
      filterParamsFieldFct: (field: string) => `eleFilters[${field}]`,
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'request',
        sortOrder: 'desc',
        date: `${props.period.monthNumber}`
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

  const { rowList, totalChar } = useMemo(
    () => toUserViewStat(rawDataStatisticUserView, currentAccount),
    [rawDataStatisticUserView, currentAccount]
  );

  const { columnList, columnVisibilityModel } = useColumns(
    baseColumnList,
    specificUserViewColumnList
  );

  const slotProps = useMemo(
    () => ({
      toolbar: {
        onChangePeriod: props.onChangePeriode,
        onChangeTypeStat: props.onChangeTypeStat,
        typeStat: props.typeStat,
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
      props.onChangePeriode,
      props.onChangeTypeStat,
      props.typeStat,
      last12Month(),
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
      initialState={initialState}
      unstable_headerFilters
      disableColumnFilter
    />
  );
}
