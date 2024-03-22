'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesTranslationMemoryId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/resourcesManagement/translationMemory/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
