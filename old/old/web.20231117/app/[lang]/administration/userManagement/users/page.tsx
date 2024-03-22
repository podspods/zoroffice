'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationUserManagementUsers({params}: {params: {lang: string}}) {
  const route = '/views/administration/users';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
