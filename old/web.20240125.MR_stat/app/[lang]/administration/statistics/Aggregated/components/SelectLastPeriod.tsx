import SelectBox from '@/components/SelectBox';
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
      <SelectBox
        sx={{ height: '40px' }}
        name={props.name}
        defaultValue={props.lastPeriodList[props.lastPeriodList.length - 1]}
        value={props.value}
        label={label}
        itemList={props.lastPeriodList}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
}
