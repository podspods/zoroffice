import { useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Entity, Permission } from './PermissionsResourcesTable';
import Apis from '@/utils/apis';
import { commonFetch } from '@/utils/fetcher';
import { KeyedMutator } from 'swr';

function getRoute(resourceType: 'TM' | 'UD' | 'NORM', entityType: 'users' | 'groups') {
  if (resourceType === 'TM') {
    return Apis.resources.permissions(entityType);
  }

  return Apis.dictionary.permissions(entityType);
}

export default function useRowActions(resourceType: 'TM' | 'UD' | 'NORM', entityType: 'users' | 'groups', resourceId: string, mutate: KeyedMutator<Entity[]>) {
  const changePermissions = useCallback((permission: Permission, selectedRows: Entity[]) => Promise.allSettled(
    selectedRows.map(async (selectedRow) => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          [entityType === 'users' ? 'accountIds' : 'groupIds']: [
            selectedRow.id
          ],
          fileId: resourceId,
          permission
        })
      };
      await commonFetch(getRoute(resourceType, entityType), options);
    })
  ).then(() => mutate()), [entityType, resourceId]);

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
