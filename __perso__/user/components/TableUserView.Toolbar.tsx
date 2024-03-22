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
  AGGREGATE_BY,
  DATE_PERIOD,
  SELECT_USER,
  TOTAL_CHAR,
  TOTAL_USER,
  statCategory
} from '../../components/statisticsConstant';

import SelectLastPeriod from './SelectLastPeriod';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import { Account } from '../../components/statisticsType';
import { SelectChangeEvent } from '@mui/material';
import StatTextField from '../../components/StatTextField';

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
    const accountFound = props.accountList.find(
      (account: Account) => account.displayName === event.target.value
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
            label={DATE_PERIOD}
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            label={AGGREGATE_BY}
            onChange={props.onChangeTypeStat}
            value={statCategory[props.typeStat]}
          />
          <SelectBox
            label={SELECT_USER}
            defaultValue={
              props.accountList.length > 0
                ? props.accountList[0].displayName
                : ''
            }
            value={props.account.displayName}
            itemList={props.accountList.map((account) => account.displayName)}
            onChange={handleOnchange}
          />
    
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <StatTextField
            // id='outlined-read-only-input'
            label={TOTAL_CHAR}
            value={props.totalChar}
          />
          {/* <TextField
            // id={ID_TOTAL_CHAR}
            label={t(TOTAL_CHAR)}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}
          /> */}

          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
