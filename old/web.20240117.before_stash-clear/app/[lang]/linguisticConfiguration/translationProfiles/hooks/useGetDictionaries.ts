import useSWR from 'swr';
import uniqueId from 'lodash/uniqueId';
import Apis from '@/utils/apis';
import {Dictionaries, Dictionary} from '../context/TranslationProfilesAddContext';

function initDomainAndDictionaries(dicts: Dictionaries = [], dictArray: Dictionaries) {
  for (let i = 0, il = dicts.length; i < il; ++i) {
    const dictionary = dicts[i];
    if (!dictionary.domain.length) {
      dictionary.domain = ['General'];
    }
    dictionary.name = dictionary.dictName;
    dictArray.push(dictionary);
  }
}
function isUD(dict: Dictionary) {
  return dict.type !== 'NORM';
}
function isNorm(dict: Dictionary) {
  return dict.type === 'NORM';
}
function formatDict(dict: Dictionary) {
  dict.key = uniqueId();
  return dict;
}

export default function useGetDictionaries(props: {source: string; target: string}) {
  const {data: dictionariesData = {}, ...result} = useSWR(Apis.profiles.getDictionaries(props));
  const resultDictAndNormArray: Dictionaries = [];
  initDomainAndDictionaries(dictionariesData.dictionaries, resultDictAndNormArray);

  // const getLanguagePairs = () => {
  //   return props.source + props.target;
  // };

  const convertedData = {
    dictsList: resultDictAndNormArray.filter(isUD).map(formatDict),
    normsList: resultDictAndNormArray.filter(isNorm).map(formatDict)
  };

  return {
    ...result,
    data: convertedData
  };
}
