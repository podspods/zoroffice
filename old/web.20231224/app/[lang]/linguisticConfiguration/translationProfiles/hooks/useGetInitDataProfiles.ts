import useSWR, {SWRResponse} from 'swr';
import {allSettledFetcher} from '@/utils/fetcher';
import Apis from '@/utils/apis';

const apiEndpoints = [
  // for the options to filter table
  Apis.profilesLps,
  Apis.profilesOwner,
  Apis.profilesDomain,
  Apis.profilesSize,
  Apis.profilesTechno,
  // for the actions of table
  Apis.getCoversPivotProfile,
  // for the NFA option
  Apis.getEnabledProfilesNFA
];

const getData = (response?: {status?: string; value?: {types?: Array<string>}}) => {
  if (response?.status === 'fulfilled') {
    return response.value?.types;
  }
  return [];
};

/**
 * get options to table filtering, coversPivotProfile and NFA option
 */
function useGetInitDataProfiles() {
  const {data, error}: SWRResponse = useSWR(apiEndpoints, allSettledFetcher, {revalidateOnFocus: false});

  return {
    data: {
      dataLps: getData(data?.[0]),
      dataOwner: getData(data?.[1]),
      dataDomain: getData(data?.[2]),
      dataSize: getData(data?.[3]),
      dataTechno: getData(data?.[4]),
      coversPivot: data?.[5].value,
      enabledProfilesNFA: data?.[6].value
    },
    error,
    isLoading: !data && !error
  };
}

export default useGetInitDataProfiles;
