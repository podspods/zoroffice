'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import FilePostEditorLayout from './components/FilePostEditorLayout';


export default function TranslationToolFileId({params}: {params: {id: string, lang: string}}) {
  const hasFilePostEditorPermission = userAuthorizations.check((actions as any).TRSL_FILE_PE);

  if (!hasFilePostEditorPermission)
    return null;

  return (<FilePostEditorLayout params={params} />);
}


