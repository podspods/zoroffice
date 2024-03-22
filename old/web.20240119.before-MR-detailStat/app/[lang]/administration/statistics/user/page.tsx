/* eslint-disable no-console */

'use client';

import { useState } from 'react';
import { currentPeriod, statCategory } from './components/statisticsType';
import TableUserView from './components/TableUserView';
import TableGroupView from './components/TableGroupView';
import TableProfileView from './components/TableProfileView';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import { defaultPeriod } from '../components/statUtils';

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
  const [period, setPeriod] = useState<string>(currentPeriod());

  const onChangePeriode = (period: string) => {
    setPeriod(period);
  };
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );

  const onChangeTypeStat = (typeStat: string) => {
    setTypeStat(statCategory.indexOf(typeStat));
  };
  console.log(' typeStat==>', typeStat);

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
          name={`Table Group : ${props.typeStat}`}
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );

    case 2:
      return (
        <TableProfileView
          name={`Table profileView : ${props.typeStat}`}
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );

    default:
      console.log('displayTable 51 ==>', props.typeStat);
      return (
        <TableUserView
          name={`Table UserView : ${props.typeStat}`}
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
  }
}
