'use client';

import { useMemo, useState } from 'react';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import LicensesTable, { transformApiResponse } from './components/LicensesTable';
import useSWR from 'swr';
import Apis from '@/utils/apis';

export default function AdministrationLicenses() {
  const hasLicensesPermission = userAuthorizations.check((actions as any).ADMIN_LICENSES);

  if (!hasLicensesPermission)
    return null;

  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);

  const { data, isLoading, isValidating, mutate } = useSWR(Apis.license.list, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000),
    onError: (err) => console.error('Error fetching licenses:', err) // eslint-disable-line
  });

  const licenses = useMemo(() => {
    return (data?.licenses || []).map(transformApiResponse);
  }, [data]);

  return (
    <LicensesTable
      refreshInterval={refreshInterval}
      setRefreshInterval={setRefreshInterval}
      isLoading={isLoading}
      isValidating={isValidating}
      licenses={licenses}
      mutate={mutate}
    />
  );
}
