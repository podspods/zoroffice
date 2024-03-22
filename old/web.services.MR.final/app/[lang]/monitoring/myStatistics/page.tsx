'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function MonitoringMyStatistics({params}: {params: {lang: string}}) {
  const route = '/views/statistics/personal';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
