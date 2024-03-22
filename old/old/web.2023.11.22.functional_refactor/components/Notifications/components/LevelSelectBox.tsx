import React from 'react';
import { SelectBox } from '@/components/Notifications/components/SelectBox';
import { LEVEL_LIST } from '@/components/Notifications/constant';
import { selectLevel } from '@/components/Notifications/store';

export type LevelSelectBoxProps = {
  currentLevel: string;
};

export default function LevelSelectBox({ ...props }: LevelSelectBoxProps) {
  return (
    <SelectBox
      sx={{
        '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }
      }}
      itemList={LEVEL_LIST}
      onChange={selectLevel}
      value={props.currentLevel}
    />
  );
}
