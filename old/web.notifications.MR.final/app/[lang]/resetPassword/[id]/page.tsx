'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function ResetPasswordId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/resetPassword/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
