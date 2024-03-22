'use client';

import FeedbackEditor from './components/FeedbackEditor'

export default function MonitoringTranslationReviewsId({params}: {params: {id: string, lang: string}}) {
  return <FeedbackEditor params={params} />
}
