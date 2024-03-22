'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationStatisticsUser({params}: {params: {lang: string}}) {
  const route = '/views/statistics/user';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
