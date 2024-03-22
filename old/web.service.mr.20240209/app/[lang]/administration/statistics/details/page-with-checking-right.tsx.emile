'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import DetailTable from './DetailTable';

export default function StatisticDetail() {
  if (!userAuthorizations.check((actions as any).ADMIN_STATS)) return <></>;

  return <DetailTable />;
}
