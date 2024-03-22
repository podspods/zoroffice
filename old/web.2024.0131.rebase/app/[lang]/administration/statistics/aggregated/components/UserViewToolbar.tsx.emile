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
import SelectLastPeriod from './SelectLastPeriod';
import { Account, Period, TypeStat } from '../../components/statisticsType';

type UserToolbarProps = {
  totalChar: number;
  totalAccount: number;
  onChangeAccount: (account: Account) => void;
  onChangePeriod: (period: Period) => void;
  accountList: Account[];
  onChangeTypeStat: (typeStat: TypeStat) => void;
  periodList: Period[];
  period: Period;
  typeStat: TypeStat;
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
            options={props.accountList.map((account) => account.displayName)}
            value={props.account.displayName}
            label={'Select Users'}
            placeHolder={'Select Users'}
            disableClearable
            onChange={handleOnchange}
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
