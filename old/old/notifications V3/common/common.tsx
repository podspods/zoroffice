import { BaseButtonColor } from '@systran/react-components/lib/atoms/Buttons/Base';
import {
  COLOR_ERROR,
  COLOR_INFO,
  COLOR_NORMAL,
  INFO,
  SUCCESS,
} from './constant';

export type Notification = {
  id: string;
  mark: string;
  level: string;
  rowColor: string;
  read: boolean;
  notification: string;
  insertedAt: string;
};

export function findButtonColor(value: string): BaseButtonColor {
  switch (value) {
    case SUCCESS:
      return COLOR_NORMAL;
    case INFO:
      return COLOR_INFO;
    default:
      return COLOR_ERROR;
  }
}

export function handleReadChange(rowId) {
  console.log('handleReadChange event 32 ==>', rowId);
// ????????????????????????
//   mise à jour en local des enregistrements avec rowid =>  read = !read 
//   update base de donnée


  return null;
}

export function getClassName(level: string): string {
  switch (level) {
    case SUCCESS:
      return 'notif-success';
    case INFO:
      return 'notif-info';
    default:
      return 'notif-danger';
  }
}

function DataGridCheckbox(props: SwitchProps) {
  return <Checkbox color="marine" {...props} />
}
