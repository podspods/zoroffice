
import FormEntry from '@systran/react-components/lib/atoms/FormEntry';
import {Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useMemo} from 'react';
import Table, {GridRowParams} from '@systran/react-components/lib/organisms/Table/Table';
import PageTitle from '@/components/PageTitle';
import useSWR from 'swr';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import useActions from '@systran/react-components/lib/userManagement/Roles/RoleRowActions';
import useColumns from '@systran/react-components/lib/userManagement/Roles/RoleColumns';
import Toolbar from '@systran/react-components/lib/userManagement/Roles/Toolbar';
import RolePermissions from '@systran/react-components/lib/userManagement/Roles/RolePermissions';
import {useSelectableRows, isEntryUnselectable} from '@systran/react-components/lib/userManagement/Roles/RoleRowSelectable';
import useModals from '@systran/react-components/lib/userManagement/Roles/RoleModals';
import {Role} from '@systran/react-components/lib/userManagement/Roles/RoleType';
import Apis from '@/utils/apis';
import {commonFetch} from '@/utils/fetcher';

export type Props = {
  hasFullEditPermission: boolean
}

const slots = {
  headerFilterMenu: null,
  toolbar: Toolbar
};

export default function RolesTable({hasFullEditPermission}: Props) {

  const useRefresh = useRefreshBuilder<Role>({
    route: Apis.role.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      sortParamsField: {
        sortName: 'name',
        sortOrder: 'desc'
      },
      filterParamsFieldFct: () => {
        return 'filter';
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'roles',
      totalRowCountField: 'total'
    }
  });
  const remoteHooksData = useRemoteHooks({useRefresh, refreshRate: 'Never'});

  const {mutate, loading, isValidating, refreshRate, setRefreshRate, rows, ...remainsRemoteHooksData} = remoteHooksData;
  const [modal, setOpenedModal] = useModals(mutate, commonFetch, Apis.role);
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions);
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

  const onChangePermissions = async (id: string, permissions: string[]) => {
    try {
      await commonFetch(Apis.role.updatePermissions, {method: 'POST', body: JSON.stringify({pk: id, name: 'permissions', value: permissions})});
    }
    catch (error) {
      console.error('updatePermissions', error); // eslint-disable-line
    }
    finally {
      await mutate();
    }
  };

  const {data: userRolesPermission} = useSWR(Apis.userRoles, {shouldRetryOnError: false, revalidateOnFocus: false});

  const isRowSelectable = useSelectableRows(rows, (row: Role) => isEntryUnselectable(row, hasFullEditPermission, userRolesPermission?.id));

  const expandComponent = useMemo(() => ({row}: GridRowParams<Role>) => {
    if (row.name === 'super') {
      return t('Role "super" is not editable');
    }
    return (
      <FormEntry label={t('Permissions')}>
        <RolePermissions
          id={row.id}
          permissions={row.permissions!}
          availablePermissions={userRolesPermission?.permissions}
          disabled={isEntryUnselectable(row, hasFullEditPermission, userRolesPermission?.id)}
          onChange={onChangePermissions}
        />
      </FormEntry>
    );
  }, [mutate]);

  return (
    <Box sx={{width: '100%', padding: '2rem'}}>
      {modal}
      <PageTitle>{t('Roles')}</PageTitle>
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
        getDetailPanelContent={expandComponent as any}
        getDetailPanelHeight={() => 'auto'}
        slots={slots}
        slotProps={slotProps}
      />
    </Box>
  );
}
