'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import UsersTable from './components/UsersTable';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

export default function AdministrationUserManagementUsers() {
  const hasAdminUsersPermission = userAuthorizations.check([(actions as any).ADMIN_USERS, (actions as any).ADMIN_SELF_USERS]);
  const hasDeletePermission = userAuthorizations.check([(actions as any).DELETE_USERS]);

  const {data: userRoles} = useSWR(Apis.userRoles, {shouldRetryOnError: false, revalidateOnFocus: false});

  if (!hasAdminUsersPermission || !userRoles?.coveredFeatures?.coversSes) {
    return null;
  }

  return (
    <TemporaryPageBox>
      <UsersTable
        canAddUser={userRoles?.userFeatures?.canAddUser}
        connectedUserId={userRoles?.id}
        hasDeletePermission={hasDeletePermission}
        hasDeactivatePermission
      />
    </TemporaryPageBox>
  );
}
