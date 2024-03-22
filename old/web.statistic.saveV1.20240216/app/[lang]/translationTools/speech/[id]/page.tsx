'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function TranslationToolSpeechId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/translationTools/speech/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
