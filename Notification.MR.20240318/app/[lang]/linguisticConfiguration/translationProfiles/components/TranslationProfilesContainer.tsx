import {useContext, useEffect} from 'react';
import {Typography} from '@mui/material';
import TranslationProfilesTable from './TranslationProfilesTable';
import {useTranslation} from 'react-i18next';
import useGetInitDataProfiles from '../hooks/useGetInitDataProfiles';
import {TranslationProfilesContext} from '../context/TranslationProfilesContext';
import useGetUserConnected from '../hooks/useGetUserConnected';
import {check} from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import SkeletonContent from '@/components/IframeLoader';

const typedActions = actions as any; // TODO: Because actions is in js file in lib can not change it to type script now. May be we have to fix this later.

export function getProfilesPermission() {
  return {
    hasAdvancedPermission: check(typedActions.ADMIN_BASE),
    hasProfileSelfPermission: check(typedActions.PROFILES_CONFIG),
    hasProfileSharedPermission: check(typedActions.PROFILES_CONFIG_SHARED),
    hasProfilePublicPermission: check(typedActions.PROFILES_CONFIG_PUBLIC),
    hasProfilesUpdateTRPermission: check(typedActions.PROFILES_UPDATE_TR),
    hasAdminProfilesPermission: check(typedActions.ADMIN_PROFILES),
    hasAdminUserPermission: check([typedActions.ADMIN_USERS, typedActions.ADMIN_SELF_USERS]),
    hasCreateDictionariesPermission: check(typedActions.RSC_DICT),
    hasCreateNormalizationsPermission: check(typedActions.RSC_NORM),
    hasCreateTMPermission: check(typedActions.RSC_TM)
  };
}

export default function TranslationProfilesContainer() {
  const context = useContext(TranslationProfilesContext);
  const {t} = useTranslation();
  const {data, error, isLoading} = useGetInitDataProfiles();
  const {data: user} = useGetUserConnected();

  useEffect(() => {
    context.setData((prev) => ({...prev, enabledProfilesNFA: data.enabledProfilesNFA, connectedUserId: user?.id}));
  }, [data.enabledProfilesNFA, user]);

  if (error) {
    return (
      <Typography color='error' m={2}>
        {t('An error has occurred')}
      </Typography>
    );
  }

  if (isLoading) {
    return <SkeletonContent />;
  }

  return <TranslationProfilesTable data={data} />;
}
