'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesTranslationMemory({params}: {params: {lang: string}}) {
  const route = '/views/resourcesManagement/translationMemory';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
