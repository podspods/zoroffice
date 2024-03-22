import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import Table, { useRemoteHooks } from '@systran/react-components/lib/organisms/Table/Table';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import Toolbar, {Props as ToolbarProps} from './Toolbar';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import useRowActions from './useRowActions';
import useColumns from './useColumns';

const slots = {
  toolbar: Toolbar
};

export type Permission = 'disable' | 'read' | 'write' | 'all'

export type User = {
  id: string
  displayName: string
  groupIds: string[]
  current: boolean
  permission?: Permission
}

export type Group = {
  id: string
  name: string
  displayName: string
  accountIds: string[]
  accountNames: string
  permission?: Permission
}

export type Entity = {
  id: string
  name: string
  permission: Permission
}

function normalize({id, displayName, permission}: User | Group): Entity {
  return {
    id,
    name: displayName,
    permission: permission ?? 'disable'
  };
}

export type Props = {
  type: 'users' | 'groups'
  resourceId: string
}

export default function PermissionsResources({type, resourceId}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);

  const useRefresh = useRefreshBuilder<Entity>({
    route: Apis.resources.tm(type, resourceId),
    useSWR,
    adaptParamsOpts: {
      filterParamsFieldFct: () => type === 'users' ? 'eleFilters[name]' : 'pagination[displayName]',
      paginationParamsFields: {
        limit: 'pagination[iDisplayLength]',
        skip: 'pagination[iDisplayStart]'
      }
    },
    adaptResponseOpts: {
      rowsField: 'data',
      rowParser: (data: {data?: unknown[]}) => (data?.data || []).map((row) => normalize(row as User | Group)),
      totalRowCountField: 'total'
    }
  });
  const {rows, mutate, isValidating, loading, ...remoteHooksData} = useRemoteHooks({useRefresh, refreshRate: 'Never'});

  const actions = useRowActions(type, resourceId, mutate);
  const columns = useColumns(type, actions);

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading: loading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        actions,
        mutate
      } satisfies ToolbarProps
    }
  ), [
    loading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    actions,
    mutate
  ]);

  return (
    <Box>
      <Table
        {...remoteHooksData}
        loading={loading}
        rows={rows}
        columns={columns as any}
        checkboxSelection
        slots={slots}
        slotProps={slotProps}
        disableColumnFilter
        unstable_headerFilters
      />
    </Box>
  );
}
