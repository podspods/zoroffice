'use client';

import Box from '@mui/material/Box';
import PageTitle from '@/components/PageTitle';
import {useTranslation} from 'react-i18next';
import {TranslationProfilesContextProvider} from './context/TranslationProfilesContext';
import TranslationProfilesContainer from './components/TranslationProfilesContainer';

export default function LinguisticConfigurationTranslationProfiles() {
  const {t} = useTranslation();
  return (
    <Box style={{width: '100%', padding: '2rem'}}>
      <PageTitle>{t('Translation Profiles')}</PageTitle>
      <TranslationProfilesContextProvider>
        <TranslationProfilesContainer />
      </TranslationProfilesContextProvider>
    </Box>
  );
}
