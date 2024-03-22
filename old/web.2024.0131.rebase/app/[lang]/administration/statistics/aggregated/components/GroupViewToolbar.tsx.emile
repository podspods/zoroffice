import { useTranslation } from 'react-i18next';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SingleSelect from '@/components/SingleSelect';
import SelectTypeStat from './SelectTypeStat';
import SelectLastPeriod from './SelectLastPeriod';
import { Group, Period, TypeStat } from '../../components/statisticsType';

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
          <SelectLastPeriod
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={props.typeStat}
          />
          <SingleSelect
            width={'200px'}
            options={props.groupList.map((group) => group.name)}
            value={props.group?.name ? props.group?.name : ''}
            label={'Select Groups'}
            placeHolder={'Select Groups'}
            onChange={(newValue) => handleOnchange(newValue as string)}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <TextField
            label={t('Total Characters')}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: '100px' }}
          />
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
