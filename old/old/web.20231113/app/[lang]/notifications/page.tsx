'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useStore } from '@nanostores/react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import {
  loadNotifications,
  mutateAsked,
  notificationsStore,
  setDataReady
} from './notifications.store';
import { notificationsRoute } from './notifications.type';
import { ERROR, LOADING, PAGE_NAME } from './notifications.constant';
import { NotificationsTable } from './notifications.table';
import { NotificationsToolbar } from './notifications.toolbar';
export default function Notifications() {
  const { refreshAsked, filteredList, refreshRate } = useStore(
    notificationsStore
  );
  const { t } = useTranslation();

  const { data: rawData, error, isLoading, mutate } = useSWR(
    notificationsRoute.LIST,
    {
      refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (err) =>
        console.error(`Error useSWR on ${notificationsRoute.LIST}:`, err) // eslint-disable-line
    }
  );

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
      <PageTitle>{t(PAGE_NAME)}</PageTitle>
      <NotificationsToolbar isLoading={isLoading} />
      <NotificationsTable />
    </React.Fragment>
  );
}
