import Apis from '@/utils/apis';
import {allSettledFetcher} from '@/utils/fetcher';
import useSWR, {SWRResponse} from 'swr';

// for the options to filter table
const apiEndpoints = [Apis.translationResources.getStatus, Apis.translationResources.getTechnos, Apis.translationResources.getOwners, Apis.translationResources.getDomains];

const getData = (response?: {status?: string; value?: {types?: Array<string>}}) => {
  if (response?.status === 'fulfilled') {
    return response.value?.types;
  }
  return [];
};

export default function useGetOptionsForFiltering() {
  const {data, error} = useSWR(apiEndpoints, allSettledFetcher, {revalidateOnFocus: true});

  return {
    data: {
      dataStatus: getData(data?.[0]),
      dataTechnos: getData(data?.[1]),
      dataOwners: getData(data?.[2]),
      dataDomain: getData(data?.[3])
    },
    error,
    isLoading: !data && !error
  };
}
