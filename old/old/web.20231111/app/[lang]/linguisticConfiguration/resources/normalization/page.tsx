'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesNormalization({params}: {params: {lang: string}}) {
  const route = '/views/resourcesManagement/normalization';
  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
