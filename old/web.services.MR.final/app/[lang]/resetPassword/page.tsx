'use client';

import React from 'react';
import CustomIframe from '../../../components/CustomIframe';


export default function ResetPassword({params}: {params: {lang: string}}) {
  const route = '/views/resetPassword';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
