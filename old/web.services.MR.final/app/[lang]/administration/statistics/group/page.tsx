'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationStatisticsGroup({params}: {params: {lang: string}}) {
  const route = '/views/statistics/group';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
