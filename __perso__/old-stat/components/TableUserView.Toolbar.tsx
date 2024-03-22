/* eslint-disable no-console */
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { useTranslation } from 'react-i18next';

import SelectBox from '@/components/SelectBox';
import SelectTypeStat from './SelectTypeStat';
import {
  TOTAL_CHAR,
  TOTAL_USER,
  statCategory
} from '../../components/statisticsConstant';

import SelectLastPeriod from './SelectLastPeriod';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import { Account } from '../../components/statisticsType';
import { SelectChangeEvent } from '@mui/material';

type UserToolbarProps = {
  totalChar: number;
  totalAccount: number;
  onChangeAccount: (account: Account) => void;
  onChangePeriod: (period: string) => void;
  accountList: Account[];
  onChangeTypeStat: (typeStat: string) => void;
  periodList: string[];
  period: string;
  typeStat: number;
  account: Account;
};

export default function UserViewToolbar({ ...props }: UserToolbarProps) {
  const { t } = useTranslation();

  const handleOnchange = (event: SelectChangeEvent) => {
    const userName = event.target.value;
    const accountFound = props.accountList.find(
      (account: Account) => account.displayName === userName
    );
    if (accountFound) props.onChangeAccount(accountFound);
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

          <SelectLastPeriod
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={statCategory[props.typeStat]}
          />
          <SelectBox
            defaultValue={
              props.accountList.length > 0
                ? props.accountList[0].displayName
                : ''
            }
            value={props.account.displayName}
            // placeholder={'User'}
            itemList={props.accountList.map((account) => account.displayName)}
            // onChange={(event) => props.onChangeAccount(event.target.value)}
            onChange={handleOnchange}
            // sx?: SxProps;
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <TextField
            id='outlined-read-only-input'
            label={t(TOTAL_CHAR)}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}
          />


          <TextField
            id='outlined-read-only-input'
            label={t(TOTAL_USER)}
            value={props.totalAccount}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}
          />
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
