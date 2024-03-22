import useSWR from 'swr';
import Apis from '@/utils/apis';

export default function useGetUserConnected() {
  const result = useSWR(Apis.userRoles, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onError: (err) => console.error('Error fetching permissions:', err) // eslint-disable-line
  });
  return result;
}
