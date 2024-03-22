import { useTranslation } from 'react-i18next';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import { LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SingleSelect from '@/components/SingleSelect';
import SelectTypeStat from '../../components/SelectTypeStat';
import SelectLastPeriod from '../../components/SelectLastPeriod';
import { Group, Period, TypeStat } from '../../components/statisticsType';
import { statCategoryAggregated } from '../../components/statisticsConstant';
import AggregateViewRightToolBar from './AggregateViewRightToolBar';

type GroupToolbarProps = {
  totalChar: number;
  totalGroup: number;
  onChangeGroup: (group: Group) => void;
  onChangePeriod: (period: Period) => void;
  groupList: Group[];
  onChangeTypeStat: (typeStat: TypeStat) => void;
  periodList: Period[];
  period: Period;
  typeStat: TypeStat;
  group: Group;
};
export default function GroupViewToolbar({ ...props }: GroupToolbarProps) {
  const { t } = useTranslation();
  const handleOnchange = (groupName: string) => {
    const groupFound = props.groupList.find(
      (group) => group.name === groupName
    );
    if (groupFound) {
      props.onChangeGroup(groupFound);
    }
    else {
      props.onChangeGroup({
        id: '',
        name: '',
        roles: [],
        accounts: []
      });
    }
  };
  const label = t('Select Groups');

  return (
    <>
      <GridToolbarContainer>
        <LeftToolbarContainer>
          <SelectLastPeriod
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={props.typeStat}
            typeStatList={statCategoryAggregated}
          />
          <SingleSelect
            minWidth={'12rem'}
            options={props.groupList.map((group) => group.name)}
            value={props.group?.name ? props.group?.name : ''}
            label={label}
            placeHolder={label}
            onChange={(newValue) => handleOnchange(newValue as string)}
          />
        </LeftToolbarContainer>
        <AggregateViewRightToolBar
          totalChar={props.totalChar}
          totalUsers={props.totalGroup}
        />
      </GridToolbarContainer>
    </>
  );
}
