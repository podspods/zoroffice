'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function MonitoringTranslationReviews({params}: {params: {lang: string}}) {
  const route = '/views/feedbacks/search';

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
