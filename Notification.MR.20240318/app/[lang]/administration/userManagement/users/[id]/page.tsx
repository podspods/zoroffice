
'use client';

import React from 'react';
import userAuthorizations from '../../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../../lib/permissionsList';
import UserContainer from './components/UserContainer';

export default function AdministrationUserManagementUsersId({params}: {params: {id: string, lang: string}}) {
  const canFullEditUser = userAuthorizations.check([(actions as any).ADMIN_USERS]);
  const editUserPermission = userAuthorizations.check([(actions as any).ADMIN_USERS, (actions as any).ADMIN_SELF_USERS]);
  const canEditApiKeys = userAuthorizations.check((actions as any).ADMIN_APIKEYS);
  const disableGroups = !userAuthorizations.check([(actions as any).LIST_GROUPS, (actions as any).LIST_SELF_GROUPS]);
  const disableRoles = !userAuthorizations.check([(actions as any).LIST_ROLES, (actions as any).LIST_SELF_ROLES]);
  const canManageApiCredentials = userAuthorizations.check([(actions as any).ADMIN_APICREDENTIALS]);
  const canManageActiveApplicationPermission = userAuthorizations.check([(actions as any).ADMIN_ACTIVE_APPLICATIONS]);

  return (
    <UserContainer
      params={params}
      // canFullEditUser={canFullEditUser}
      canEditUser={editUserPermission || canFullEditUser}
      canUpdateEmail
      canEditApiKeys={canEditApiKeys}
      disableGroups={disableGroups}
      disableRoles={disableRoles}
      canManageApiCredentials={canManageApiCredentials}
      canManageActiveApplicationPermission={canManageActiveApplicationPermission}
    />
  )
}
