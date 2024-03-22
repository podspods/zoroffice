'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationTranslationResources({params}: {params: {lang: string}}) {
  const route = '/views/advancedConfiguration/translationResources';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
