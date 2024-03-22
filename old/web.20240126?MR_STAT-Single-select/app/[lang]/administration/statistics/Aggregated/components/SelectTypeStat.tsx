import SingleSelect from '@/components/SingleSelect';
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
      <SingleSelect
        width={'200px'}
        options={statCategory}
        value={props.value}
        label={label}
        placeHolder={label}
        disableClearable
        onChange={(newValus) => props.onChange(newValus as string)}
      />
    </>
  );
}
