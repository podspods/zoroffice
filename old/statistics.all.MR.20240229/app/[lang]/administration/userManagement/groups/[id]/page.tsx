'use client';

import React from 'react';
import userAuthorizations from '../../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../../lib/permissionsList';
import GroupContainer from './components/GroupContainer';

export default function AdministrationUserManagementGroupsId({params}: {params: {id: string, lang: string}}) {
  const disableUsers = !userAuthorizations.check([(actions as any).LIST_USERS, (actions as any).LIST_SELF_USERS]);
  const disableRoles = !userAuthorizations.check([(actions as any).LIST_ROLES, (actions as any).LIST_SELF_ROLES])
  return (
    <GroupContainer
      params={params}
      disableUsers={disableUsers}
      disableRoles={disableRoles}
    />
  )
}
