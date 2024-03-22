import {useState} from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TranslationProfilesManagePermissions from 'app/[lang]/linguisticConfiguration/translationProfiles/components/TranslationProfilesManagePermissions';
import {useTranslation} from 'react-i18next';
import {TTranslationResource} from './types';
import {PostApi} from './PostApi';
import {ProfileOnChangeOptionsType} from 'app/[lang]/linguisticConfiguration/translationProfiles/context/TranslationProfilesAddContext';

type TProps = {
  resourceData: TTranslationResource;
  onClose: () => void;
};
export default function TranslationResourcesAddRouteModal({onClose, resourceData}: TProps) {
  const {t} = useTranslation();
  const [permissionsData, setPermissionsData] = useState<ProfileOnChangeOptionsType>({groups: [], users: [], public: false});

  const onChangePermissions = (e: ProfileOnChangeOptionsType) => {
    setPermissionsData((prev) => ({...prev, ...e}));
  };

  const onCreateRoute = async () => {
    const requestBody = {
      deactivated: false,
      groups: permissionsData.groups,
      profileId: null,
      public: permissionsData.public,
      serviceName: '',
      translationResourceId: resourceData.id,
      users: permissionsData.users
    };
    await PostApi.addRoute(requestBody);
    onClose();
  };

  return (
    <ConfirmModal
      width='extraLarge'
      title={t('Manage Permissions')}
      open
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'closeButtonClick' || reason === 'xmarkClick') {
          onClose();
        }
      }}
      onConfirm={onCreateRoute}
    >
      <TranslationProfilesManagePermissions
        {...permissionsData}
        translationResourceId={resourceData.id}
        translationResources={[{label: resourceData.name, value: resourceData.id}]}
        onChange={onChangePermissions}
      />
    </ConfirmModal>
  );
}
