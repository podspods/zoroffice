'use client';

import React from 'react';
import CustomIframe from '../../../../components/CustomIframe';


export default function InformationEdit({params}: {params: {lang: string}}) {
  const route = '/views/information/edit';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
