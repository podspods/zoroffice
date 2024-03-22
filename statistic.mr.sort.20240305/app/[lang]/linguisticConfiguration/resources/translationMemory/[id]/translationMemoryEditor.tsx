'use client';

import React, {useState} from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks, GridFilterModel, GridFilterItem} from '@systran/react-components/lib/organisms/Table/Table';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';
import Details from '../components/Details';
import { TitleTooltip } from '@/components/PageTitle';
import EditorTable, {Segment } from './components/EditorTable';

export default function TranslationMemoryEditorId({params}: {params: {id: string, lang: string}}) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [targetFilter, setTargetFilter] = useState<string | undefined >(undefined);
  const [sourceFilter, setSourceFilter] = useState<string | undefined >(undefined);


  const setTargetSelector = (languages: string | null) => {
    setTarget(languages && languages.replace(/-/g, '_') || undefined); // in URL we want need the lang to use "_"
  };

  const { data: fileInformations, isLoading: infosIsLoading } = useSWRImmutable(Apis.corpus.details({id: params.id}), {
    onSuccess: (fileInformations) => setTarget(fileInformations?.targetLanguages[0]),
    shouldRetryOnError: true,
    errorRetryCount: 3
  });

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    const { items } = filterModel;
    setTargetFilter(items.find((item: GridFilterItem) => item.field === 'target')?.value);
    setSourceFilter(items.find((item: GridFilterItem) => item.field === 'source')?.value);
  }, []);

  const additionalParams = !target ? {} : {
    additionalParams: {
      tgtLanguage: target,
      ...(sourceFilter && { sSearch_1: sourceFilter }),
      ...(targetFilter && { sSearch_2: targetFilter })
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

  if (infosIsLoading || !fileInformations) {
    return <SkeletonContent />; // TODO: implement a real skeletonContent for Array Page ...
  }
  const detailsTooltip = <Details source={fileInformations.sourceLanguage} />;

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TitleTooltip titleName={fileInformations.filename.replace(/^\//, '')} tooltipContent={detailsTooltip} />
      </div>
      <EditorTable
        {...remoteHooksData}
        mutate={mutate}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
        isLoading={loading}
        isValidating={isValidating}
        fileSegmented={rows}
        onFilterModelChange={onFilterChange}
        fileInformations={fileInformations}
        targetLanguage={target ?? null}
        setTargetLanguage={setTargetSelector}
      />
    </>
  );
}
