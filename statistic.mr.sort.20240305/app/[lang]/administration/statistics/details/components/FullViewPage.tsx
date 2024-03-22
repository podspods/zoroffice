'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import PageTitle from '@/components/PageTitle';
import { defaultPeriod } from '../../components/statisticsUtils';
import { TypeStat } from '../../components/statisticsType';
import {
  StatType,
  fullViewTypeStat
} from '../../components/statisticsConstant';
import SessionViewTable from './SessionViewTable';
import DetailViewTable from './DetailViewTable';

export default function FullViewPage() {
  const [typeStat, setTypeStat] = useState<TypeStat>(fullViewTypeStat[0]);
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
      <DisplayTable
        typeStat={typeStat}
        typeStatList={fullViewTypeStat}
        onChangeTypeStat={onChangeTypeStat}
        setDateValue={setDateValue}
        dateValue={dateValue}
      />
    </>
  );
}

type DisplayTableProps = {
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  onChangeTypeStat: (typeStat: TypeStat) => void;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};
function DisplayTable({ ...props }: DisplayTableProps) {
  switch (props.typeStat.id) {
    case StatType.STAT_BY_REQUESTS:
      return (
        <DetailViewTable
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          typeStatList={props.typeStatList}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );
    default:
      return (
        <SessionViewTable
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          typeStatList={props.typeStatList}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );
  }
}
