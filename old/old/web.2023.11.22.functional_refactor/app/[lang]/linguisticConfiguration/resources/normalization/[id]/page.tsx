'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesNormalizationId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/resourcesManagement/normalization/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
