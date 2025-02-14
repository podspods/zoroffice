import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import {
  LocalizationProvider,
  PickersShortcutsItem,
  DateRange,
  DateRangePicker,
  SingleInputDateRangeField
} from '@mui/x-date-pickers-pro';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import CalendarIcon from '@systran/react-components/lib/atoms/Icons/CalendarIcon';

export type DatePickerProps = {
  label?: string;
  onChange: (value: DateRange<DateTime>) => void;
};
export default function DatePicker({ ...props }: DatePickerProps) {
  const { t } = useTranslation();
  const label = props.label ? props.label : '';
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateRangePicker
          label={t(label)}
          onChange={props.onChange}
          name='allowedRange'
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: {
              InputProps: { endAdornment: <CalendarIcon /> },
              size: 'small'
            },
            shortcuts: {
              items: useShortCut(t)
            }
          }}
        />
      </LocalizationProvider>
    </>
  );
}

const useShortCut = (
  t: TFunction
): PickersShortcutsItem<DateRange<DateTime>>[] => {
  return useMemo<PickersShortcutsItem<DateRange<DateTime>>[]>(
    () => [
      {
        label: t('This Week'),
        getValue: () => {
          const today = DateTime.now();
          return [today.startOf('week'), today.endOf('week')];
        }
      },
      {
        label: t('This Month'),
        getValue: () => {
          const today = DateTime.now();
          return [today.startOf('month'), today.endOf('month')];
        }
      },
      {
        label: t('Last 7 Days'),
        getValue: () => {
          const today = DateTime.now();
          return [today.minus({ day: 7 }), today];
        }
      },
      {
        label: t('Last Month'),
        getValue: () => {
          const today = DateTime.now();
          const endOfLastMonth = today.startOf('month').minus({
            day: 1
          });
          return [endOfLastMonth.startOf('month'), endOfLastMonth];
        }
      },
      {
        label: t('Last Week'),
        getValue: () => {
          const today = DateTime.now();
          const prevWeek = today.minus({
            day: 7
          });
          return [prevWeek.startOf('week'), prevWeek.endOf('week')];
        }
      },
      { label: 'Reset', getValue: () => [null, null] }
    ],
    [t]
  );
};
