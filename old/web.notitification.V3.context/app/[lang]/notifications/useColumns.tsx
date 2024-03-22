'use client';

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Parser } from 'html-to-react';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel
} from '@mui/x-data-grid-pro';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';

import { Notifications } from './NotificationsTypes';
import { convertMessage, durationFromNow } from './NotificationsUtils';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { setNotificationStatus } from '@/components/Notifications/utils';
import { useNotifications } from './useNotifications';

export default function useColumns() : GridColDef<GridValidRowModel>[] {
  const actions: RowAction<Notifications>[] = [
    {
      label: 'Mark as read',
      icon: <PlusIcon />,
      onClick: (params) => void markAsRead(params)
    },
    {
      label: 'Mark as unread',
      icon: <PlusIcon />,
      onClick: (params) => void markAsUnRead(params)
    }
  ];

  const { t } = useTranslation();

  const { setRefreshAsked } = useNotifications();

  const markAsRead = (rowList: Notifications[]) => {
    if (!rowList[0].read) {
      void setNotificationStatus(rowList[0].id, true);
      setRefreshAsked();
    }
  };
  const markAsUnRead = (rowList: Notifications[]) => {
    if (rowList[0].read) {
      void setNotificationStatus(rowList[0].id, false);
      setRefreshAsked();
    }
  };
  return useMemo(
    () => [
      {
        field: 'level',
        headerName: 'level',
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
        field: 'read',
        headerName: 'read',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => {
          const { t } = useTranslation();
          return row.read ? t('read') : t('unread');
        }
      },
      {
        field: 'str',
        headerName: 'notification',
        align: 'left',
        headerAlign: 'center',
        minWidth: 500,
        // renderHeader: () => DisplaySearchField({ searchText: searchText }),
        renderCell: ({ row }: GridRenderCellParams) => {
          const parser = Parser();
          return row.str && parser.parse(convertMessage(row.str));
        }
      },
      {
        field: 'insertedAt',
        headerName: 'insertedAt',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt),
        sortable: true
      },
      {
        field: 'elipsis',
        headerName: '',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => (
          <RowActionMenu actions={actions} selectedRow={row} />
        ),
        sortable: true
      }
    ],
    []
  );
}
