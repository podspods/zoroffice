import {Box} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import SkeletonContent from '@/components/IframeLoader';
import useGetGroupListLight from '../../components/useGetGroupsLight';
import useGetRoleListLight from './useGetRolesLight';
import UserView from '@systran/react-components/lib/userManagement/UserEditor/UserView';
import {User} from '@systran/react-components/lib/userManagement/Users/userType';
import PageTitle from '@/components/PageTitle';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {commonFetch} from '@/utils/fetcher';
import InternalRoutes from '@/utils/internalRoutes';
import useGetClientCredentials from './useGetClientCredentials';
import useGetApiKeys from './useGetApiKeys';
import useGetActiveApplications from './useGetActiveApplications';

export type UserContainerProps = {
  params: {id: string, lang: string},
  canEditUser: boolean,
  canEditApiKeys: boolean,
  disableGroups: boolean,
  disableRoles: boolean,
  canManageApiCredentials: boolean,
  canManageActiveApplicationPermission: boolean,
  canUpdateEmail: boolean,
  // canFullEditUser: boolean,
}

export default function UserContainer({params, ...props}: UserContainerProps) {
  const {id} = params;
  const {data: user, isLoading: isUserLoading, mutate: userMutate} = useSWR<User>(Apis.user.getUser(id), {shouldRetryOnError: false, revalidateOnFocus: true});
  const {data: userConnected} = useSWR(Apis.userRoles);
  const {data: dataRoleListLight} = useGetRoleListLight();
  const {data: dataGroupListLight} = useGetGroupListLight();
  const {t} = useTranslation();

  if (!user || isUserLoading) {
    return <SkeletonContent />;
  }

  return (
    <TemporaryPageBox>
      <PageTitle>{t('User')}</PageTitle>
      <UserView
        {...props}
        user={user}
        userConnected={userConnected}
        isPersonalUser={false}
        userMutate={userMutate}
        dataRoleListLight={dataRoleListLight}
        dataGroupListLight={dataGroupListLight}
        // canFullEditUser={canFullEditUser}
        userApis={Apis.user}
        ToastMessageContext={ToastMessageContext}
        userListLink={InternalRoutes.users}
        commonFetch={commonFetch}
        useGetClientCredentials={useGetClientCredentials}
        useGetApiKeys={useGetApiKeys}
        useGetActiveApplications={useGetActiveApplications}
        hasSetCharacterConsumptionFeature={false}
      />
    </TemporaryPageBox>
  );
}
