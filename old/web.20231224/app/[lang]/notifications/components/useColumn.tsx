import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import DisplayMessage from './DisplayMessage';
import { Notification } from './NotificationsType';
import { durationFromNow } from './NotificationUtils';

export default function useColumns(actions: RowAction<Notification>[]) {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('Level'),
        disableColumnMenu: true,
        sortable: true,
        field: 'level',
        minWidth: 150,
        renderCell: ({ row }: GridRenderCellParams) => (
          <StatusBadge title={row.level} status={row.level}>
            {t(row.level)}
          </StatusBadge>
        )
      },
      {
        headerName: t('Read'),
        sortable: true,
        disableColumnMenu: true,
        field: 'read',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => {
          return row.read ? t('read') : t('unread');
        }
      },
      {
        headerName: t('Notification'),
        sortable: true,
        disableColumnMenu: true,
        field: 'str',
        minWidth: 500,
        renderCell: ({ row }: GridRenderCellParams) => (
          <DisplayMessage str={row.str} />
        )
      },
      {
        headerName: t('InsertedAt'),
        sortable: true,
        disableColumnMenu: true,
        field: 'insertedAt',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt)
      },
      {
        headerName: '',
        sortable: false,
        type: 'string',
        disableColumnMenu: true,
        field: 'elipsis',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => (
          <RowActionMenu actions={actions} selectedRow={row} />
        )
      }
    ],
    []
  );
}
