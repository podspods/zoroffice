/* eslint-disable no-console */

'use client';

import { useState } from 'react';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';

import TableUserView from './components/TableUserView';
import TableGroupView from './components/TableGroupView';
import TableProfileView from './components/TableProfileView';
import { defaultPeriod, getCurrentPeriod } from '../components/statisticsUtils';
import { STAT_GROUP, STAT_PROFILE, STAT_USER, statCategory } from '../components/statisticsConstant';

/**
 *
 * 1) select a statistic type one of statCategory: string[] = ['User', 'Group', 'Profil', 'Session', 'Global'];
 * 2) loop over statCategory. if category = category select => then display the table
 * where to put data for each category
 *
 * user & group => select par période
 * profile => date début date de fin
 *
 */

export default function AdministrationStatisticsAggregated() {
  const [typeStat, setTypeStat] = useState<number>(0);
  const [period, setPeriod] = useState<string>(getCurrentPeriod());

  const onChangePeriode = (period: string) => {
    setPeriod(period);
  };
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );

  const onChangeTypeStat = (typeStat: string) => {
    console.log(' typeStat==>', typeStat);
    setTypeStat(statCategory.indexOf(typeStat));
  };

  return (
    <>
      {displayTable({
        typeStat,
        onChangeTypeStat,
        onChangePeriode,
        period,
        setDateValue,
        dateValue
      })}
    </>
  );
}

type displayTableProps = {
  typeStat: number;
  onChangeTypeStat: (statName: string) => void;
  onChangePeriode: (period: string) => void;
  period: string;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

function displayTable({ ...props }: displayTableProps) {
  switch (props.typeStat) {
    case 1:
      return (
        <TableGroupView
          name={STAT_GROUP}
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );

    case 2:
      return (
        <TableProfileView
          name={STAT_PROFILE}
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );

    default:
      return (
        <TableUserView
          name={STAT_USER}
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
  }
}
