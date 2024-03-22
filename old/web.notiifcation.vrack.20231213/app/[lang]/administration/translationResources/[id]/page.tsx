'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function AdministrationTranslationResourcesId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/advancedConfiguration/translationResources/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
