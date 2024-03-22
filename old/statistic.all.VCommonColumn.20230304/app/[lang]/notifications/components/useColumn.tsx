import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridRenderCellParams
} from '@systran/react-components/lib/organisms/Table/Table';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import DisplayMessage from './DisplayMessage';
import { Level, Notification } from './NotificationsType';
import { durationFromNow } from './NotificationUtils';
import { actionColumn } from '@/components/Columns';
import { useSingleSelectOperators } from '@systran/react-components/lib/organisms/Table/filterOperators/SingleSelectOperators';

export default function useColumns(actions: RowAction<Notification>[]) {
  const { t } = useTranslation();
  const levelList: Level[] = [
    { id: 'error', label: 'Error' },
    { id: 'info', label: 'Info' },
    { id: 'success', label: 'Success' }
  ];

  return useMemo(
    () => [
      {
        headerName: t('Level'),
        disableColumnMenu: true,
        sortable: true,
        field: 'level',
        flex: 0.1,

        filterOperators: useSingleSelectOperators({
          options: levelList,
          fieldFilter: 'id'
        }),

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
        flex: 0.1,
        renderCell: ({ row }: GridRenderCellParams) => {
          return row.read ? t('read') : t('unread');
        }
      },
      {
        headerName: t('Notification'),
        sortable: true,
        disableColumnMenu: true,
        field: 'str',
        flex: 0.1,
        renderCell: ({ row }: GridRenderCellParams) => (
          <DisplayMessage str={row.str} />
        )
      },
      {
        headerName: t('InsertedAt'),
        sortable: true,
        disableColumnMenu: true,
        field: 'insertedAt',
        flex: 0.1,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt)
      },
      actionColumn({ t, actions })
    ],
    []
  );
}
