'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import LicensesTable from './components/LicensesTable';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

export default function AdministrationLicenses() {
  const hasLicensesPermission = userAuthorizations.check((actions as any).ADMIN_LICENSES);

  if (!hasLicensesPermission)
    return null;

  return (
    <TemporaryPageBox>
      <LicensesTable />
    </TemporaryPageBox>
  );
}
