import SingleSelect, { SelectorProps } from '@/components/SingleSelect';
import { t } from 'i18next';
import { Period } from './statisticsType';

export type SelectLastPeriodProps = {
  onChange: (period: Period) => void;
  value: Period;
  lastPeriodList: Period[];
  label?: string;
};
export default function SelectLastPeriod({
  label = 'Date Period',
  ...props
}: SelectLastPeriodProps) {
  const handleChange = (newValue: SelectorProps) => {
    const periodSelected = newValue as string;
    const periodFound: Period | undefined = props.lastPeriodList.find(
      (period: Period) => {
        const [monthPart, yearPart] = period.monthString.split(' ');
        const periodToCompare = `${t(monthPart)} ${yearPart}`;
        return periodToCompare === periodSelected;
      }
    );
    if (periodFound) props.onChange(periodFound);
    else props.onChange(props.lastPeriodList[0]);
  };
  const periodList = props.lastPeriodList.map((period: Period) => {
    const [monthPart, yearPart] = period.monthString.split(' ');
    return `${t(monthPart)} ${yearPart}`;
  });
  const labelSelect = props.value
    ? `${t(props.value.monthString.split(' ')[0])} ${
      props.value.monthString.split(' ')[1]
    }`
    : `${periodList[0]}`;

  const textLabel = t(label);
  return (
    <SingleSelect
      minWidth={'12rem'}
      options={periodList}
      label={textLabel}
      placeHolder={textLabel}
      value={labelSelect}
      disableClearable
      onChange={handleChange}
    />
  );
}
