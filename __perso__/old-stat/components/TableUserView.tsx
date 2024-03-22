import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table, {
  GridColumnVisibilityModel,
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useSWR from 'swr';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import PageTitle from '@/components/PageTitle';
import MainBox from '@/components/MainBox';
import Apis from '@/utils/apis';
import {
  Account,
  Column,
  RawUserViewStat,
  accountInit
} from '../../components/statisticsType';
import {
  getAccountList,
  getColumnVisible,
  last12Month,
  mergeColumn,
  toUserViewStat,
  useColumns
} from '../../components/statisticsUtils';
import { baseColumnList, specificUserViewColumnList } from '../../components/statisticsConstant';
import UserViewToolbar from './TableUserView.Toolbar';

export type TableUserViewProps = {
  name: string;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
  onChangePeriode: (typeStat: string) => void;
  period: string;
};

export default function TableUserView({ ...props }: TableUserViewProps) {
  const { t } = useTranslation();
  const [currentAccount, setCurrentAccount] = useState<Account>(accountInit);

  const { data: rawDataUser } = useSWR(Apis.statistics.userList, {
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.statistics.userList}: ${swrErr.message}`}
      />
    )
  });
  const { accountList, count: accountCount } = useMemo(
    () => getAccountList(rawDataUser),
    [rawDataUser]
  );

  useMemo(() => {
    if (currentAccount.id !== '') return;
    if (!accountList) return;
    if (accountList.length <= 0) return;
    setCurrentAccount(accountList[0]);
  }, [rawDataUser]);

  const useRefresh = useRefreshBuilder<RawUserViewStat>({
    route: Apis.statistics.byUser(currentAccount.id),
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

  const { rowList, totalChar } = useMemo(
    () => toUserViewStat(rawDataStatisticUserView, currentAccount),
    [rawDataStatisticUserView, currentAccount]
  );

  const userViewDataField: Column[] = mergeColumn(
    baseColumnList,
    specificUserViewColumnList
  );

  const columnVisibilityModel: GridColumnVisibilityModel = getColumnVisible(
    userViewDataField
  );
  const columnList = useColumns(userViewDataField, t);
  return (
    <>
      <MainBox>
        <PageTitle>{t(props.name)}</PageTitle>

        <Table
          rows={rowList}
          columns={columnList}
          {...remainningRemoteHookData}
          slots={{ toolbar: UserViewToolbar }}
          slotProps={{
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
