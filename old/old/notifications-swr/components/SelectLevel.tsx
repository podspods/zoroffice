'use client';

import React from 'react';
import GearIcon from '@systran/react-components/lib/atoms/Icons/GearIcon';
import { ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { handleChangeLevel } from '../common/common';
import { LEVEL } from '../common/constant';
import { useStore } from '@nanostores/react';
import {
  notificationStore,
  setCurrentlevel
} from '../store/notifications.store';

export type Item = {
  id: number;
  label: string;
};

export type SelectLevelProps = {
  name?: string;
  itemList?: Item[];
};

export default function SelectLevel({ ...props }: SelectLevelProps) {
  const { currentlevel } = useStore(notificationStore);
  return (
    <React.Fragment>
      <Select
        labelId='demo-simple-select-helper-label'
        id='demo-simple-select-helper'
        value={currentlevel}
        label={props.name}
        onChange={(event) => setCurrentlevel(event.target.value)}
      >
        <MenuItem key={0} value={props.itemList[0].id}>
          {props.itemList[0].label}
        </MenuItem>
        <MenuItem key={1} value={props.itemList[1].id}>
          {props.itemList[1].label}
        </MenuItem>
        <MenuItem key={2} value={props.itemList[2].id}>
          {props.itemList[2].label}
        </MenuItem>
        <MenuItem key={3} value={props.itemList[3].id}>
          {props.itemList[3].label}
        </MenuItem>
        ;
      </Select>
    </React.Fragment>
  );
}
