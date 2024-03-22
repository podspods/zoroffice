import { useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Entity, Permission } from './PermissionsResources';
import Apis from '@/utils/apis';
import { commonFetch } from '@/utils/fetcher';
import { KeyedMutator } from 'swr';

export default function useRowActions(type: 'users' | 'groups', resourceId: string, mutate: KeyedMutator<unknown>) {
  const changePermissions = useCallback((permission: Permission, selectedRows: Entity[]) => Promise.allSettled(
    selectedRows.map(async (selectedRow) => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          [type === 'users' ? 'accountIds' : 'groupIds']: [
            selectedRow.id
          ],
          fileId: resourceId,
          permission
        })
      };
      await commonFetch(Apis.resources.permissions(type), options);
    })
  ).then(mutate), [type, resourceId]);

  return useMemo(() => [
    {
      label: 'Disable',
      disable: isEmpty,
      onClick: (selectedRows) => changePermissions('disable', selectedRows)
    },
    {
      label: 'Read Only',
      disable: isEmpty,
      onClick: (selectedRows) => changePermissions('read', selectedRows)
    },
    {
      label: 'Write (and Read)',
      disable: isEmpty,
      onClick: (selectedRows) => changePermissions('write', selectedRows)
    },
    {
      label: 'All (Read, Write and Delete)',
      disable: isEmpty,
      onClick: (selectedRows) => changePermissions('all', selectedRows)
    }
  ] satisfies RowAction<Entity>[], [changePermissions]);
}
