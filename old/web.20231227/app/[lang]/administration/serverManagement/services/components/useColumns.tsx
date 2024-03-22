import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
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
            {row.status ? row.status : 'unknow'}
          </StatusBadge>
        )
      },
      {
        disableColumnMenu: true,
        headerName: t('Name'),
        sortable: true,
        minWidth: 400,
        field: 'name'
      },
      {
        disableColumnMenu: true,
        headerName: t('Hostname'),
        minWidth: 200,
        sortable: true,
        field: 'hostname'
      },
      {
        disableColumnMenu: true,
        headerName: t('Version'),
        minWidth: 200,
        sortable: true,
        field: 'version'
      },
      {
        headerName: '',
        field: 'elipsis',
        maxWidth: 80,
        flex: 0.2,
        sortable: false,
        editable: false,
        renderCell: ({ row }: GridRenderCellParams) => {
          return (
            deregisterableList.includes(row.name) && (
              <RowActionMenu actions={actions} selectedRow={row} />
            )
          );
        }
      }
    ],
    []
  );
}
