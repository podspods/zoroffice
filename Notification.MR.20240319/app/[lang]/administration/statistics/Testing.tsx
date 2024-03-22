import * as React from 'react';
import DatePicker from './components/DatePicker';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateTime } from 'luxon';
import { defaultPeriod } from './components/statisticsUtils';

export type TestingProp = {
  minWidth: string;
  maxWidth: string;
  width: string;
};

export default function Testing() {
  const handleChange = (value: DateRange<DateTime>) =>
    // eslint-disable-next-line no-console
    console.log(' handleChange==>', value);
  const value = defaultPeriod();

  return (
    <DatePicker onChange={handleChange} label={'Date Period'} value={value} />
  );
}
