'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Box } from '@mui/material';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import PageTitle from '@/components/PageTitle';
import { Notification } from './components/NotificationsType';
import NotificationToolbar from './components/NotificationToolbar';
import { markAsRead, markAsUnRead } from './components/NotificationUtils';
import useColumns from './components/useColumn';
import Apis from '@/utils/apis';

export default function Notifications() {
  const { t } = useTranslation();
  const useRefresh = useRefreshBuilder<Notification>({
    route: Apis.notification.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'notifications',
      totalRowCountField: 'total'
    }
  });

  const remoteHooksData = useRemoteHooks<Notification>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const { mutate, loading, refreshRate, setRefreshRate } = remoteHooksData;

  const actions: RowAction<Notification>[] = [
    {
      label: 'Mark as read',
      icon: <PlusIcon />,
      onClick: (params) => void markAsRead(params, mutate)
    },
    {
      label: 'Mark as unread',
      icon: <PlusIcon />,
      onClick: (params) => void markAsUnRead(params, mutate)
    }
  ];

  const columns = useColumns(actions);
  const slots = {
    toolbar: NotificationToolbar
  };
  const slotProps = useMemo(
    () => ({
      toolbar: {
        loading,
        refreshRate,
        setRefreshInterval: setRefreshRate,
        actions: actions,
        mutate
      }
    }),
    [loading, refreshRate, setRefreshRate, actions, mutate]
  );
  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Notifications')}</PageTitle>
      <Table
        {...remoteHooksData}
        columns={columns}
        checkboxSelection
        pagination
        slots={slots}
        slotProps={slotProps}
        disableColumnSelector
      />
    </Box>
  );
}
