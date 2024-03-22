'use client';

import React, {useState} from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import userAuthorizations from '../../../../../../../lib/userAuthorizations'; // TO CHECK
import {actions} from '../../../../../../../lib/permissionsList'; // TO CHECK
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/Table';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';
import Details from '../components/Details';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import { TitleTooltip } from '@/components/PageTitle';
import EditorTable, {Segment } from './components/EditorTable';

export default function TranslationToolFileId({params}: {params: {id: string, lang: string}}) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const [target, setTarget] = useState<string | undefined>(undefined);

  const setTargetSelector = (languages: string | null) => {
    setTarget(languages && languages.replace(/-/g, '_') || undefined); // in URL we want need the lang to use "_"
  };

  const hasTMEditorPermission = userAuthorizations.check((actions as any).RSC_TM_ALL);

  if (!hasTMEditorPermission)
    return null;

  const { data: fileInformations, isLoading: infosIsLoading } = useSWRImmutable(Apis.corpus.details({id: params.id}), {onSuccess: (fileInformations) => setTarget(fileInformations?.targetLanguages[0])});

  const additionalParams = !target ? {} : {
    additionalParams: {
      tgtLanguage: target
    }
  };

  const useRefresh = useRefreshBuilder({
    route: Apis.corpus.segment.list({id: params.id }),
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        skip: 'iDisplayStart',
        limit: 'iDisplayLength'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      },
      ...additionalParams
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'segments',
      totalRowCountField: 'iTotalRecords'
    }
  });

  const {rows, mutate, isValidating, loading, ...remoteHooksData} = useRemoteHooks<Segment>({useRefresh, refreshRate: 'Never'});


  const detailsTooltip = <Details source={fileInformations?.sourceLanguage || ''} />;

  if (infosIsLoading) {
    return <SkeletonContent />; // TODO: implement a real skeletonContent for Array Page ...
  }

  return (
    <TemporaryPageBox>
      <TitleTooltip titleName={fileInformations.filename.replace(/^\//, '')} tooltipContent={detailsTooltip} />
      <EditorTable
        {...remoteHooksData}
        mutate={mutate}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
        isLoading={loading}
        isValidating={isValidating}
        fileSegmented={rows}
        fileInformations={fileInformations}
        targetLanguage={target ?? null}
        setTargetLanguage={setTargetSelector}
      />
    </TemporaryPageBox>
  );
}
