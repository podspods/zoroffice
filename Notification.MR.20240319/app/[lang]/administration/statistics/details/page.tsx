'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import { useTranslation } from 'react-i18next';
import PageTitle from '@/components/PageTitle';
import FullViewPage from './components/FullViewPage';

export default function StatisticDetail() {
  const { t} = useTranslation();
  if (!userAuthorizations.check((actions as any).ADMIN_STATS)) return <></>;

  return (
    <TemporaryPageBox>
      <PageTitle>{t('Full View Statistics')}</PageTitle>
      <FullViewPage />
    </TemporaryPageBox>
  );
}
