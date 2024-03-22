'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function AdministrationServerManagementRoutesId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/advancedConfiguration/routes/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
