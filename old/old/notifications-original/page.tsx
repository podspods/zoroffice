'use client';

import React from 'react';
import CustomIframe from '../../../components/CustomIframe';


export default function Notifications({params}: {params: {lang: string}}) {
  const route = '/views/notifications';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
