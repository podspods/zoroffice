import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { actionColumn } from '@/components/Columns';
import { getGridStringOperators, GridColDef } from '@systran/react-components/lib/organisms/Table/Table';
import { Entity } from './PermissionsResourcesTable';

export default function useColumns(type: 'users' | 'groups', actions: RowAction<Entity>[]) {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      {
        field: 'name',
        type: 'string',
        headerName: type === 'users' ? t('User Name') : t('Group Name'),
        filterOperators: getGridStringOperators().filter(({ value }) =>
          ['contains'].includes(value)
        ),
        sortable: false,
        flex: 100
      },
      {
        field: 'permission',
        type: 'string',
        headerName: t('Permission'),
        sortable: false,
        filterable: false,
        flex: 70
      },
      actionColumn({t, actions})
    ] satisfies GridColDef<Entity>[];
  }, [t, actions]);
}
