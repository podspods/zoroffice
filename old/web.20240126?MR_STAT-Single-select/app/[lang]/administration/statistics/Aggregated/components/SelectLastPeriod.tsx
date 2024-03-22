import SingleSelect from '@/components/SingleSelect';
import { PERIOD } from '../../components/statisticsConstant';

export type SelectLastPeriodProps = {
  onChange: (statType: string) => void;
  value: string;
  lastPeriodList: string[];
  label?: string;
  name?: string;
};
export default function SelectLastPeriod({
  label = PERIOD,
  ...props
}: SelectLastPeriodProps) {
  return (
    <>
      <SingleSelect
        width={'150px'}
        options={props.lastPeriodList}
        value={props.value}
        label={label}
        placeHolder={label}
        disableClearable
        onChange={(newValus) => props.onChange(newValus as string)}
      />
    </>
  );
}
