'use client';

import userAuthorizations from '../../../../../../../lib/userAuthorizations'; // TO CHECK
import {actions} from '../../../../../../../lib/permissionsList'; // TO CHECK
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import TranslationMemoryEditorId from './translationMemoryEditor';

export default function TranslationMemoryId({params}: {params: {id: string, lang: string}}) {

  const hasTMEditorPermission = userAuthorizations.check((actions as any).RSC_TM_ALL);

  if (!hasTMEditorPermission)
    return null;


  return (

    <TemporaryPageBox>
      <TranslationMemoryEditorId params={params} />
    </TemporaryPageBox>
  );
}
