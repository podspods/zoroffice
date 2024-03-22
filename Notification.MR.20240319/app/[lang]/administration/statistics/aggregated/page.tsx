'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import AggregatedPage from './AggregatedPage';
import { TypeStat } from '../components/statisticsType';
import {
  groupStat,
  profileStat,
  userStat
} from '../components/statisticsConstant';

export default function AdministrationStatisticsAggregated() {
  const typeStatList: TypeStat[] = [
    userAuthorizations.check((actions as any).USERS_STATS) &&
    userAuthorizations.check((actions as any).LIST_USERS)
      ? userStat
      : undefined,
    userAuthorizations.check((actions as any).GROUPS_STATS) &&
    userAuthorizations.check((actions as any).LIST_GROUPS)
      ? groupStat
      : undefined,
    userAuthorizations.check((actions as any).ADMIN_STATS)
      ? profileStat
      : undefined
  ].filter((item): item is TypeStat => item !== undefined);

  if (!typeStatList) return <></>;

  return (
    <TemporaryPageBox>
      <AggregatedPage typeStatList={typeStatList} />
    </TemporaryPageBox>
  );
}
