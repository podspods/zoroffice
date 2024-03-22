'use client';

import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import { Level, Notification } from './components/NotificationsType';
import NotificationToolbar from './components/NotificationToolbar';
import useColumns from './components/useColumn';
import { actionList } from './components/NotificationUtils';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import { useMemo, useState } from 'react';

export default function Notifications() {
  const { t } = useTranslation();
  const [currentLevel, SetCurrentLevel] = useState<Level>({
    id: 'all',
    label: ''
  });

  const useRefresh = useRefreshBuilder<Notification>({
    route: Apis.notification.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'insertedAt',
        sortOrder: 'desc'

      },
      filterParamsFieldFct: (field: string) => `eleFilters[${field}]`
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
  const onChangeLevel = (newLevel: Level) => {
    SetCurrentLevel(newLevel);
  };

  // const colums = useColumns(actionList(mutate), onChangeLevel, currentLevel);
  const colums = useColumns(actionList(mutate));
  const slots = { toolbar: NotificationToolbar };
  const slotProps = useMemo(
    () => ({
      toolbar: {
        loading,
        refreshRate,
        setRefreshInterval,
        actions: actionList(mutate),
        mutate
      }
    }),
    [loading, refreshRate, setRefreshInterval, mutate]
  );
  return (
    <TemporaryPageBox>
      <PageTitle>{t('Notifications')}</PageTitle>
      <Table
        {...remainningRemoteHookData}
        columns={colums as any}
        checkboxSelection
        pagination
        slots={slots}
        slotProps={slotProps}
        disableColumnSelector
        unstable_headerFilters
      />
    </TemporaryPageBox>
  );
}
