'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function LinguisticConfigurationResourcesDictionaryId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/resourcesManagement/dictionary/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
