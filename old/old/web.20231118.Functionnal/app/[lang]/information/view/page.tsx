'use client';

import React from 'react';
import CustomIframe from '../../../../components/CustomIframe';


export default function InformationView({params}: {params: {lang: string}}) {
  const route = '/views/information/view';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
