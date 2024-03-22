'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import PageTitle from '@/components/PageTitle';
import { defaultPeriod, getCurrentPeriod } from '../components/statisticsUtils';
import { Period, TypeStat } from '../components/statisticsType';
import GroupViewPage from './GroupViewPage';
import ProfileViewPage from './ProfileViewPage';
import UserViewPage from './UserViewPage';
import { StatType } from '../components/statisticsConstant';

export type AggregatedPageProps = {
  typeStatList: TypeStat[];
};

export default function AggregatedPage({ ...props }: AggregatedPageProps) {

  const [typeStat, setTypeStat] = useState<TypeStat>(
    props.typeStatList ? props.typeStatList[0] : { id: 0, label: '', name: '' }
  );
  const [period, setPeriod] = useState<Period>(getCurrentPeriod());
  const onChangePeriode = (period: Period) => {
    setPeriod(period);
  };
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t(typeStat.name)}</PageTitle>
      {props.typeStatList && (
        <DisplayTable
          // {...props}
          typeStat={typeStat}
          typeStatList={props.typeStatList}
          onChangeTypeStat={onChangeTypeStat}
          onChangePeriode={onChangePeriode}
          period={period}
          setDateValue={setDateValue}
          dateValue={dateValue}
        />
      )}
    </>
  );
}

type DisplayTableProps = {
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangeTypeStat: (typeStat: TypeStat) => void;
  onChangePeriode: (period: Period) => void;
  period: Period;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};
function DisplayTable({ ...props }: DisplayTableProps) {
  switch (props.typeStat.id) {
    case StatType.STAT_BY_GROUP:
      return (
        <GroupViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
          typeStatList={props.typeStatList}
        />
      );
    case StatType.STAT_BY_PROFILE:
      return (
        <ProfileViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          dateValue={props.dateValue}
          typeStatList={props.typeStatList}
          setDateValue={props.setDateValue}
        />
      );
    default:
      return (
        <UserViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStatList={props.typeStatList}
          typeStat={props.typeStat}
        />
      );
  }
}
