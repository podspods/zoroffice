'use client';

import React, {useState} from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import PostEditorTable from './components/PostEditorTable';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';


export default function TranslationToolFileId({params}: {params: {id: string, lang: string}}) {
  const hasFilePostEditorPermission = userAuthorizations.check((actions as any).TRSL_FILE_PE);

  if (!hasFilePostEditorPermission)
    return null;

  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);

  const { data: fileTranslated, isLoading, isValidating, mutate } = useSWR(Apis.filePostEditor.translation(params.id));
  const { data: fileInformations, isLoading: infosIsLoading } = useSWRImmutable(Apis.filePostEditor.fileInfo(params.id));

  if (isLoading || infosIsLoading)
    return <SkeletonContent />;

  return (
    <PostEditorTable
      refreshInterval={refreshInterval}
      setRefreshInterval={setRefreshInterval}
      isLoading={isLoading}
      isValidating={isValidating}
      fileTranslated={fileTranslated.sentences}
      fileInformations={fileInformations}
      mutate={mutate}
    />
  );
}
