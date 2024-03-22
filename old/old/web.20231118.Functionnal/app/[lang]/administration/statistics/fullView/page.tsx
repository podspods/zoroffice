'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationStatisticsFullView({params}: {params: {lang: string}}) {
  const route = '/views/statistics/details';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
