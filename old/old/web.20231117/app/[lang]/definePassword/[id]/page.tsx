'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function DefinePasswordId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/definePassword/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
