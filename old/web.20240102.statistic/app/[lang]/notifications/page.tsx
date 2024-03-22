'use client';

import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Box } from '@mui/material';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
// import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import useRefreshBuilder from '@/components/fromReact/useRefresh';

import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import { Notification, Status } from './components/NotificationsType';
import NotificationToolbar from './components/NotificationToolbar';
import useColumns from './components/useColumn';
import { actionList, slotProps } from './components/NotificationUtils';
import { useState } from 'react';

export default function Notifications() {
  // function myFilterFunction(field: string) {
  //   // console.log('myFilterFunction 22 ==>', field);

  //   return 'toto' + field;
  // }

  const [level, setLevel] = useState<string>(Status.ALL);
  const { t } = useTranslation();
  const useRefresh = useRefreshBuilder<Notification>({
    route: Apis.notification.list,
    useSWR,
    adaptParamsOpts: {
      // filterParamsFieldFct: myFilterFunction,
      filterParamsFieldFct: () => level === 'users' ? 'eleFilters[name]' : 'pagination[displayName]',
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

  function levelOnChange(newLevel: string) {

    setLevel(newLevel);
    void mutate();
  }

  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Notifications')}</PageTitle>
      <Table
        {...remainningRemoteHookData}
        columns={useColumns(actionList(mutate), levelOnChange, level)}
        checkboxSelection
        pagination
        slots={{
          toolbar: NotificationToolbar
        }}
        slotProps={slotProps(loading, refreshRate, setRefreshInterval, mutate)}
        disableColumnSelector
      />
    </Box>
  );
}
