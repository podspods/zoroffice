'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { Period, TypeStat } from '../components/statisticsType';
import UserViewTable from './components/UserViewTable';

export type UserViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function UserViewPage({ ...props }: UserViewPageProps) {
  if (!userAuthorizations.check((actions as any).USERS_STATS)) return <></>;
  return (
    <UserViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      onChangePeriode={props.onChangePeriode}
      period={props.period}
      typeStat={props.typeStat}
    />
  );
}
