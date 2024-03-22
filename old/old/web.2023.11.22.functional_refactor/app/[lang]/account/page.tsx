'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function Account({params}: {params: {lang: string}}) {
  const route = '/views/user';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
