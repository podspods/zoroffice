import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid-pro';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import DisplayMessage from './DisplayMessage';
import { LEVEL_LIST, Notification } from './NotificationsType';
import { durationFromNow } from './NotificationUtils';
import SelectBox from '@/components/SelectBox';
import { actionColumn } from '@/components/Columns';
import { GridColDef } from '@systran/react-components/lib/organisms/Table/Table';

export default function useColumns(
  actions: RowAction<Notification>[],
  levelOnChange: (level: string) => void,
  currentLevel: string
) {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      {
        headerName: t('Level'),
        disableColumnMenu: true,
        sortable: true,
        field: 'level',
        minWidth: 150,
        renderHeader: () => (
          <SelectBox
            sx={{
              '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }
            }}
            itemList={LEVEL_LIST}
            value={currentLevel}
            onChange={(event) => levelOnChange(event.target.value)}
          />
        ),

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
      actionColumn({ t, actions })
    ];
  }, [t, actions]);
}
