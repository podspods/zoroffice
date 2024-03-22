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
import SelectTypeStat from '../../components/SelectTypeStat';
import { TypeStat } from '../../components/statisticsType';
import { statCategoryFull } from '../../components/statisticsConstant';

type DetailToolbarProps = {
  setDateValue: (value: DateRange<DateTime>) => void;
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
};

export default function DetailStatisticToolbar({ ...props }: DetailToolbarProps) {
  const { t } = useTranslation();
  return (
    <>
      <GridToolbarContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
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

          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={props.typeStat}
            label={'Data displayed by'}
            typeStatList={statCategoryFull}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
