'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function TranslationToolFile({params}: {params: {lang: string}}) {
  const route = '/views/translationTools/file';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
