'use client';

import ProfileViewTable from './components/ProfileViewTable';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import { TypeStat } from '../components/statisticsType';

export type ProfileViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  typeStatList: TypeStat[];
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function ProfileViewPage({ ...props }: ProfileViewPageProps) {

  return (
    <ProfileViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      typeStat={props.typeStat}
      dateValue={props.dateValue}
      setDateValue={props.setDateValue}
      typeStatList={props.typeStatList}
    />
  );
}
