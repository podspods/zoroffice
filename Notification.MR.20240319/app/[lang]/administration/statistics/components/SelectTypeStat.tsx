import SingleSelect, { SelectorProps } from '@/components/SingleSelect';
import { useTranslation } from 'react-i18next';
import { TypeStat } from './statisticsType';

export type SelectTypeStatProps = {
  onChange: (statType: TypeStat) => void;
  label?: string;
  value: TypeStat;
  typeStatList: TypeStat[];
};
export default function SelectTypeStat({
  label = 'Aggregate by',
  ...props
}: SelectTypeStatProps) {
  const { t } = useTranslation();
  const handleChange = (newSelectValue: SelectorProps) => {
    const newTypeStat = newSelectValue as string;
    const typeStatFound = props.typeStatList.find(
      (typeStat) => t(typeStat.label) === newTypeStat
    );
    if (typeStatFound) props.onChange(typeStatFound);
    else props.onChange(props.typeStatList[0]);
  };
  const optionList = props.typeStatList.map((typeStat) => t(typeStat.label));
  const value = props?.value?.label ? t(props.value.label) : '';
  const textLabel = t(label);
  return (
    <SingleSelect
      minWidth={'10rem'}
      options={optionList}
      value={value}
      label={textLabel}
      placeHolder={textLabel}
      disableClearable
      onChange={handleChange}
    />
  );
}
