'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import AggregatedPage from './AggregatedPage';

export default function AdministrationStatisticsAggregated() {
  if (
    !(
      userAuthorizations.check((actions as any).USERS_STATS) ||
      userAuthorizations.check((actions as any).GROUPS_STATS) ||
      userAuthorizations.check((actions as any).ADMIN_STATS)
    )
  )
    return <></>;

  return (
    <TemporaryPageBox>
      <AggregatedPage />
    </TemporaryPageBox>
  );
}
