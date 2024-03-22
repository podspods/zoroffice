'use client';

import PageTitle from '@/components/PageTitle';
import {useTranslation} from 'react-i18next';
import TranslationResourcesContainer from './components/TranslationResourcesContainer';
import {check} from '@/components/UserAuthorizations';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

export default function AdministrationTranslationResources() {
  const {t} = useTranslation();
  const hasAdminPermission = check('admin');

  if (!hasAdminPermission) {
    return null;
  }

  return (
    <TemporaryPageBox>
      <PageTitle>{t('Translation Resources')}</PageTitle>
      <TranslationResourcesContainer />
    </TemporaryPageBox>
  );
}
