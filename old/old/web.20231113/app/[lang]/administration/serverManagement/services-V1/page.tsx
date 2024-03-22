'use client';

import React from 'react';

import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME } from './services.constant';
import { Box } from '@mui/material';
import { useStore } from '@nanostores/react';
import {
  servicesStore,
  loadService,
  mutateAsked,
  setDataReady
} from './services.store';

import useSWR from 'swr';
import { serviceRoute } from './services.type';
import { Modal } from './Modal';
import { ServiceToolbar } from './services.toolbar';
import { ToastedMessage } from './services';
import { ServicesTable } from './services.table';
import { useTranslation } from 'react-i18next';
export default function AdministrationServerManagementServices() {
  const { message, refreshAsked, filteredList } = useStore(servicesStore);
  const { t } = useTranslation();

  const { data: rawData, error, isLoading, mutate } = useSWR(
    serviceRoute.LIST,
    {
      // refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (err) =>
        console.error(`Error useSWR on ${serviceRoute.LIST}:`, err) // eslint-disable-line
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
  loadService(rawData);
  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        {ToastedMessage([message])}
        <PageTitle>{t(PAGE_NAME)}</PageTitle>
        <ServiceToolbar isLoading={isLoading} />
        <Modal />
        <ServicesTable row={filteredList} />
      </Box>
    </React.Fragment>
  );
}
