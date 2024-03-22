'use client';

import PageTitle from '@/components/PageTitle';
import {Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
import TranslationResourcesContainer from './components/TranslationResourcesContainer';
import {check} from '@/components/UserAuthorizations';

export default function AdministrationTranslationResources() {
  const {t} = useTranslation();
  const hasAdminPermission = check('admin');

  if (!hasAdminPermission) {
    return null;
  }

  return (
    <Box style={{width: '100%', padding: '2rem'}}>
      <PageTitle>{t('Translation Resources')}</PageTitle>
      <TranslationResourcesContainer />
    </Box>
  );
}
