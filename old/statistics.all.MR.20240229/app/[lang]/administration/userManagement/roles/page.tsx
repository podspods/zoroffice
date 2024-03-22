'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import RolesTable from './components/RolesTable';

export default function AdministrationLicenses() {
  const hasAdminRolesPermission = userAuthorizations.check([(actions as any).ADMIN_ROLES, (actions as any).ADMIN_SELF_ROLES]);
  const hasFullEditPermission = userAuthorizations.check([(actions as any).ADMIN_ROLES]);

  if (!hasAdminRolesPermission) {
    return null;
  }

  return (
    <RolesTable hasFullEditPermission={hasFullEditPermission} />
  );
}
