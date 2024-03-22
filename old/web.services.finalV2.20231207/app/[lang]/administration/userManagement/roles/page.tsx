'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationUserManagementRoles({params}: {params: {lang: string}}) {
  const route = '/views/administration/roles';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
