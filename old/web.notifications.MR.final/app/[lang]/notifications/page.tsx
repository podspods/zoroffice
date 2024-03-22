'use client';

import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import useSWR from 'swr';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';

import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME } from '@/components/Notifications/constant';
import { NotificationsToolbar } from '@/components/Notifications/Toolbar';
import NotificationsTable from '@/components/Notifications/Table';
import {
  loadNotifications,
  mutateAsked,
  notificationsStore,
  setDataReady
} from '@/components/Notifications/store';
import { defaultRequest } from '@/components/Notifications/utils';

import IsLoading from './Isloading';
import { OnError } from './OnError';

export default function Notifications() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(PAGE_NAME);
  }, []);

  const { refreshRate, refreshAsked, dataRequest } = useStore(
    notificationsStore
  );
  const { data: rawData, error, isLoading, mutate } = useSWR(
    dataRequest !== '' ? dataRequest : defaultRequest(),
    {
      refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (swrErr: Error) => {
        OnError({
          onError: error,
          label: `Error useSWR on ${dataRequest}: ${swrErr.message}`
        });
      }
    }
  );
  if (refreshAsked) {
    mutateAsked();
    void mutate();
  }

  IsLoading({ isLoading: isLoading, label: LOADING });
  OnError({ onError: error.message, label: ERROR });

  loadNotifications(rawData);
  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        <PageTitle>{t(PAGE_NAME)}</PageTitle>
        <NotificationsToolbar isLoading={isLoading} />
        <NotificationsTable isLoading={isLoading} />
      </Box>
    </React.Fragment>
  );
}
