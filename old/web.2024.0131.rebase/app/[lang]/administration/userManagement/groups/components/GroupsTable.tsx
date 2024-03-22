import {useMemo} from 'react';
import Table, {GridRowParams} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import {Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
import PageTitle from '@/components/PageTitle';
import Apis from '@/utils/apis';
import useSWR from 'swr';
import useActions from '@systran/react-components/lib/userManagement/Groups/GroupRowActions';
import useColumns from '@systran/react-components/lib/userManagement/Groups/GroupColumns';
import Toolbar from '@systran/react-components/lib/userManagement/Groups/Toolbar';
import useModals from '@systran/react-components/lib/userManagement/Groups/GroupModals';
import {Group} from '@systran/react-components/lib/userManagement/Groups/GroupType';
import {commonFetch} from '@/utils/fetcher';
import {useSelectableRows, isGroupUnremovable} from '@systran/react-components/lib/userManagement/RowSelectable';

export type GroupTableProps = {
  hasFullEditPermission: boolean,
  hasDeleteExternalGroupPermission: boolean
}

const slots = {
  headerFilterMenu: null,
  toolbar: Toolbar
};

export default function GroupTable({hasFullEditPermission, hasDeleteExternalGroupPermission}: GroupTableProps) {
  const useRefresh = useRefreshBuilder<Group>({
    route: Apis.group.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      },
      filterParamsFieldFct: (field: string) => {
        if (field === 'filter') {
          return 'filter';
        }
        if (field === 'accounts') {
          return 'eleFilters[accountNames]';
        }
        return `eleFilters[${field}]`;
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'groups',
      totalRowCountField: 'total'
    }
  });
  const remoteHooksData = useRemoteHooks({useRefresh, refreshRate: 'Never'});

  const {mutate, loading, isValidating, refreshRate, setRefreshRate, rows, ...remainsRemoteHooksData} = remoteHooksData;

  const { data: groupsRolesList } = useSWR(Apis.group.fetchGroupsRoles('roles'), {shouldRetryOnError: false, revalidateOnFocus: false});
  const {data: userRoles} = useSWR(Apis.userRoles, {shouldRetryOnError: false, revalidateOnFocus: false});

  const isRowSelectable = useSelectableRows(rows, (row: Group) =>
    isGroupUnremovable({
      group: row,
      hasFullEditPermission,
      hasDeleteExternalGroupPermission,
      connectedUserId: userRoles?.connectedUserId,
      additionalUnselectableCondition: false
    })
  );
  const groupLinkId = '/administration/userManagement/groups/';
  const [modal, setOpenedModal] = useModals(mutate, commonFetch, Apis.group);
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions, groupsRolesList, groupLinkId);
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
        setOpenedModal: setOpenedModal
      }
    }),
  [loading, isValidating, refreshRate, setRefreshRate, actions, mutate]
  );

  return (
    <Box sx={{width: '100%', padding: '2rem'}}>
      {modal}
      <PageTitle>{t('Groups')}</PageTitle>
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
    </Box>
  );
}
