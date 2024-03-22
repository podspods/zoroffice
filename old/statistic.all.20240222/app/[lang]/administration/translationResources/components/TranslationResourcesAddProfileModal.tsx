import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TranslationProfilesProfileOptions from 'app/[lang]/linguisticConfiguration/translationProfiles/components/TranslationProfilesProfileOptions';
import {Engine, ModelOptions, OptionsType, ProfileOnChangeOptionsType, Selectors} from 'app/[lang]/linguisticConfiguration/translationProfiles/context/TranslationProfilesAddContext';
import {TTranslationResource} from './types';
import {useTranslation} from 'react-i18next';
import {Dispatch, SetStateAction, useContext, useState} from 'react';
import TranslationProfilesManagePermissions from 'app/[lang]/linguisticConfiguration/translationProfiles/components/TranslationProfilesManagePermissions';
import {PostApi} from 'app/[lang]/linguisticConfiguration/translationProfiles/components/PostApi';
import {TranslationResourcesContext} from '../context/TranslationResourcesContext';

type Props = {
  resourceData: TTranslationResource;
  onClose: () => void;
};

type RequestDataType = {
  source: string | undefined;
  target: string | undefined;
  selectors: Selectors;
  engineSelected: Engine;
  profileName: string;
  serviceName: string;
  users: Array<string>;
  groups: Array<string>;
  public: boolean;
  profileId: string | null;
  deactivated: boolean;
};

export default function TranslationResourcesAddProfileModal({onClose, resourceData}: Props) {
  const {
    data: {connectedUserId = ''}
  } = useContext(TranslationResourcesContext);
  const [step, setStep] = useState<'PROFILE_OPTIONS' | 'PERMISSIONS'>('PROFILE_OPTIONS');
  const [requestData, setRequestData] = useState<RequestDataType>({
    source: resourceData.source,
    target: resourceData.target,
    selectors: {...resourceData.selectors, domain: undefined},
    engineSelected: {
      id: resourceData.id,
      name: resourceData.name,
      type: resourceData.selectors?.tech?.type?.toLowerCase(),
      modelOptions: resourceData.modelOptions as ModelOptions
    },
    profileName: '',
    serviceName: '',
    users: [connectedUserId],
    groups: [],
    public: false,
    profileId: null,
    deactivated: false
  });

  const onChangeProfileOptions = (profileOptions: ProfileOnChangeOptionsType) => {
    setRequestData((prev) => ({...prev, ...profileOptions}));
  };

  if (step === 'PROFILE_OPTIONS') {
    return <ProfileOptions onClose={onClose} setStep={setStep} requestData={requestData} onChangeProfileOptions={onChangeProfileOptions} />;
  }

  return <Permissions onClose={onClose} setStep={setStep} requestData={requestData} onChangeProfileOptions={onChangeProfileOptions} />;
}

type TProfileOptionsProp = {
  onClose: () => void;
  requestData: RequestDataType;
  setStep: Dispatch<SetStateAction<'PROFILE_OPTIONS' | 'PERMISSIONS'>>;
  onChangeProfileOptions: (profileOptions: ProfileOnChangeOptionsType) => void;
};
const ProfileOptions = ({onClose, requestData, setStep, onChangeProfileOptions}: TProfileOptionsProp) => {
  const {t} = useTranslation();

  const onConfirmInformation = async () => {
    if (!requestData.profileName) throw Error(t('Missing Profile Name'));
    setStep('PERMISSIONS');
  };

  return (
    <ConfirmModal
      width='extraLarge'
      title={t('Create a profile')}
      open
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
          onClose();
        }
      }}
      onConfirm={onConfirmInformation}
    >
      <TranslationProfilesProfileOptions disableEngineList data={requestData as OptionsType} onChange={onChangeProfileOptions} />
    </ConfirmModal>
  );
};

const Permissions = ({requestData, onClose, onChangeProfileOptions}: TProfileOptionsProp) => {
  const {t} = useTranslation();

  const onCreateProfile = async () => {
    const requestBody = {
      ...requestData,
      resources: {engine: requestData.engineSelected},
      serviceName: requestData.profileName
    };
    await PostApi.createProfile(requestBody);
    onClose();
  };

  return (
    <ConfirmModal
      width='extraLarge'
      title={t('Create a profile')}
      open
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
          onClose();
        }
      }}
      onConfirm={onCreateProfile}
    >
      <TranslationProfilesManagePermissions onChange={onChangeProfileOptions} public={requestData.public} users={requestData.users} groups={requestData.groups} />
    </ConfirmModal>
  );
};
