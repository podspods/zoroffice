'use client';

import React, {useEffect, useState} from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks, GridFilterModel, GridFilterItem} from '@systran/react-components/lib/organisms/Table/Table';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';
import Details from '../../../components/Details';
import { TitleTooltip } from '@/components/PageTitle';
import EditorTable, { DictEntry } from './components/EditorTable';

type FileInformations = {
  id: string;
  name: string;
  srcLang: string;
  tgtLangs: string;
  type: 'UD';
  comments: string;
  targets?: string[];
  accountId: string;
};


export default function DictionaryEditor({params}: {params: {id: string, lang: string}}) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const [target, setTarget] = useState<string | undefined>(undefined);

  const setTargetSelector = (languages: string | null) => {
    setTarget(languages?.replace(/-/g, '_') || undefined); // in URL we want need the lang to use _
  };


  const { data: listDict = {data: []}, isLoading: infosIsLoading } = useSWRImmutable<{data: FileInformations[]}>(Apis.dictionary.list({type: 'UD'}), {
    shouldRetryOnError: true,
    errorRetryCount: 3
  });

  const fileInformations = listDict.data.find((item) => item.id === params.id);
  const targets = fileInformations?.tgtLangs.split(',') || null;

  const additionalParams = {
    'dict[dictId]': params.id,
    'dict[srcLang]': fileInformations?.srcLang || '',
    'dict[multiTgtLangs]': (targets?.length || 0) > 1,
    ...(!!target && { 'dict[tgtLang]': target }),
    'columns[0][data]': 'src',
    'columns[1][data]': 'pos',
    'columns[2][data]': 'tgt',
    'columns[3][data]': 'priority',
    'columns[4][data]': 'comments',
    'columns[5][data]': 'confidence'
  };

  const useRefresh = useRefreshBuilder({
    route: Apis.dictionary.entry.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        skip: 'start',
        limit: 'length'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      },
      additionalParams
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'data',
      totalRowCountField: 'recordsTotal'
    }
  });

  const {rows, mutate, isValidating, loading, ...remoteHooksData} = useRemoteHooks<DictEntry>({useRefresh, refreshRate: 'Never'});

  if (infosIsLoading || !listDict) {
    return <SkeletonContent />; // TODO: implement a real skeletonContent for Array Page ...
  }

  if (!fileInformations) {
    return 'DICT do not exist'; // TODO: replace later
  }

  const detailsTooltip = <Details source={fileInformations.srcLang} />;
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TitleTooltip titleName={fileInformations.name} tooltipContent={detailsTooltip} />
      </div>
      <EditorTable
        {...remoteHooksData}
        mutate={mutate}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
        isLoading={loading}
        isValidating={isValidating}
        fileDictEntries={rows}
        fileInformations={fileInformations}
        targetLanguage={target || targets?.[0] || null}
        setTargetLanguage={setTargetSelector}
      />
    </>
  );
}
