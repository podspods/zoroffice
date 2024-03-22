'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationServerManagementQueues({params}: {params: {lang: string}}) {
  const route = '/views/advancedConfiguration/queues';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
