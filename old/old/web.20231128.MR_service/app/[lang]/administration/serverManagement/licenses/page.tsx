'use client';

import { useMemo, useState } from 'react';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import LicensesTable, { transformApiResponse } from '@/components/Licenses/LicensesTable';
import styled from '@emotion/styled';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';

export default function AdministrationLicenses() {
  const hasLicensesPermission = userAuthorizations.check((actions as any).ADMIN_LICENSES);

  if (!hasLicensesPermission)
    return null;

  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>('Never');

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
    <Container>
      <LicensesTable
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
        isLoading={isLoading}
        isValidating={isValidating}
        licenses={licenses}
        mutate={mutate}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 2rem; // TODO: Remove the margin after applying the global margin.
  width: 100%;
  height: fit-content;
`;
