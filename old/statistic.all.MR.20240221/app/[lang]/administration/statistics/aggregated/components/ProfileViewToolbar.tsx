import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import { LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SelectTypeStat from '../../components/SelectTypeStat';
import DatePicker from '../../components/DatePicker';
import { TypeStat } from '../../components/statisticsType';
import { statCategoryAggregated } from '../../components/statisticsConstant';
import AggregateViewRightToolBar from './AggregateViewRightToolBar';

type GroupToolbarProps = {
  totalChar: number;
  totalUser: number;
  totalProfile: number;
  setDateValue: (value: DateRange<DateTime>) => void;
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
};

export default function ProfileViewToolbar({ ...props }: GroupToolbarProps) {
  const { t } = useTranslation();
  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <DatePicker onChange={props.setDateValue} label={t('Date Period')} />
        <SelectTypeStat
          onChange={props.onChangeTypeStat}
          value={props.typeStat}
          typeStatList={statCategoryAggregated}
        />
      </LeftToolbarContainer>
      <AggregateViewRightToolBar totalChar={props.totalChar} totalUsers={props.totalUser} />
    </GridToolbarContainer>
  );
}
