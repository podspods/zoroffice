import userAuthorizations from '../../lib/userAuthorizations';
import {actions} from '../../lib/permissionsList';

export type RolesPermissions = {
  id: string,
  authorizations: {isSuper: boolean, permissions: Record<string, boolean>}
}

export function isValidRolesPermissions(maybeRolesPermissions: unknown): maybeRolesPermissions is RolesPermissions {
  return typeof maybeRolesPermissions === 'object' && maybeRolesPermissions !== null &&
    'authorizations' in maybeRolesPermissions &&
    typeof maybeRolesPermissions.authorizations === 'object' && maybeRolesPermissions.authorizations !== null &&
    'isSuper' in maybeRolesPermissions.authorizations &&
    'permissions' in maybeRolesPermissions.authorizations &&
    typeof maybeRolesPermissions.authorizations.permissions === 'object';
}

export function initUserAuthorizations(rolesPermission: RolesPermissions) {
  userAuthorizations.init(rolesPermission.authorizations);
}

export function check(actions: any) {
  return userAuthorizations.check(actions);
}

export const hasAccessToInfoPage = () => {
  return userAuthorizations.check((actions as any).INFO);
};
