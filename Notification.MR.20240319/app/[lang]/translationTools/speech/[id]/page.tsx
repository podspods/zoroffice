'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import PostEditorLayout from '../../components/PostEditorLayout';
import ModeProvider from '../../components/context/PostEditorContext';


export default function TranslationToolSpeechId({params}: {params: {id: string, lang: string}}) {
  const hasFilePostEditorPermission = userAuthorizations.check((actions as any).TRSL_SPEECH_PE);

  if (!hasFilePostEditorPermission)
    return null;

  return (
    <ModeProvider initialMode={'speech'}>
      <PostEditorLayout params={params} />
    </ModeProvider>
  );
}
