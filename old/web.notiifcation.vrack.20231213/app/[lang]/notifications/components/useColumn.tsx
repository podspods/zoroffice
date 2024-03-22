import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import DisplayMessage from './DisplayMessage';
import { durationFromNow } from './NotificationUtils';
import { Notification } from './NotificationsType';

export default function useColumns(
  // actions: RowAction<Notification>[]
  actions: RowAction<Notification>[]
) {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('level'),
        disableColumnMenu: true,
        sortable: true,
        field: 'level',
        align: 'center',
        headerAlign: 'center',
        minWidth: 150,
        renderCell: ({ row }: GridRenderCellParams) => (
          <StatusBadge title={row.level} status={row.level}>
            {t(row.level)}
          </StatusBadge>
        )
      },
      {
        headerName: t('read'),
        sortable: true,
        disableColumnMenu: true,
        field: 'read',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => {
          const { t } = useTranslation();
          return row.read ? t('read') : t('unread');
        }
      },
      {
        headerName: t('notification'),
        sortable: true,
        disableColumnMenu: true,
        field: 'str',
        align: 'left',
        headerAlign: 'center',
        minWidth: 500,
        renderCell: ({ row }: GridRenderCellParams) => (
          <DisplayMessage str={row.str} />
        )
      },
      {
        headerName: t('insertedAt'),
        sortable: true,
        disableColumnMenu: true,
        field: 'insertedAt',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt)
      },
      {
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        field: 'elipsis',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => (
          <RowActionMenu actions={actions} selectedRow={row} />
        )
      }
    ],
    []
  );
}
