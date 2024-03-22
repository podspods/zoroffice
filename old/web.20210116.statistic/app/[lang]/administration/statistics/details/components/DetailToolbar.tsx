import {
  LocalizationProvider,
  PickersShortcutsItem,
  DateRange,
  DateRangePicker,
  SingleInputDateRangeField
} from '@mui/x-date-pickers-pro';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RepeatIcon from '@systran/react-components/lib/atoms/Icons/RepeatIcon';
// import Table from '@systran/react-components/lib/atoms/Icons/Table';

import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import CalendarIcon from '@systran/react-components/lib/atoms/Icons/CalendarIcon';

import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import MenuButton from '@systran/react-components/lib/atoms/Buttons/MenuButton';
type DetailToolbarProps = {
  setDateValue: (value: DateRange<DateTime>) => void;
  mutate: () => void;
  editConfig: () => void;
};

export default function DetailToolbar({ ...props }: DetailToolbarProps) {
  const { t } = useTranslation();
  const shortcut = useShortCut2(t);

  return (
    <>
      <GridToolbarContainer
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <LeftToolbarContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              label={t('Date Period')}
              onChange={props.setDateValue}
              name='allowedRange'
              slots={{ field: SingleInputDateRangeField }}
              slotProps={{
                textField: {
                  InputProps: { endAdornment: <CalendarIcon /> },
                  size: 'small'
                },
                shortcuts: {
                  items: shortcut
                }
              }}
            />
          </LocalizationProvider>
        </LeftToolbarContainer>
        <RightToolbarContainer style={{ paddingRight: '3rem' }}>
          <ExportCsvButton />
          <MenuButton
            icon={<RepeatIcon />}
            tooltipLabel={'Refresh Table'}
            onClick={props.mutate}
          />
          <MenuButton
            icon={<EditIcon />}
            tooltipLabel={'Table sSettings'}
            onClick={props.editConfig}
          />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}

const useShortCut2 = (
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
      { label: 'Reset', getValue: () => [null, null] }
    ],
    [t]
  );
};

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
