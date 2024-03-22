import {Box} from '@mui/material';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';
import useGetAccountListLight from './useGetAccountListLight';
import useGetRoleListLight from './useGetRolesLight';
import GroupView from '@systran/react-components/lib/userManagement/GroupEditor/GroupView';
import {Group} from '@systran/react-components/lib/userManagement/Groups/GroupType';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {commonFetch} from '@/utils/fetcher';
import InternalRoutes from '@/utils/internalRoutes';

export type GroupContainerProps = {
  params: {id: string, lang: string},
  disableUsers: boolean,
  disableRoles: boolean
}

export default function GroupContainer({params, disableUsers, disableRoles}: GroupContainerProps) {
  const {id} = params;
  const {data: group, isLoading: isGroupLoading, mutate: groupMutate} = useSWR<Group>(Apis.group.getGroup(id), {
    shouldRetryOnError: false,
    revalidateOnFocus: true
  });
  const {data: dataRoleListLight} = useGetRoleListLight();
  const {data: dataAccountListLight} = useGetAccountListLight();
  const {t} = useTranslation();

  if (!group || isGroupLoading) {
    return <SkeletonContent />;
  }

  return (
    <Box sx={{width: '100%', padding: '4rem'}}>
      <PageTitle>{t('Group')}</PageTitle>
      <GroupView
        group={group}
        disableUsers={disableUsers}
        disableRoles={disableRoles}
        groupMutate={groupMutate}
        dataRoleListLight={dataRoleListLight}
        dataGroupAccountLight={dataAccountListLight}
        hasSetCharacterConsumptionFeature
        groupApis={Apis.group}
        ToastMessageContext={ToastMessageContext}
        userListLink={InternalRoutes.groups}
        commonFetch={commonFetch}
      />
    </Box>
  );
}
