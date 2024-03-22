import useSWR from 'swr';
import Apis from '@/utils/apis';

export default function useGetEntityRules() {
  const result = useSWR(Apis.getEntityRules);
  return result;
}
