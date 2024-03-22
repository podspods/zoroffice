'use client';

import React from 'react';
import CustomIframe from '../../../../components/CustomIframe';

export default function AuthLdap({params}: {params: { lang: string }}) {
  const route = '/auth/ldap';
  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
