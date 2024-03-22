'use client';

import { Period, TypeStat } from '../components/statisticsType';
import GroupViewTable from './components/GroupViewTable';

export type GroupViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangePeriode: (period: Period) => void;
  period: Period;
};

export default function GroupViewPage({ ...props }: GroupViewPageProps) {
  return (
    <GroupViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      onChangePeriode={props.onChangePeriode}
      period={props.period}
      typeStat={props.typeStat}
      typeStatList={props.typeStatList}
    />
  );
}
