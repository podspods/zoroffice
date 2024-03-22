'use client';

import React from 'react';
import { Box } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME, toolbarElement } from './notifications.constant';
import { useTranslation } from 'react-i18next';
import { NotificationsToolbar } from './notifications.toolbar';
import NotificationsTable from './notifications.table';

import useSWR from 'swr';
import { useStore } from '@nanostores/react';
import {
  loadNotifications,
  mutateAsked,
  notificationsStore,
  setDataReady
} from './notifications.store';
import { Loading } from './notifications.component/Loading';
import { defaultRequest } from './notifications';

export default function Notifications() {
  const { t } = useTranslation();
  const { offset, pageSize, refreshRate, refreshAsked, dataRequest } = useStore(
    notificationsStore
  );

  const { data: rawData, error, isLoading, mutate } = useSWR(
    dataRequest !== '' ? dataRequest : defaultRequest(),
    {
      refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (err) => {
        console.error(`Error useSWR on ${dataRequest}:`, err); // eslint-disable-line
      }
    }
  );
  if (refreshAsked) {
    console.log('refreshAsked 52 ==>', offset, pageSize); // eslint-disable-line

    mutateAsked();
    void mutate();
  }

  Loading({
    isLoading: isLoading,
    error: error,
    labelLoading: LOADING,
    labelError: ERROR
  });

  loadNotifications(rawData);
  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        <PageTitle>{t(PAGE_NAME)}</PageTitle>
        <NotificationsToolbar
          isLoading={isLoading}
        />
        <NotificationsTable isLoading={isLoading} />
      </Box>
    </React.Fragment>
  );
}
