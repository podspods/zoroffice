'use client';

import PageTitle from '@/components/PageTitle';
import {useTranslation} from 'react-i18next';
import {TranslationProfilesContextProvider} from './context/TranslationProfilesContext';
import TranslationProfilesContainer from './components/TranslationProfilesContainer';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

export default function LinguisticConfigurationTranslationProfiles() {
  const {t} = useTranslation();
  return (
    <TemporaryPageBox>
      <PageTitle>{t('Translation Profiles')}</PageTitle>
      <TranslationProfilesContextProvider>
        <TranslationProfilesContainer />
      </TranslationProfilesContextProvider>
    </TemporaryPageBox>
  );
}
