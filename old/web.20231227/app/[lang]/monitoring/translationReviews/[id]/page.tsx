'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';

export default function MonitoringTranslationReviewsId({params}: {params: {id: string, lang: string}}) {
  const route = '/views/feedbacks/view/' + params.id;

  return (
    <CustomIframe route={route} lang={params.lang} />
  );
}
