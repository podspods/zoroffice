import useSWR from 'swr';
import Apis from '@/utils/apis';
import {formatLPs} from '@systran/react-components/lib/atoms/languageSelectUtils';

type TData = Array<{source: string; target: string}>;

export default function useGetLps(props: {sourceSelected: string}) {
  const {data = [], ...response} = useSWR<TData>(Apis.profiles.getLanguagePair({onlyRunning: true}));
  let sourceList: Array<{label: string; value: string | number}> = [];
  let targetList: Array<{label: string; value: string | number}> = [];

  const fillSourceLanguage = () => {
    sourceList = formatLPs(data, 'source');
  };
  const fillTargetLanguage = () => {
    targetList = formatLPs(data, 'target');
    const filteredTarget = data.filter((targetItem: {source: string}) => {
      return targetItem.source === props.sourceSelected;
    });
    targetList = formatLPs(filteredTarget, 'target');
  };

  if (Array.isArray(data) && !response.error) {
    fillSourceLanguage();
    fillTargetLanguage();
  }

  return {...response, data, sourceList, targetList, fillTargetLanguage};
}
