import SelectBox from '@/components/SelectBox';
import {
  AGGREGATE_BY,
  statCategory
} from '../../components/statisticsConstant';

export type SelectTypeStatProps = {
  onChange: (statType: string) => void;
  label?: string;
  value: string;
  name?: string;
};
export default function SelectTypeStat({
  label = AGGREGATE_BY,
  ...props
}: SelectTypeStatProps) {
  return (
    <>
      <SelectBox
        sx={{ height: '40px' }}
        name={props.name}
        label={label}
        value={props.value}
        itemList={statCategory}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
}
