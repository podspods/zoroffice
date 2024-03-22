import {useMemo} from 'react';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import {useTranslation} from 'react-i18next';
import PageTitle from '@/components/PageTitle';
import Apis from '@/utils/apis';
import useSWR from 'swr';
import useActions from '@systran/react-components/lib/userManagement/Users/UserRowActions';
import useColumns from '@systran/react-components/lib/userManagement/Users/UserColumns';
import Toolbar from '@systran/react-components/lib/userManagement/Users/Toolbar';
import useModals from '@systran/react-components/lib/userManagement/Users/UserModals';
import {User} from '@systran/react-components/lib/userManagement/Users/userType';
import {commonFetch} from '@/utils/fetcher';
import useGetGroupListLight from './useGetGroupsLight';
import InternalRoutes from '@/utils/internalRoutes'

import {useSelectableRows, isUserUnselectable} from '@systran/react-components/lib/userManagement/RowSelectable';

export type UsersTableProps = {
  hasDeletePermission: boolean,
  hasDeactivatePermission: boolean,
  canAddUser: boolean,
  connectedUserId: string
}

const slots = {
  headerFilterMenu: null,
  toolbar: Toolbar
};

export default function UsersTable({hasDeletePermission, hasDeactivatePermission, canAddUser, connectedUserId}: UsersTableProps) {
  const useRefresh = useRefreshBuilder<User>({
    route: Apis.user.list,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        sortName: 'name',
        sortOrder: 'desc'
      },
      filterParamsFieldFct: (field: string) => {
        if (field === 'filter') {
          return 'filter';
        }
        if (field === 'displayName') {
          return 'eleFilters[name]';
        }
        if (field === 'id') {
          return 'eleFilters[_id]';
        }
        return `eleFilters[${field}]`;
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'accounts',
      totalRowCountField: 'total'
    }
  });
  const remoteHooksData = useRemoteHooks({useRefresh, refreshRate: 'Never'});

  const {mutate, loading, isValidating, refreshRate, setRefreshRate, rows, ...remainsRemoteHooksData} = remoteHooksData;

  const {data: usersRolesList } = useSWR(Apis.user.fetchUsersRoles, {shouldRetryOnError: false, revalidateOnFocus: false});
  const {data: usersGroupsList} = useSWR(Apis.user.fetchUsersGroups, {shouldRetryOnError: false, revalidateOnFocus: false});
  const {data: rules = []} = useSWR(Apis.password.rules, {shouldRetryOnError: false, revalidateOnFocus: false});

  const {data: dataGroupListLight} = useGetGroupListLight();

  const isRowSelectable = useSelectableRows(rows, (row: User) => isUserUnselectable({user: row}));

  const [modal, setOpenedModal] = useModals({mutate, commonFetch, userApis: Apis.user, rules, dataGroupListLight, allowEmptyPassword: true, withGroups: true, withLogin: false, withLocalizationLanguages: false});
  const actions = useActions({setOpenedModal, hasDeactivatePermission, hasDeletePermission, connectedUserId});
  const columns = useColumns({actions, usersRolesList, usersGroupsList, userLink: InternalRoutes.users, withLoginColumn: false});
  const {t} = useTranslation();

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading: loading,
        isValidating,
        refreshInterval: refreshRate,
        setRefreshInterval: setRefreshRate,
        actions,
        mutate,
        canAddUser,
        setOpenedModal: setOpenedModal
      }
    }),
  [loading, isValidating, refreshRate, setRefreshRate, actions, mutate]
  );

  return (
    <>
      {modal}
      <PageTitle>{t('Users')}</PageTitle>
      <Table
        {...remainsRemoteHooksData}
        loading={loading}
        rows={rows}
        columns={columns as any}
        checkboxSelection
        columnHeaderHeight={60}
        unstable_headerFilters
        isRowSelectable={isRowSelectable}
        pagination
        slots={slots}
        slotProps={slotProps}
      />
    </>
  );
}
