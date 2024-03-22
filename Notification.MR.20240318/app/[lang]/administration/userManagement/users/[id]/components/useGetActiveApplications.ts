import useSWR from 'swr';
import Apis from 'utils/apis';
import {User} from '@systran/react-components/lib/userManagement/Users/userType'

export default function useGetActiveApplications(user: User) {
  const {data, isLoading, mutate} = useSWR(Apis.user.getUserActiveTokens({userId: user.id}));
  return {data, isLoading, mutate};
}
