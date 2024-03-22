'use client';

import { useTranslation } from 'react-i18next';
import PageTitle from '@/components/PageTitle';
import userAuthorizations from '../../../../../lib/userAuthorizations';
import { actions } from '../../../../../lib/permissionsList';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import PersonalStatisticTable from './components/PersonalStatisticTable';

export default function PersonalStatistic() {
  const { t } = useTranslation();
  if (!userAuthorizations.check((actions as any).USER_PERSONAL_STATS)) return <></>;
  return (
    <TemporaryPageBox>
      <PageTitle>{t('My Statistics')}</PageTitle>
      <PersonalStatisticTable />
    </TemporaryPageBox>
  );
}
