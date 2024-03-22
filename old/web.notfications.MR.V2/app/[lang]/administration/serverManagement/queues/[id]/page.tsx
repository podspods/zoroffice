'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function AdministrationServerManagementQueuesId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/advancedConfiguration/queues/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
