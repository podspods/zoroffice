'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationTranslationProfiles({params}: {params: {lang: string}}) {
  const route = '/views/profilesManagement';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
