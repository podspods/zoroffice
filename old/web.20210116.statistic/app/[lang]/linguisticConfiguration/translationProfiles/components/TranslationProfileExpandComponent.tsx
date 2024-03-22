import {useState} from 'react';
import {KeyedMutator} from 'swr';
import {Box} from '@mui/material';
import TranslationProfilesProfileOptions from './TranslationProfilesProfileOptions';
import {PrimaryButton} from '@systran/react-components/lib/atoms/Buttons/Primary';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import {useTranslation} from 'react-i18next';
import {OptionsType, ProfileOnChangeOptionsType, ResourceOptions} from '../context/TranslationProfilesAddContext';
import {PostApi, RequestDataEdit} from './PostApi';
import {getProfilesPermission} from './TranslationProfilesContainer';
import {Profile} from './TranslationProfilesTable';

type TProps = {
  mutate: KeyedMutator<any>; // todo : set to KeyedMutator<Profile> when the react-components is fixed
  disabled: boolean;
  profileData: Profile;
};
type Message = {
  type: 'success' | 'error' | null;
  content: string;
};

const checkProfileOptions = (options: OptionsType) => {
  if (!options.profileName) {
    return {type: 'error', content: 'Missing Profile Name'} as Message;
  }

  if (options.resources?.engine !== 'v7' && !options.resources?.engine?.id && (!Array.isArray(options.flowProfile) || options.flowProfile.length === 0)) {
    return {type: 'error', content: 'Engine not selected'} as Message;
  }
  return undefined;
};
const generateDataToEdit = (profileData: Profile, profileOptions: OptionsType) => {
  const requestBody: RequestDataEdit = {};

  requestBody.enabledNFA = profileOptions.enabledNFA;
  requestBody.resources = {};
  requestBody.resources.engine = profileOptions.engineSelected || profileOptions.resources?.engine;
  requestBody.genericOptions = profileOptions.genericOptions;
  requestBody.noCache = profileOptions.noCache;
  requestBody.profileName = profileOptions.profileName;
  requestBody.selectors = profileOptions.selectors || {};
  requestBody.selectors.domain = profileOptions.domain || requestBody.selectors.domain;
  requestBody.source = profileOptions.source;
  requestBody.target = profileOptions.target;
  requestBody.resources = {};
  requestBody.resources.engine = profileOptions.engineSelected;
  requestBody.profileId = profileData.sesProfileId;
  requestBody.routeProfileId = profileData.profileId;
  requestBody.filterOptions = profileOptions.filterOptions;

  requestBody.resources.userDict =
    profileOptions.resourcesOptions?.dictionaries?.dictionaries.map((dictionary) => {
      return {
        id: dictionary.id,
        dictName: dictionary.dictName,
        domain: Array.isArray(dictionary.domain) ? dictionary.domain.join(',') : dictionary.domain
      };
    }) || [];
  requestBody.resources.normalization =
    profileOptions.resourcesOptions?.normalizations?.normalizations.map((normalization) => {
      return {
        id: normalization.id,
        dictName: normalization.dictName,
        domain: 'General'
      };
    }) || [];
  requestBody.resources.translationMemory = {
    corpusIds:
      profileOptions.resourcesOptions?.translationMemories?.translationMemories.map((translationMemory) => {
        return translationMemory.id;
      }) || []
  };

  return requestBody;
};

const getInitProfileOptionsData = (props: OptionsType) => {
  const dict =
    props.resources?.userDict?.map((dict) => {
      return {
        id: dict.id,
        dictName: dict.dictName,
        domain: typeof dict.domain === 'string' ? dict.domain.split(',') : dict.domain
      };
    }) || [];
  const tm =
    props.resources?.translationMemory?.corpusIds?.map((e) => {
      return {id: e};
    }) || [];

  const profileOptions: OptionsType = {
    ...props,
    engineSelected: props.resources?.engine,
    resourcesOptions: {
      dictionaries: {dictionaries: dict},
      normalizations: {normalizations: props.resources?.normalization || []},
      translationMemories: {translationMemories: tm}
    }
  };
  return profileOptions;
};

export default function TranslationProfileExpandComponent({disabled, profileData, mutate}: TProps) {
  const {t} = useTranslation();
  const isEngineV7 = profileData.profileOptions.resources.engine === 'v7';
  const [msg, setMsg] = useState<Message>({type: isEngineV7 ? 'error' : null, content: isEngineV7 ? 'This profile is not editable.' : ''});
  const [profileOptions, setProfileOptions] = useState<OptionsType>(getInitProfileOptionsData(profileData.profileOptions));

  const onEditProfile = () => {
    setMsg({type: null, content: ''});
    const error: Message | undefined = checkProfileOptions(profileData.profileOptions);
    if (error) {
      setMsg(error);
      return;
    }
    handleEditProfile();
  };

  const handleEditProfile = async () => {
    try {
      const bodyData = generateDataToEdit(profileData, profileOptions);
      const result = await PostApi.editProfile(bodyData);
      if (result === true) {
        mutate();
        setMsg({type: 'success', content: 'Profile updated'});
      }
    }
    catch (error) {
      setMsg({type: 'success', content: error as string});
    }
  };

  const onProfileOptionsChange = (event: ProfileOnChangeOptionsType) => {
    setProfileOptions((prev) => ({...prev, ...event}));
  };

  return (
    <Box>
      <TranslationProfilesProfileOptions
        disabled={disabled}
        data={profileOptions}
        onChange={onProfileOptionsChange}
        profileId={profileData.profileId}
        disableEngineList={!getProfilesPermission().hasProfilesUpdateTRPermission}
      />
      {!disabled && (
        <PrimaryButton onClick={onEditProfile} style={{margin: '8px 0px'}}>
          {t('Submit')}
        </PrimaryButton>
      )}
      {msg.type === 'success' && (
        <StatusBadge title={t(msg.content)} status='success'>
          {t(msg.content)}
        </StatusBadge>
      )}
      {msg.type === 'error' && (
        <StatusBadge title={t(msg.content)} status='error'>
          {t(msg.content)}
        </StatusBadge>
      )}
    </Box>
  );
}
