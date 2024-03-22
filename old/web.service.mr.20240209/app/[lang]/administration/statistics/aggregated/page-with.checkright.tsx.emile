'use client';


import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { AggregateTable } from './AggregateTable';

export default function AdministrationStatisticsAggregated() {
  if (
    !userAuthorizations.check((actions as any).USERS_STATS) ||
    !userAuthorizations.check((actions as any).GROUPS_STATS) ||
    !userAuthorizations.check((actions as any).ADMIN_STATS)
  )
    return <></>;
  return <AggregateTable />;
}
