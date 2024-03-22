import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import {
  DateRange
} from '@mui/x-date-pickers-pro';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import TextField from '@systran/react-components/lib/atoms/TextField';

import SelectTypeStat from './SelectTypeStat';
import { DATE_PERIOD, TOTAL_CHAR, statCategory } from '../../components/statisticsConstant';

import DatePicker from '../../components/DatePicker';

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
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem'}}
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
            label={t(TOTAL_CHAR)}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: '100px' }}
          />
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
