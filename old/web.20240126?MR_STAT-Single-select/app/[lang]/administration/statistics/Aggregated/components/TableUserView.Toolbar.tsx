import { useTranslation } from 'react-i18next';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';

import SingleSelect, { SelectorProps } from '@/components/SingleSelect';
import SelectTypeStat from './SelectTypeStat';
import {
  AGGREGATE_BY,
  DATE_PERIOD,
  SELECT_USER,
  TOTAL_CHAR,
  statCategory
} from '../../components/statisticsConstant';

import SelectLastPeriod from './SelectLastPeriod';
import { Account } from '../../components/statisticsType';

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

  const handleOnchange = (newValue: SelectorProps) => {
    const accountFound = props.accountList.find(
      (account: Account) => account.displayName === newValue
    );
    if (accountFound) props.onChangeAccount(accountFound);
  };

  return (
    <>
      <GridToolbarContainer
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem'}}
      >
        <LeftToolbarContainer>
          <SelectLastPeriod
            name={DATE_PERIOD}
            label={DATE_PERIOD}
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            name={AGGREGATE_BY}
            label={AGGREGATE_BY}
            onChange={props.onChangeTypeStat}
            value={statCategory[props.typeStat]}
          />
          <SingleSelect
            width={'200px'}
            options={props.accountList.map((account) => account.displayName)}
            value={props.account.displayName}
            label={SELECT_USER}
            placeHolder={SELECT_USER}
            disableClearable
            onChange={handleOnchange}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <TextField
            label={t(TOTAL_CHAR)}
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
