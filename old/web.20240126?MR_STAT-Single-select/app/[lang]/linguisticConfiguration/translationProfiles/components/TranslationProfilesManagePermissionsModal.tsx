import {useEffect, useState} from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TranslationProfilesManagePermissions from './TranslationProfilesManagePermissions';
import {PostApi} from './PostApi';
import {EleFilters} from 'utils/apis';
import {useTranslation} from 'react-i18next';
import {Profile} from './TranslationProfilesTable';
import {KeyedMutator} from 'swr';
import {ProfileOnChangeOptionsType} from '../context/TranslationProfilesAddContext';

type Options = {
  tr?: {label: string; value: string}[];
  profile: Profile;
  translationResourceId?: string;
};
type Props = {
  onClose: () => void;
  eleFilters: EleFilters;
  profile: Profile;
  tr?: {name: string; id: string};
  mutate: KeyedMutator<Profile>;
};

function TranslationProfilesManagePermissionsModal({onClose, profile, eleFilters, tr, mutate}: Props) {
  const {t} = useTranslation();
  const [options, setOptions] = useState<Options>({profile});

  useEffect(() => {
    const newOptions: Options = {...options};
    if (tr) {
      newOptions.tr = [{label: t(tr.name), value: tr.id}];
      newOptions.translationResourceId = tr.id;
    }
    setOptions({...newOptions, profile});
  }, []);

  const onChangePermissions = (profile: ProfileOnChangeOptionsType) => {
    setOptions((prev) => {
      const newOptions = {...prev, profile: {...prev.profile, ...profile}};
      if (!newOptions.profile.groups) {
        newOptions.profile.groups = [];
      }
      if (!newOptions.profile.users) {
        newOptions.profile.users = [];
      }
      return newOptions;
    });
  };

  const onConfirmChangePermissions = async () => {
    try {
      const {profileId, service, serviceName, users = [], groups = []} = options.profile;
      const requestBody = {
        public: options.profile.public,
        profileId,
        service,
        serviceName,
        users: users,
        groups: groups,
        translationResourceId: options.translationResourceId
      };
      await PostApi.updateProfile(requestBody);
    }
    catch (error) {
      throw new Error((error as any).message);
    }
    finally {
      await mutate();
    }
  };

  return (
    <ConfirmModal width='large' title={`Manage Permissions - ${options.profile.serviceName}`} open onClose={onClose} onConfirm={onConfirmChangePermissions}>
      <TranslationProfilesManagePermissions
        onChange={onChangePermissions}
        translationResourceId={options.translationResourceId}
        users={options.profile.users}
        groups={options.profile.groups}
        translationResources={options.tr}
        public={options.profile.public}
        eleFilters={eleFilters}
      />
    </ConfirmModal>
  );
}

export default TranslationProfilesManagePermissionsModal;
