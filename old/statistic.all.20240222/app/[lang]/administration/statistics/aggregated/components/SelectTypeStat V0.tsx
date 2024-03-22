import SingleSelect from '@/components/SingleSelect';
import { useTranslation } from 'react-i18next';
import { TypeStat } from '../../components/statisticsType';

export type SelectTypeStatProps = {
  onChange: (statType: TypeStat) => void;
  label?: string;
  value: TypeStat;
  typeStatList: TypeStat[]
};
export default function SelectTypeStat({
  label = 'Aggregate by',
  ...props
}: SelectTypeStatProps) {
  const { t } = useTranslation();
  const handleChange = (newTypeStat: string) => {
    const typeStatFound: TypeStat | undefined = props.typeStatList.find(
      (typeStat) => t(typeStat.label) === newTypeStat
    );
    if (typeStatFound) props.onChange(typeStatFound);
    else props.onChange(props.typeStatList[0]);
  };
  const optionList = props.typeStatList.map((typeStat) => t(typeStat.label));
  return (
    <>
      <SingleSelect
        width={'200px'}
        options={optionList}
        value={props.value.label ? t(props.value.label) : ''}
        label={t(label)}
        placeHolder={t(label)}
        disableClearable
        onChange={(newValue) => handleChange(newValue as string)}
      />
    </>
  );
}
