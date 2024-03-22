'use client';

import React from 'react';
import CustomIframe from '@/components/CustomIframe';


export default function AdministrationServerManagementServices({params}: {params: {lang: string}}) {
  const route = '/views/advancedConfiguration/services';

  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        <PageTitle>{t(PAGE_NAME)}</PageTitle>
        <ServiceToolbar isLoading={isLoading} />
        <Modal />
        <ServicesTable rows={filteredList} />
      </Box>
    </React.Fragment>
  );
}
