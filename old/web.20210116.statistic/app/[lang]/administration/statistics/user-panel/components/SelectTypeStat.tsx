import SelectBox from '@/components/SelectBox';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { statCategory } from './statisticsType';

export type SelectTypeStatProps = {
  onChange: (statType: string) => void;
};
export default function SelectTypeStat({ ...props }: SelectTypeStatProps) {
  const [typeStat, SetTypeStat] = useState<string>(statCategory[0]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    SetTypeStat(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <>
      <SelectBox
        defaultValue={statCategory[0]}
        value={typeStat}
        itemList={statCategory}
        onChange={handleChange}
      />
    </>
  );
}
