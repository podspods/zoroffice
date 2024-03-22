'use client';

import React from 'react';
import useSWR from 'swr';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';

import PageTitle from '@/components/PageTitle';
import { serviceRoute } from '@/components/Services/type';
import { ERROR, LOADING, PAGE_NAME } from '@/components/Services/constant';
import {
  loadService,
  mutateAsked,
  setDataReady,
  servicesStore
} from '@/components/Services/store';
import ServicesTable from '@/components/Services/ServicesTable';
import ServiceToolbar from '@/components/Services/components/ServiceToolbar';
import Modal from '@/components/Services/modal/Modal';
import IsLoading from '@/components/Isloading';
import OnError from '@/components/OnError';

export default function AdministrationServerManagementServices() {
  const { refreshAsked, filteredList, refreshRate } = useStore(servicesStore);
  const { t } = useTranslation();

  const { data: rawData, error, isLoading, mutate } = useSWR(
    serviceRoute.LIST,
    {
      refreshInterval: refreshRate * 1000,
      onSuccess: () => setDataReady(),
      onError: (swrErr: Error) =>
        OnError({
          onError: !!swrErr as boolean,
          label: `Error useSWR on ${serviceRoute.LIST}: ${swrErr.message}`
        })
    }
  );

  if (refreshAsked) {
    mutateAsked();
    void mutate();
  }
  IsLoading({ isLoading: isLoading, label: LOADING });
  OnError({ onError: error, label: `${ERROR} : error.message`});

  loadService(rawData);
  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        <PageTitle>{t(PAGE_NAME)}</PageTitle>
        <ServiceToolbar isLoading={isLoading} />
        <Modal />
        <ServicesTable row={filteredList} />
      </Box>
    </React.Fragment>
  );
}
