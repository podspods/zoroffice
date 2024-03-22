import {
  DateRange
} from '@mui/x-date-pickers-pro';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import DatePicker from '../../components/DatePicker';
import { DateTime } from 'luxon';

type DetailToolbarProps = {
  setDateValue: (value: DateRange<DateTime>) => void;
  mutate: () => void;
  editConfig: () => void;
};

export default function DetailToolbar({ ...props }: DetailToolbarProps) {
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
          <DatePicker onChange={props.setDateValue} label={'Date Period'} />
        </LeftToolbarContainer>
        <RightToolbarContainer style={{ paddingRight: '3rem' }}>
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
