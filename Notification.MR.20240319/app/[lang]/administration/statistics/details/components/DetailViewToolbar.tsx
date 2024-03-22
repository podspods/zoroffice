import { useTranslation } from 'react-i18next';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateTime } from 'luxon';
import { LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import DatePicker from '../../components/DatePicker';
import SelectTypeStat from '../../components/SelectTypeStat';
import { TypeStat } from '../../components/statisticsType';
import StatisticRightToolBar from '../../components/StatisticRightToolBar';
import { fullViewTypeStat } from '../../components/statisticsConstant';

type DetailViewTableProps = {
  setDateValue: (value: DateRange<DateTime>) => void;
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  totalChar: number;
  dateValue: DateRange<DateTime>;
};

export default function DetailViewTable({ ...props }: DetailViewTableProps) {
  const { t } = useTranslation();
  return (
    <>
      <GridToolbarContainer>
        <LeftToolbarContainer>
          <DatePicker
            onChange={props.setDateValue}
            label={t('Date Period')}
            value={props.dateValue}
          />

          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={props.typeStat}
            label={'Data displayed by'}
            typeStatList={fullViewTypeStat}
          />
        </LeftToolbarContainer>
        <StatisticRightToolBar totalChar={props.totalChar} />
      </GridToolbarContainer>
    </>
  );
}
