import React from 'react';
import TranslationResourcesHeader from './TranslationResourcesHeader';
import {TranslationResourcesContextProvider} from '../context/TranslationResourcesContext';
import TranslationResourcesTable from './TranslationResourcesTable';

export default function TranslationResourcesContainer() {
  return (
    <TranslationResourcesContextProvider>
      <TranslationResourcesHeader />
      <TranslationResourcesTable />
    </TranslationResourcesContextProvider>
  );
}
