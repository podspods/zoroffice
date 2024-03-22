'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import GroupsTable from './components/GroupsTable';

export default function AdministrationUserManagementGroups() {
  const hasAdminGroupsPermission = userAuthorizations.check([(actions as any).ADMIN_GROUPS, (actions as any).ADMIN_SELF_GROUPS]);
  const hasFullEditPermission = userAuthorizations.check([(actions as any).ADMIN_GROUPS]);
  const hasDeleteExternalGroupPermission = userAuthorizations.check([(actions as any).DELETE_EXTERNAL_GROUP]);

  if (!hasAdminGroupsPermission) {
    return null;
  }

  return (
    <GroupsTable
      hasFullEditPermission={hasFullEditPermission}
      hasDeleteExternalGroupPermission={hasDeleteExternalGroupPermission}
    />
  );
}
