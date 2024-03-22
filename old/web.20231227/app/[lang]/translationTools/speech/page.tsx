'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function TranslationToolSpeech({params}: {params: {lang: string}}) {
  const route = '/views/translationTools/speech';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
