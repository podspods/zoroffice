'use client';

import userAuthorizations from '../../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../../lib/permissionsList';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import DictionaryEditor from './DictionaryEditor';

export default function LinguisticConfigurationResourcesDictionaryID({params}: {params: {id: string, lang: string}}) {

  const hasDictPermission = userAuthorizations.check((actions as any).RSC_DICT);

  if (!hasDictPermission)
    return null;


  return (
    <TemporaryPageBox>
      <DictionaryEditor params={params} />
    </TemporaryPageBox>
  );
}
