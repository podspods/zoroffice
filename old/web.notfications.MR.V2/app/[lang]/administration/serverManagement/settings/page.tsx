'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationServerManagementSettings({params}: {params: {lang: string}}) {
  const route = '/views/administration/settings';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
