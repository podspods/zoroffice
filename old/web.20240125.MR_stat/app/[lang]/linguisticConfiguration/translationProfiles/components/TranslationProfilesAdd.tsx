import {SyntheticEvent, useContext, useEffect} from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TranslationProfilesLanguageSelectors from './TranslationProfilesLanguageSelectors';
import {useTranslation} from 'react-i18next';
import TranslationProfilesProfileOptions from './TranslationProfilesProfileOptions';
import {ProfileAddType, ProfileOnChangeEvent, ProfileOnChangeOptionsType, TranslationProfilesAddContext} from '../context/TranslationProfilesAddContext';
import TranslationProfilesManagePermissions from './TranslationProfilesManagePermissions';
import {PostApi, RequestDataCreate} from './PostApi';
import {OpenedModal} from '../hooks/useProfileModal';
import TranslationProfilesPivot from './TranslationProfilesPivot';
import {Profile} from './TranslationProfilesTable';

type Props = {
  openedModal: OpenedModal;
  onClose: () => void;
};
function getLanguagePairsFromSelection(entries: Profile[]) {
  return {
    source: entries[0].source,
    target: entries[entries.length - 1].target
  };
}
export default function TranslationProfilesAdd({openedModal, onClose}: Props) {
  const {data: profileData, setData: setProfileData} = useContext(TranslationProfilesAddContext);

  useEffect(() => {
    if (openedModal.selectedProfiles.length > 1) {
      const {source, target} = getLanguagePairsFromSelection(openedModal?.selectedProfiles);
      setProfileData({
        step: 'PIVOT',
        profileOptions: {
          ...profileData.profileOptions,
          source,
          target,
          flowProfile: openedModal.selectedProfiles.map((e) => {
            return {profileId: e.sesProfileId, profileName: e.serviceName, source: e.source, target: e.target};
          })
        }
      });
      return;
    }
    setProfileData({step: 'LANGUAGE_SELECTORS'});
  }, [openedModal.selectedProfiles]);

  const onChange = (options: ProfileOnChangeOptionsType) => {
    setProfileData({profileOptions: {...profileData.profileOptions, ...options}});
  };

  const onCreateProfile = async () => {
    const requestBody: RequestDataCreate = {};
    requestBody.enabledNFA = profileData.profileOptions.enabledNFA;
    requestBody.deactivated = profileData.profileOptions.deactivated || false;
    requestBody.genericOptions = profileData.profileOptions.genericOptions;
    requestBody.noCache = profileData.profileOptions.noCache;
    requestBody.profileName = profileData.profileOptions.serviceName || profileData.profileOptions.profileName;
    requestBody.public = profileData.profileOptions.public;
    requestBody.selectors = profileData.profileOptions.selectors;
    requestBody.source = profileData.profileOptions.source;
    requestBody.target = profileData.profileOptions.target;
    requestBody.resources = {};
    requestBody.resources.engine = profileData.profileOptions.engineSelected;
    requestBody.groups = profileData.profileOptions.groups || [];
    requestBody.users = profileData.profileOptions.users || [];
    requestBody.profileId = profileData.profileOptions.profileId ?? null;
    requestBody.serviceName = profileData.profileOptions.serviceName || profileData.profileOptions.profileName;
    requestBody.filterOptions = profileData.profileOptions.filterOptions;
    requestBody.flowProfile = profileData.profileOptions.flowProfile;

    if (profileData.profileOptions.resourcesOptions?.dictionaries?.dictionaries) {
      requestBody.resources.userDict = profileData.profileOptions.resourcesOptions.dictionaries.dictionaries.map((dictionary) => {
        return {
          id: dictionary.id,
          dictName: dictionary.dictName,
          domain: Array.isArray(dictionary.domain) ? dictionary.domain.join(',') : ''
        };
      });
    }
    if (profileData.profileOptions.resourcesOptions?.normalizations?.normalizations) {
      requestBody.resources.normalization = profileData.profileOptions.resourcesOptions.normalizations.normalizations.map((normalization) => {
        return {
          id: normalization.id,
          dictName: normalization.dictName,
          domain: 'General'
        };
      });
    }
    if (profileData.profileOptions.resourcesOptions?.translationMemories?.translationMemories) {
      requestBody.resources.translationMemory = {
        corpusIds: profileData.profileOptions.resourcesOptions.translationMemories.translationMemories.map((translationMemory) => {
          return translationMemory.id;
        })
      };
    }

    return PostApi.createProfile(requestBody).finally(() => onClose());
  };

  let modal: JSX.Element | null = null;
  if (profileData.step === 'LANGUAGE_SELECTORS') {
    modal = <LanguageSelectorsModal onClose={onClose} />;
  }
  if (profileData.step === 'PIVOT') {
    modal = <PivotProfile onClose={onClose} />;
  }
  if (profileData.step === 'PROFILE_OPTIONS') {
    modal = <ProfileOptionsModal onChange={onChange} />;
  }
  if (profileData.step === 'MANAGE_PERMISSIONS') {
    modal = <ProfileOptionsManagePermissionsModal profileData={profileData} setProfileData={setProfileData} onChange={onChange} onConfirm={onCreateProfile} onClose={onClose} />;
  }
  return modal;
}

