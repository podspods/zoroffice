'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import LicensesTable from './components/LicensesTable';
import {Box} from '@mui/material';

export default function AdministrationLicenses() {
  const hasLicensesPermission = userAuthorizations.check((actions as any).ADMIN_LICENSES);

  if (!hasLicensesPermission)
    return null;

  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      <LicensesTable />
    </Box>
  );
}
