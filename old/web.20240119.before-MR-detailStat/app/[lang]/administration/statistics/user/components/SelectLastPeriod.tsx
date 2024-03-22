import SelectBox from '@/components/SelectBox';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { statCategory } from './statisticsType';

export type SelectLastPeriodProps = {
  onChange: (statType: string) => void;
  value: string;
  lastPeriodList: string[];
};
export default function SelectLastPeriod({ ...props }: SelectLastPeriodProps) {
  // const [period, SetPeriod] = useState<string>(props.lastPeriodList[props.lastPeriodList.length - 1]);

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   SetPeriod(event.target.value);
  //   props.onChange(event.target.value);
  // };

  return (
    <>
      <SelectBox
        defaultValue={props.lastPeriodList[props.lastPeriodList.length - 1]}
        value={props.value}
        itemList={props.lastPeriodList}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
}
