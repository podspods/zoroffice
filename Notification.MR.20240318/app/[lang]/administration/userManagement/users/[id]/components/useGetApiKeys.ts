import useSWR from 'swr';
import Apis from 'utils/apis';
import {User} from '@systran/react-components/lib/userManagement/Users/userType'

export default function useGetApiKeys(user: User) {
  const { data, isLoading, mutate } = useSWR(Apis.user.listApiKeys({userId: user.id}));
  return { data, isLoading, mutate };
}
