import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import { LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SelectLastPeriod from '../../../administration/statistics/components/SelectLastPeriod';
import { Period } from '../../../administration/statistics/components/statisticsType';
import StatisticRightToolBar from '../../../administration/statistics/components/StatisticRightToolBar';

type UserToolbarProps = {
  totalChar: number;
  onChangePeriod: (period: Period) => void;
  periodList: Period[];
  period: Period;
};

export default function PersonalStatisticToolbar({
  ...props
}: UserToolbarProps) {
  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <SelectLastPeriod
          onChange={props.onChangePeriod}
          value={props.period}
          lastPeriodList={props.periodList}
        />
      </LeftToolbarContainer>
      <StatisticRightToolBar totalChar={props.totalChar} />
    </GridToolbarContainer>
  );
}
