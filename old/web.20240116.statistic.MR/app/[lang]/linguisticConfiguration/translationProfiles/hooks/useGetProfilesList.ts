// will remove when using new remote table
import {useState} from 'react';
import useSWR from 'swr';
import Apis, {EleFilters, formatEleFilters} from '@/utils/apis';

export type ProfilesListState = {
  limit?: number;
  skip?: number;
  sortName?: string;
  sortOrder?: string;
  eleFilters: EleFilters;
};
type ServiceData = {
  profileId: string;
  selectors?: {
    owner?: string;
    domain?: string;
    size?: string;
    tech?: {
      type?: string;
    };
  };
  translationResource?: {
    id: string;
    name: string;
  };
};
type RawData = {
  services?: ServiceData[];
  total?: number;
};

function formatActiveProfiles(data: RawData) {
  return {
    items:
      data?.services?.map?.((elem: ServiceData) => {
        return {
          key: elem.profileId,
          _selectorsOwner: elem.selectors?.owner,
          _selectorsDomain: elem.selectors?.domain,
          _selectorsSize: elem.selectors?.size,
          _selectorsTechType: elem.selectors?.tech?.type,
          _translationResourceId: elem.translationResource?.id,
          _translationResourceName: elem.translationResource?.name,
          ...elem
        };
      }) || [],
    total: data?.total || 0
  };
}

export default function useGetProfilesList() {
  const [options, setOptions] = useState<ProfilesListState>({
    limit: 5,
    skip: 0,
    sortName: 'insertionTime',
    sortOrder: 'desc',
    eleFilters: {
      deactivated: undefined,
      running: undefined,
      service: undefined,
      translationResource: undefined,
      owner: undefined,
      domain: undefined,
      size: undefined,
      techno: undefined,
      sharingStatus: undefined,
      lps: undefined
    }
  });

  const queryParams = formatEleFilters(options.eleFilters);
  queryParams.append('limit', `${options.limit ?? 10}`);
  queryParams.append('skip', `${options.skip ?? 0}`);
  if (options.sortName) {
    queryParams.append('sortName', options.sortName);
    // queryParams.append('sortOrder', options.sortOrder);
  }

  const result = useSWR(Apis.profiles.getListActivedProfile(`${queryParams}`));

  // const setSearchQuery = (searchQuery: EleFilters): void => {
  //   const eleFilters: EleFilters = {};
  //   for (const key in searchQuery) {
  //     if (searchQuery[key]) {
  //       if (typeof searchQuery[key] === 'boolean') {
  //         eleFilters[key] = [searchQuery[key]];
  //       }
  //       else {
  //         eleFilters[key] = [searchQuery[key] as string];
  //       }
  //     }
  //   }
  //   setOptions((prev) => ({...prev, eleFilters}));
  // };

  return {
    ...result,
    data: formatActiveProfiles(result.data),
    options,
    setOptions
    // setSearchQuery
  };
}
