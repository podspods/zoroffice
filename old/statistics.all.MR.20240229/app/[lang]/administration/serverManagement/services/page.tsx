'use client';

import { useTranslation } from 'react-i18next';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import PageTitle from '@/components/PageTitle';
import ServiceTable from './components/ServiceTable';
import userAuthorizations from '../../../../../../lib/userAuthorizations';

export default function AdministrationServerManagementServices() {
  const { t } = useTranslation();
  if (!userAuthorizations.check('admin monitoring')) return <></>;
  return (
    <TemporaryPageBox>
      <PageTitle>{t('Service Status')}</PageTitle>
      <ServiceTable />
    </TemporaryPageBox>
  );
}
