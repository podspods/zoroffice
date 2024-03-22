import useSWR, {SWRResponse} from 'swr';
import Apis from '@/utils/apis';
import {formatLPs} from '@systran/react-components/lib/atoms/languageSelectUtils';

export default function useGetLps(props: {sourceSelected: string}) {
  const result: SWRResponse = useSWR(Apis.profiles.getLanguagePair({onlyRunning: true}));
  let sourceList: Array<{label: string; value: string | number}> = [];
  let targetList: Array<{label: string; value: string | number}> = [];

  const fillSourceLanguage = () => {
    sourceList = formatLPs(result.data, 'source');
  };
  const fillTargetLanguage = () => {
    targetList = formatLPs(result.data, 'target');
    const filteredTarget = result.data.filter((targetItem: {source: string}) => {
      return targetItem.source === props.sourceSelected;
    });
    targetList = formatLPs(filteredTarget, 'target');
  };

  if (Array.isArray(result.data) && !result.error) {
    fillSourceLanguage();
    fillTargetLanguage();
  }

  return {...result, sourceList, targetList, fillTargetLanguage};
}
