'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationServerManagementLicenses({params}: {params: {lang: string}}) {
  const route = '/views/administration/licenses';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
