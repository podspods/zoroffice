'use client';

import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import { Notification } from './components/NotificationsType';
import NotificationToolbar from './components/NotificationToolbar';
import useColumns from './components/useColumn';
import { actionList, slotProps } from './components/NotificationUtils';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

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

  const {
    mutate,
    loading,
    refreshRate,
    setRefreshRate: setRefreshInterval,
    ...remainningRemoteHookData
  } = useRemoteHooks<Notification>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  return (
    <TemporaryPageBox>
      <PageTitle>{t('Notifications')}</PageTitle>
      <Table
        {...remainningRemoteHookData}
        columns={useColumns(actionList(mutate)) as any}
        checkboxSelection
        pagination
        slots={{
          toolbar: NotificationToolbar
        }}
        slotProps={slotProps(loading, refreshRate, setRefreshInterval, mutate)}
        disableColumnSelector
      />
    </TemporaryPageBox>
  );
}
