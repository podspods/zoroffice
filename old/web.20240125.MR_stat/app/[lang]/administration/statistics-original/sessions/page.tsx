'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationStatisticsSession({params}: {params: {lang: string}}) {
  const route = '/views/statistics/session';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
