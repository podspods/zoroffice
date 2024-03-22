'use client';

import React from 'react';
import { Box } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME } from './notifications.constant';
import { useTranslation } from 'react-i18next';
import { NotificationsToolbar } from './notifications.toolbar';
import NotificationsTable from './notifications.table';

import useSWR from 'swr';
import { getNotificationList } from './notifications';
import { useStore } from '@nanostores/react';
import {
  loadNotifications,
  mutateAsked,
  notificationsStore,
  setDataReady
} from './notifications.store';
import { notificationsRoute } from './notifications.type';

export default function Notifications() {
  const { t } = useTranslation();
  const {
    page,
    offset,
    pageSize,
    sortColumn,
    sortOrder,
    filterStr,
    refreshRate,
    refreshAsked,
    levelSelected
  } = useStore(notificationsStore);
  const { data: rawData, error, isLoading, mutate } = useSWR(
    getNotificationList(offset, pageSize, sortColumn, sortOrder, filterStr,levelSelected),
    {
      refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (err) => {
        const request = getNotificationList(
          offset,
          pageSize,
          sortColumn,
          sortOrder,
          filterStr,
          levelSelected
        );
        console.error(`Error useSWR on ${request}:`, err); // eslint-disable-line
      }
    }
  );
  if (refreshAsked) {
    console.log('refreshAsked 52 ==>', offset, pageSize);

    mutateAsked();
    void mutate();
  }

  if (isLoading) return <p>{t(LOADING)}</p>;
  if (error)
    return (
      <p>
        {t(ERROR)} {error}
      </p>
    );
  loadNotifications(rawData);

  if (refreshAsked) {
    mutateAsked();
    void mutate();
  }

  if (isLoading) return <p>{t(LOADING)}</p>;
  if (error)
    return (
      <p>
        {t(ERROR)} {error}
      </p>
    );
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
