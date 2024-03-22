'use client';

import React from 'react';
import { Box } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME } from '@/components/Notifications/constant';
import { useTranslation } from 'react-i18next';
import { NotificationsToolbar } from '../../../components/Notifications/Toolbar';
import NotificationsTable from '../../../components/Notifications/Table';

import useSWR from 'swr';
import { useStore } from '@nanostores/react';
import {
  loadNotifications,
  mutateAsked,
  notificationsStore,
  setDataReady
} from '@/components/Notifications/store';
import { Loading } from './Loading';
import { defaultRequest } from '@/components/Notifications/utils';

export default function Notifications() {
  const { t } = useTranslation();
  const { refreshRate, refreshAsked, dataRequest } = useStore(
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
