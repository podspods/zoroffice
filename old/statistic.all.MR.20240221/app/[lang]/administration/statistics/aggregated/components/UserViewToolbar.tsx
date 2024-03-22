import { useTranslation } from 'react-i18next';
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';
import { LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SingleSelect, { SelectorProps } from '@/components/SingleSelect';
import SelectTypeStat from '../../components/SelectTypeStat';
import SelectLastPeriod from '../../components/SelectLastPeriod';
import { Account, Period, TypeStat } from '../../components/statisticsType';
import { statCategoryAggregated } from '../../components/statisticsConstant';
import AggregateViewRightToolBar from './AggregateViewRightToolBar';

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
  const label = t('Select Users');

  return (
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
          options={props.accountList.map((account) => account.displayName)}
          value={props.account.displayName}
          label={label}
          placeHolder={label}
          disableClearable
          onChange={handleOnchange}
        />
      </LeftToolbarContainer>
      <AggregateViewRightToolBar totalChar={props.totalChar} />
    </GridToolbarContainer>
  );
}
