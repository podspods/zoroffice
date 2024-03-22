import { useTranslation } from 'react-i18next';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SelectLastPeriod from '../../../administration/statistics/components/SelectLastPeriod';
import { Period } from '../../../administration/statistics/components/statisticsType';

type UserToolbarProps = {
  totalChar: number;
  onChangePeriod: (period: Period) => void;
  periodList: Period[];
  period: Period;
};

export default function PersonalStatisticToolbar({
  ...props
}: UserToolbarProps) {
  const { t } = useTranslation();
  const readOnly = {
    readOnly: true
  };
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
        <TextField
          label={t('Total Characters')}
          value={props.totalChar}
          InputProps={readOnly}
          sx={{ minWidth: '6rem' }}
        />
        <ExportCsvButton />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
