import Apis from 'utils/apis';
import {commonFetch} from 'utils/fetcher';
import {Dictionaries, Engine, FilterOptions, FlowProfile, GenericOptions, LinguisticOptions, Normalizations, Selectors} from '../context/TranslationProfilesAddContext';

export type RequestDataCreate = {
  enabledNFA?: boolean;
  deactivated?: boolean;
  noCache?: boolean;
  genericOptions?: GenericOptions;
  profileId?: string | null;
  profileName?: string;
  public?: boolean;
  selectors?: Selectors;
  serviceName?: string;
  source?: string;
  target?: string;
  resources?: {engine?: Engine; userDict?: Dictionaries; normalization?: Normalizations; translationMemory?: {corpusIds?: Array<string>}};
  groups?: string[];
  users?: string[];
  filterOptions?: FilterOptions;
  flowProfile?: FlowProfile;
};
export type RequestDataEdit = {
  source?: string;
  target?: string;
  profileName?: string;
  filterOptions?: FilterOptions;
  linguisticOptions?: LinguisticOptions;
  selectors?: Selectors;
  resources?: {engine?: Engine; userDict?: Dictionaries; normalization?: Normalizations; translationMemory?: {corpusIds?: Array<string>}};
  noCache?: boolean;
  enabledNFA?: boolean;
  profileId?: string;
  routeProfileId?: string;
  genericOptions?: GenericOptions;
};
export const PostApi = {
  createProfile: async (data: RequestDataCreate) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    return commonFetch(Apis.profiles.createProfile, header);
  },
  activateProfiles: async ({profileId, sesProfileId}: {profileId: string; sesProfileId: string}) => {
    const header = {
      method: 'POST',
      body: JSON.stringify({
        profileId: profileId,
        sesProfileId: sesProfileId,
        deactivated: false
      })
    };
    return commonFetch(Apis.profiles.deactivateProfiles, header);
  },
  deactivateProfiles: async ({profileId, sesProfileId}: {profileId: string; sesProfileId: string}) => {
    const header = {
      method: 'POST',
      body: JSON.stringify({
        profileId: profileId,
        sesProfileId: sesProfileId,
        deactivated: true
      })
    };
    return commonFetch(Apis.profiles.deactivateProfiles, header);
  },
  deleteProfiles: async ({profileId, service}: {profileId: string; service: string}) => {
    const header = {
      method: 'POST',
      body: JSON.stringify({
        profileId: profileId,
        service: service
      })
    };
    return commonFetch(Apis.profiles.deleteProfiles, header);
  },
  updateProfile: async (data: unknown) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    return commonFetch(Apis.profiles.updateProfile, header);
  },
  editProfile: async (data: RequestDataEdit) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    return commonFetch(Apis.profiles.editProfile, header);
  }
};
