import SelectBox from '@/components/SelectBox';
import {
  AGGREGATE_BY,
  statCategory
} from '../../components/statisticsConstant';
import { useTranslation } from 'react-i18next';

export type SelectTypeStatProps = {
  onChange: (statType: string) => void;
  label?: string;
  value: string;
};
export default function SelectTypeStat({
  label = AGGREGATE_BY,
  ...props
}: SelectTypeStatProps) {
  const { t } = useTranslation();

  return (
    <>
      <SelectBox
        label={t(label)}
        value={props.value}
        itemList={statCategory}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
}
