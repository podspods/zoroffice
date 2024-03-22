'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function TranslationToolText({params}: {params: {lang: string}}) {
  const route = '/views/translationTools/text';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
