/* eslint-disable no-console */
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { useTranslation } from 'react-i18next';

import SelectBox from '@/components/SelectBox';
import SelectTypeStat from './SelectTypeStat';
import { DATE_PERIOD, TOTAL_CHAR, TOTAL_PROFILE, statCategory } from '../../components/statisticsConstant';

import SelectLastPeriod from './SelectLastPeriod';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import DatePicker from '../../components/DatePicker';
import { DateTime } from 'luxon';
import {
  DateRange
} from '@mui/x-date-pickers-pro';


type GroupToolbarProps = {
  totalChar: number;
  totalProfile: number;
  setDateValue: (value: DateRange<DateTime>) => void;
  onChangeTypeStat: (typeStat: string) => void;
  typeStat: number;
};

export default function ProfileViewToolbar({ ...props }: GroupToolbarProps) {
  const { t } = useTranslation();

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
          <DatePicker onChange={props.setDateValue} label={t(DATE_PERIOD)} />

          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={statCategory[props.typeStat]}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <TextField
            id='outlined-read-only-input'
            label={t(TOTAL_CHAR)}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}

          />
          <TextField
            id='outlined-read-only-input'
            label={t(TOTAL_PROFILE)}
            value={props.totalProfile}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}

          />
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
