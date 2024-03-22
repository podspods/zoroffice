import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SelectLastPeriod from '../../../administration/statistics/components/SelectLastPeriod';
import { Period } from '../../../administration/statistics/components/statisticsType';
import StatisticRightToolBar from 'app/[lang]/administration/statistics/components/StatisticRightToolBar';

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
      <RightToolbarContainer>
        <StatisticRightToolBar totalChar={props.totalChar} />
        <ExportCsvButton />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
