'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import MainBox from '@/components/MainBox';
import PageTitle from '@/components/PageTitle';
import TableUserView from './components/TableUserView';
import TableGroupView from './components/TableGroupView';
import TableProfileView from './components/TableProfileView';
import {
  defaultPeriod,
  getCurrentPeriod,
  permission
} from '../components/statisticsUtils';
import { statCategoryAggregated } from '../components/statisticsConstant';
import { Period, TypeStat } from '../components/statisticsType';

export default function AdministrationStatisticsAggregated() {
  if (!permission(0) || !permission(1) || !permission(2)) return <></>;
  const [typeStat, setTypeStat] = useState<TypeStat>(statCategoryAggregated[0]);
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
      <MainBox>
        <PageTitle>{t(typeStat.name)}</PageTitle>
        {displayTable({
          typeStat,
          onChangeTypeStat,
          onChangePeriode,
          period,
          setDateValue,
          dateValue
        })}
      </MainBox>
    </>
  );
}

type displayTableProps = {
  typeStat: TypeStat;
  onChangeTypeStat: (typeStat: TypeStat) => void;
  onChangePeriode: (period: Period) => void;
  period: Period;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};
function displayTable({ ...props }: displayTableProps) {
  switch (props.typeStat.id) {
    case 1:
      return (
        <TableGroupView
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
    case 2:
      return (
        <TableProfileView
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );
    default:
      return (
        <TableUserView
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
  }
}
