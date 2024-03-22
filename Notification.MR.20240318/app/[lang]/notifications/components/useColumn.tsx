import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import DisplayMessage from './DisplayMessage';
import { Notification } from './NotificationsType';
import { durationFromNow } from './NotificationUtils';
import { actionColumn } from '@/components/Columns';

export default function useColumns(actions: RowAction<Notification>[]) {
  const { t } = useTranslation();


  return useMemo(
    () => [
      {
        headerName: t('Status'),
        disableColumnMenu: true,
        sortable: true,
        field: 'level',
        flex: 0.1,
        type: 'singleSelect',
        valueOptions: [
          { value: 'error', label: t('Error') },
          { value: 'info', label: t('Info') },
          { value: 'success', label: t('Success') }
        ],
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
        renderCell: ({ row }: GridRenderCellParams): string => {
          return row.read ? t('read') : t('unread');
        }
      },
      {
        headerName: t('Notifications'),
        sortable: true,
        disableColumnMenu: true,
        field: 'str',
        flex: 0.3,
        renderHeaderFilter: () => null,
        renderCell: ({ row }: GridRenderCellParams) => (
          <DisplayMessage str={row.str} />
        )
      },
      {
        headerName: t('Date Added'),
        sortable: true,
        disableColumnMenu: true,
        field: 'insertedAt',
        flex: 0.1,
        renderHeaderFilter: () => null,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt)
      },
      actionColumn({ t, actions })
    ],
    []
  );
}
