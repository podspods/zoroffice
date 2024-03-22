'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { Period, TypeStat } from '../components/statisticsType';
import GroupViewTable from './components/GroupViewTable';
import { NO_CHECK } from '../components/statisticsConstant';

export type GroupViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function GroupViewPage({ ...props }: GroupViewPageProps) {
  // if (!userAuthorizations.check((actions as any).GROUPS_STATS)) return <></>;
  if (!NO_CHECK && !userAuthorizations.check((actions as any).GROUPS_STATS))
    return <>no rights</>;

  return (
    <GroupViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      onChangePeriode={props.onChangePeriode}
      period={props.period}
      typeStat={props.typeStat}
    />
  );
}
