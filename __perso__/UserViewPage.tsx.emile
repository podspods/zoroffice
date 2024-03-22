'use client';

import { Period, TypeStat } from '../components/statisticsType';
import UserViewTable from './components/UserViewTable';

export type UserViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function UserViewPage({ ...props }: UserViewPageProps) {
  return (
    <UserViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      onChangePeriode={props.onChangePeriode}
      period={props.period}
      typeStat={props.typeStat}
      typeStatList={props.typeStatList}

    />
  );
}
