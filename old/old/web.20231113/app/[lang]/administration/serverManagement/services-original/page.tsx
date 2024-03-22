'use client';

import React from 'react';
import CustomIframe from '../../../../../components/CustomIframe';


export default function AdministrationServerManagementServices({params}: {params: {lang: string}}) {
  const route = '/views/advancedConfiguration/services';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
