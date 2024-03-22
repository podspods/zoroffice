import useSWR from 'swr';
import Apis from '@/utils/apis';
import {useState} from 'react';
import {Selectors} from '../context/TranslationProfilesAddContext';

type Props = {source: string; target: string; onlyLastVersion: boolean};
type TData = {
  engines?: Array<{
    key: string;
    id: string;
    sortableVersion?: string;
    name?: string;
    techtype?: string;
    owner?: string;
    domain?: string;
    description?: {version: string; name: string};
    selectors?: Selectors;
  }>;
};

export default function useGetEngines({source, target, onlyLastVersion}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<number | 'Never'>('Never');
  const {data: enginesData = {}, ...result} = useSWR<TData>(Apis.profiles.getEngines({source, target, onlyLastVersion}), null, {
    refreshInterval: refreshInterval === 'Never' ? 0 : refreshInterval * 1000
  });

  const convertedData = enginesData.engines?.map((engine) => {
    engine.key = engine.id;
    engine.sortableVersion = engine.description?.version;
    engine.name = engine.description?.name;
    engine.techtype = engine.selectors?.tech?.type;
    engine.owner = engine.selectors?.owner;
    engine.domain = engine.selectors?.domain;
    return engine;
  }) || [];

  return {...result, data: convertedData, setRefreshInterval, refreshInterval};
}
