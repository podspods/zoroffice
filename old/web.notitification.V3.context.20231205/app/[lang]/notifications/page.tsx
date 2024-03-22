'use client';

import React from 'react';
import { NotificationsContextProvider } from './useNotifications';
import Notifications from './Notifications';
import { Box } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

export default function MonitoringNotificationsReviews() {
  const { t } = useTranslation();
  return (
    <NotificationsContextProvider>
      <Container style={{ height: 400, width: '100%' }}>
        <Box>
          <PageTitle>{t('Notifications')}</PageTitle>
          <Notifications />
        </Box>
      </Container>
    </NotificationsContextProvider>
  );
}

const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;
