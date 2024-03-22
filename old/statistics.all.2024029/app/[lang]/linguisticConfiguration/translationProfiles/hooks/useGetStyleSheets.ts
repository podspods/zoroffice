import useSWR from 'swr';
import Apis from '@/utils/apis';

export default function useGetStyleSheets() {
  const result = useSWR(Apis.profiles.getStyleSheets);
  return result;
}
