import SelectBox from '@/components/SelectBox';
import { useTranslation } from 'react-i18next';
import { PERIOD } from '../../components/statisticsConstant';

export type SelectLastPeriodProps = {
  onChange: (statType: string) => void;
  value: string;
  lastPeriodList: string[];
  label?: string;
};
export default function SelectLastPeriod({
  label = PERIOD,
  ...props
}: SelectLastPeriodProps) {
  const { t } = useTranslation();

  return (
    <>
      <SelectBox
        defaultValue={props.lastPeriodList[props.lastPeriodList.length - 1]}
        value={props.value}
        label={t(label)}
        itemList={props.lastPeriodList}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
}
