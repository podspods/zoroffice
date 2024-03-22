'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AuthLocal({params}: {params: { lang: string }}) {
  const route = '/auth/local';
  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
