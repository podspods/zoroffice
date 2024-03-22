'use client';

import { useSearchParams } from 'next/navigation';
import TranslationMemoryListTable from './components/TranslationMemoryListTable';

export default function LinguisticConfigurationResourcesTranslationMemory() {
  const currentDirectory = useSearchParams().get('directory') || '/';

  return (
    <TranslationMemoryListTable currentDirectory={currentDirectory} />
  );
}
