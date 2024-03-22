import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { actionColumn } from '@/components/Columns';
import { Service, deregisterableList } from './serviceType';

export default function useColumns(actions: RowAction<Service>[]) {
  function convertStatus(status: string) {
    if (!status) return 'info';
    return status === 'fail' ? 'error' : 'success';
  }
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('Status'),
        disableColumnMenu: true,
        sortable: true,
        field: 'status',
        maxWidth: 120,
        renderCell: ({ row }: GridRenderCellParams) => (
          <StatusBadge
            title={row.status}
            status={convertStatus(row.status)}
          >
            {row.status ? row.status : 'unknown'}
          </StatusBadge>
        )
      },
      {
        disableColumnMenu: true,
        headerName: t('Name'),
        sortable: true,
<<<<<<< Updated upstream
        minWidth: 400,
=======
        flex: 0.2,
>>>>>>> Stashed changes
        field: 'name'
      },
      {
        disableColumnMenu: true,
        headerName: t('Hostname'),
<<<<<<< Updated upstream
        minWidth: 200,
=======
        flex: 0.1,
>>>>>>> Stashed changes
        sortable: true,
        field: 'hostname'
      },
      {
        disableColumnMenu: true,
        headerName: t('Version'),
<<<<<<< Updated upstream
        minWidth: 200,
=======
        flex: 0.1,
>>>>>>> Stashed changes
        sortable: true,
        field: 'version'
      },
      actionColumn({t, actions, hide: ({row}) => !deregisterableList.includes(row.name) })
    ],
    [t, actions]
  );
}
