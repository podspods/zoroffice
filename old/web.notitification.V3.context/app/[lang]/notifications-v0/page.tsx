'use client';

import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

import PageTitle from '@/components/PageTitle';
import { NotificationsContext } from './NotificationsContext';
import NotificationsToolbar from './NotificationsToolbar';
import NotificationsTable from './NotificationsTable';
import { CounterProvider, useCounter, CounterContext } from './useCounter';
import CounterComponent from './CounterComponent';

export default function MonitoringNotificationsReviews() {
  const { t } = useTranslation();
  const { count } = useCounter();
  return (
    <CounterProvider>
      <p>page :[{count}]</p>
      <CounterComponent />
      <Container style={{ height: 400, width: '100%' }}>
        <Box>
          <PageTitle>{t('Notifications')}</PageTitle>

          {/* <NotificationsToolbar />
          <NotificationsTable /> */}
        </Box>
      </Container>
    </CounterProvider>
  );
}

const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;
