'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { Period, TypeStat } from '../components/statisticsType';
import GroupViewTable from './components/GroupViewTable';

export type GroupViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function GroupViewPage({ ...props }: GroupViewPageProps) {
  if (!userAuthorizations.check((actions as any).GROUPS_STATS)) return <></>;
  return (
    <GroupViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      onChangePeriode={props.onChangePeriode}
      period={props.period}
      typeStat={props.typeStat}
    />
  );
}
