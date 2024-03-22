import { useTranslation } from 'react-i18next';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateTime } from 'luxon';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import DatePicker from '../../components/DatePicker';
import { DATE_PERIOD } from '../../components/statisticsConstant';

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
        </LeftToolbarContainer>
        <RightToolbarContainer >
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
