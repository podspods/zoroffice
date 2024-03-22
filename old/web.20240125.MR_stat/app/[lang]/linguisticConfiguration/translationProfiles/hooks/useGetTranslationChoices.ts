import useSWR from 'swr';
import Apis from '@/utils/apis';

export default function useGetTranslationChoices() {
  const result = useSWR(Apis.profiles.getTranslationChoices);
  return result;
}
