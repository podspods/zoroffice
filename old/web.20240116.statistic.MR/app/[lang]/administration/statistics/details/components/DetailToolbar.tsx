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

import dayjs, { Dayjs } from 'dayjs';

type DetailToolbarProps = {
  setDateValue: (value: DateRange<Dayjs>) => void;
  mutate: () => void;
  editConfig: () => void;
};

export default function DetailToolbar({ ...props }: DetailToolbarProps) {
  const { t } = useTranslation();
  const shortcut = useShortCut(t);


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

const useShortCut = (
  t: TFunction
): PickersShortcutsItem<DateRange<Dayjs>>[] => {
  return useMemo<PickersShortcutsItem<DateRange<Dayjs>>[]>(
    () => [
      {
        label: t('This Week'),
        getValue: () => {
          const today = dayjs();
          return [today.startOf('week'), today.endOf('week')];
        }
      },
      {
        label: t('This Month'),
        getValue: () => {
          const today = dayjs();
          return [today.startOf('month'), today.endOf('month')];
        }
      },
      {
        label: t('Last 7 Days'),
        getValue: () => {
          const today = dayjs();
          return [today.subtract(7, 'day'), today];
        }
      },
      {
        label: t('Last Month'),
        getValue: () => {
          const today = dayjs();
          const endOfLastMonth = today.startOf('month').subtract(1, 'day');
          return [endOfLastMonth.startOf('month'), endOfLastMonth];
        }
      },
      {
        label: t('Last Week'),
        getValue: () => {
          const today = dayjs();
          const prevWeek = today.subtract(7, 'day');
          return [prevWeek.startOf('week'), prevWeek.endOf('week')];
        }
      },
      { label: 'Reset', getValue: () => [null, null] }
    ],
    [t]
  );
};
