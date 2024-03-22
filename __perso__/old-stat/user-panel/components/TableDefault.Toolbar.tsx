/* eslint-disable no-console */
import { SelectChangeEvent } from '@mui/material/Select';
import {
  GridToolbarContainer,
  GridToolbarExport
} from '@systran/react-components/lib/organisms/Table/Table';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { useTranslation } from 'react-i18next';
import SelectBox from '@/components/SelectBox';
import { User } from './TableDefault';
import { useState } from 'react';
import SelectTypeStat from './SelectTypeStat';
import { Group, statCategory } from './statisticsType';

type UserToolbarProps = {
  // onChange: (event: SelectChangeEvent<string>) => void;
  totalChar: number;
  totalUsers: number;
  // setDateValue: (value: DateRange<Dayjs>) => void;
  onChangeGroup: (groupId: string) => void;
  onChangePeriod: (period: string) => void;
  onChangeTypeStat: (typeStat: string) => void;
  groupList: Group[];
  periodList: string[];
};

export default function DefaultToolbar({ ...props }: UserToolbarProps) {
  const { t } = useTranslation();
  console.log(' props 38==>', props);
  // console.log(' valueList 33==>', props.valueList);
  // console.log(' periodList 33==>', props.periodList);

  const [groupName, setGroupName] = useState<string>(
    props.groupList.length > 0 ? props.groupList[0].name : ''
  );
  const [period, setPeriod] = useState<string>(
    props.periodList.length > 0 ? props.periodList[0] : ''
  );
  const [typeStat, SetTypeStat] = useState<string>(statCategory[0]);

  const handleChangePeriod = (event: SelectChangeEvent<string>) => {
    const period = event.target.value;
    setPeriod(period);
    props.onChangePeriod(period);
  };

  const handleChangeGroup = (event: SelectChangeEvent<string>) => {
    const groupName = event.target.value;
    setGroupName(groupName ? groupName : '');
    const groupSelect = props.groupList.find(
      (group) => group.name === groupName
    );
    props.onChangeGroup(groupSelect ? groupSelect.id : '');
  };

  const groupNameList: string[] = props.groupList
    ? props.groupList.map((group: Group) => group.name)
    : [];
  // console.log(' userList 33==>', userList);

  const handleChange = (typeStat: string) => {
    SetTypeStat(typeStat);
    props.onChangeTypeStat(typeStat);
  };

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
          <SelectTypeStat onChange={handleChange} />
          <SelectBox
            defaultValue={groupNameList.length > 0 ? groupNameList[0] : ''}
            value={groupName}
            // placeholder={'User'}
            itemList={groupNameList}
            onChange={handleChangeGroup}
            // sx?: SxProps;
          />
          <SelectBox
            defaultValue={props.periodList[0]}
            value={period}
            // name?: string;
            // placeholder?: string;
            // itemList={
            //   props.periodList
            //     ? props.periodList.map((value: string) => value)
            //     : []
            // }
            itemList={props.periodList}
            // itemList={[]}
            onChange={handleChangePeriod}
            // sx?: SxProps;
          />
          <TextField
            id='outlined-read-only-input'
            label={t('Total Characters')}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id='outlined-read-only-input'
            label={t('Total Users')}
            value={props.totalUsers}
            InputProps={{
              readOnly: true
            }}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer style={{ paddingRight: '3rem' }}>
          <GridToolbarExport />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
