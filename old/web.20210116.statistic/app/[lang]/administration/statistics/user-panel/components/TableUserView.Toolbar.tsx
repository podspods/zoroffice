/* eslint-disable no-console */
import { SelectChangeEvent } from '@mui/material/Select';
import CalendarIcon from '@systran/react-components/lib/atoms/Icons/CalendarIcon';
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
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import SelectBox from '@/components/SelectBox';
import { User } from './TableDefault';
import { useState } from 'react';
import SelectTypeStat from './SelectTypeStat';
import { statCategory } from './statisticsType';

type UserToolbarProps = {
  // onChange: (event: SelectChangeEvent<string>) => void;
  totalChar: number;
  totalUsers: number;
  // setDateValue: (value: DateRange<Dayjs>) => void;
  onChangeUser: (userId: string) => void;
  onChangePeriod: (period: string) => void;
  onChangeTypeStat: (typeStat: string) => void;
  valueList: User[];
  periodList: string[];
};

export default function UserViewToolbar({ ...props }: UserToolbarProps) {
  const { t } = useTranslation();
  console.log(' props 38==>', props);
  // console.log(' valueList 33==>', props.valueList);
  // console.log(' periodList 33==>', props.periodList);

  const [userName, setUserName] = useState<string>(
    props.valueList.length > 0 ? props.valueList[0].displayName : ''
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

  const handleChangeUser = (event: SelectChangeEvent<string>) => {
    const userName = event.target.value;
    setUserName(userName ? userName : '');
    const UserSelect = props.valueList.find(
      (user) => user.displayName === userName
    );
    props.onChangeUser(UserSelect ? UserSelect.id : '');
  };

  const userList: string[] = props.valueList
    ? props.valueList.map((value: User) => value.displayName)
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
            defaultValue={userList.length > 0 ? userList[0] : ''}
            value={userName}
            // placeholder={'User'}
            itemList={userList}
            onChange={handleChangeUser}
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

