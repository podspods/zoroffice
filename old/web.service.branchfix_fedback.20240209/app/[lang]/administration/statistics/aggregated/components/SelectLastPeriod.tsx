import SingleSelect from '@/components/SingleSelect';
import { t } from 'i18next';
import { Period } from '../../components/statisticsType';

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
  const handleChange = (periodSelected: string) => {
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
    ? `${t(props.value.monthString.split(' ')[0])} ${props.value.monthString.split(' ')[1]}`
    : `${periodList[0]}`;
  return (
    <>
      <SingleSelect
        width={'200px'}
        options={periodList}
        label={t(label)}
        placeHolder={t(label)}
        value={labelSelect}
        disableClearable
        onChange={(newValue) => handleChange(newValue as string)}
      />
    </>
  );
}