function LanguageSelectorsModal(props: {onClose: () => void}) {
  const {t} = useTranslation();
  const {data: profileData, setData: setProfileData, clearData: clearProfileData} = useContext(TranslationProfilesAddContext);
  const onChange = (value: {sourceSelected: string; targetSelected: string}) => {
    setProfileData({profileOptions: {...profileData.profileOptions, source: value.sourceSelected, target: value.targetSelected}});
  };
  const onClose = (event?: SyntheticEvent, reason?: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'confirmClick' | 'xmarkClick') => {
    if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
      clearProfileData();
      props.onClose();
    }
  };
  const onConfirm = () => {
    if (!profileData.profileOptions.source || !profileData.profileOptions.target) {
      throw new Error(t('languages not selected'));
    }
    setProfileData({step: 'PROFILE_OPTIONS'});
  };

  return (
    <ConfirmModal width='large' title={t('Choose a language pair')} open onClose={onClose} onConfirm={onConfirm}>
      <TranslationProfilesLanguageSelectors sourceSelected={profileData.profileOptions.source} targetSelected={profileData.profileOptions.target} onChange={onChange} />
    </ConfirmModal>
  );
}

function PivotProfile(props: {onClose: () => void}) {
  const {t} = useTranslation();
  const {data: profileData, setData: setProfileData, clearData: clearProfileData} = useContext(TranslationProfilesAddContext);
  const {source, target, flowProfile = []} = profileData.profileOptions;

  const onConfirm = () => {
    let previousTarget: string;

    const hasInvalidPivotProfile = profileData.profileOptions.flowProfile?.some((profile) => {
      if (previousTarget && previousTarget !== profile.source) {
        return true;
      }
      previousTarget = profile.target;
      return false;
    });
    if (hasInvalidPivotProfile) {
      throw new Error(t('Invalid pivot profile'));
    }
    setProfileData({step: 'PROFILE_OPTIONS'});
  };

  const onClose = (event?: SyntheticEvent, reason?: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'confirmClick' | 'xmarkClick') => {
    if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
      clearProfileData();
      props.onClose();
    }
  };

  return (
    <ConfirmModal width='large' title={t('Create a pivot profile')} open={profileData.step === 'PIVOT'} onClose={onClose} onConfirm={onConfirm}>
      <TranslationProfilesPivot source={source} target={target} flowProfile={flowProfile} />
    </ConfirmModal>
  );
}

function ProfileOptionsModal(props: {onChange: (e: ProfileOnChangeOptionsType) => void}) {
  const {t} = useTranslation();
  const {data: profileData, setData: setProfileData, clearData: clearProfileData} = useContext(TranslationProfilesAddContext);

  const onClose = (event?: SyntheticEvent, reason?: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'confirmClick' | 'xmarkClick') => {
    if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
      clearProfileData();
    }
  };

  const onConfirm = () => {
    if (!profileData.profileOptions.profileName) {
      throw new Error(t('Missing Profile Name'));
    }
    if (!profileData.profileOptions.engineSelected) {
      throw new Error(t('Engine not selected'));
    }
    setProfileData({step: 'MANAGE_PERMISSIONS'});
  };

  return (
    <ConfirmModal width='large' title={t('Create a profile')} open onClose={onClose} onConfirm={onConfirm}>
      <TranslationProfilesProfileOptions data={profileData.profileOptions} onChange={props.onChange} />
    </ConfirmModal>
  );
}

function ProfileOptionsManagePermissionsModal(props: {
  profileData: ProfileAddType;
  setProfileData: (e: ProfileOnChangeEvent) => void;
  onChange: (e: ProfileOnChangeOptionsType) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const {t} = useTranslation();

  const onClose = (event?: SyntheticEvent, reason?: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'confirmClick' | 'xmarkClick') => {
    if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
      props.setProfileData({step: 'PROFILE_OPTIONS'});
      return;
    }
    props.onClose();
  };

  return (
    <ConfirmModal width='large' title={t('Manage Permissions')} open onClose={onClose} onConfirm={props.onConfirm}>
      <TranslationProfilesManagePermissions onChange={props.onChange} {...props.profileData.profileOptions} />
    </ConfirmModal>
  );
}
