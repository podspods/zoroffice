'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationUserManagementGroups({params}: {params: {lang: string}}) {
  const route = '/views/administration/groups';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
