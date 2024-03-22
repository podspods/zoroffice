'use client';

import React, { useEffect, useState } from 'react';
import StandardFetch from './SwrFetch';
import { StandardPage } from './components/StandardPage';
import SwrFetch from './SwrFetch';

const myUrl = 'http://localhost:3500/notifications';

export default function Notifications({
  params
}: {
  params: { lang: string };
}) {
  return (
    <React.Fragment>
      <StandardPage>
        {/* <StandardFetch /> */}
        <SwrFetch />
      </StandardPage>

    </React.Fragment>
  );
}
