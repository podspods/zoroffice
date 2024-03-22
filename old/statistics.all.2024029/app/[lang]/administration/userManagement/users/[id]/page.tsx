'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function AdministrationUserManagementUsersId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/users/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
