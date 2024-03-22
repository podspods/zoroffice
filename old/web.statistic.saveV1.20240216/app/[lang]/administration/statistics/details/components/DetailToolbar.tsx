import { useTranslation } from 'react-i18next';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateTime } from 'luxon';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import DatePicker from '../../components/DatePicker';

type DetailToolbarProps = {
  setDateValue: (value: DateRange<DateTime>) => void;
  mutate: () => void;
  editConfig: () => void;
};

export default function DetailToolbar({ ...props }: DetailToolbarProps) {
  const { t } = useTranslation();
  return (
    <>
      <GridToolbarContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <LeftToolbarContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <DatePicker onChange={props.setDateValue} label={t('Date Period')} />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
