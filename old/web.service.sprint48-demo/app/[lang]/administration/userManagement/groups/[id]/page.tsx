'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function AdministrationUserManagementGroupsId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/groups/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
