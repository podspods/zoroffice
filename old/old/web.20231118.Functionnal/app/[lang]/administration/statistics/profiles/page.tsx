'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationStatisticsProfiles({params}: {params: {lang: string}}) {
  const route = '/views/statistics/global';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}