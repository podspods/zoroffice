'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function TranslationToolFileId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/translationTools/file/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
