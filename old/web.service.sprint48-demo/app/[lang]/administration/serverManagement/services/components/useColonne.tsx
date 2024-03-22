import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Service, deregisterableList } from './serviceType';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';

export default function useColumns(actions: RowAction<Service>[]) {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('status'),
        disableColumnMenu: true,
        sortable: true,
        field: 'status',
        maxWidth: 120,
        renderCell: ({ row }: GridRenderCellParams) => (
          // console.log('row ==>', row.status);
          // const statusBadge: StatusBadgeType = convertStatus(row.status);
          <StatusBadge
            title={row.status}
            status={row.status === 'fail' ? 'error' : 'success'}
            // status='success'
          >
            {row.status ? row.status : 'unknow'}
          </StatusBadge>
        )
      },
      {
        disableColumnMenu: true,
        headerName: t('name'),
        sortable: true,
        minWidth: 400,
        field: 'name'
      },
      {
        disableColumnMenu: true,
        headerName: t('hostname'),
        minWidth: 200,
        sortable: true,
        field: 'hostname'
      },
      {
        disableColumnMenu: true,
        headerName: t('version'),
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
