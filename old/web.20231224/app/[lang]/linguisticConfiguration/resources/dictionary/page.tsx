'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesDictionary({params}: {params: {lang: string}}) {
  const route = '/views/resourcesManagement/dictionary';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
