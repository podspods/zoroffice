'use client';

import React from 'react';
import { StandardPage } from './style/notification.style';
import ApiFetch from './components/ApiFetch';

export default function Notifications({
  params
}: {
  params: { lang: string };
}) {
  return (
    <React.Fragment>
      <StandardPage>
        <ApiFetch />
      </StandardPage>

    </React.Fragment>
  );
}


