'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationServerManagementRoutes({params}: {params: {lang: string}}) {
  const route = '/views/advancedConfiguration/routes';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
