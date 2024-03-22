import { BaseButtonColor } from '@systran/react-components/lib/atoms/Buttons/Base';
import { ERROR, INFO, NORMAL } from './constant';

export type Notification = {
  id: string;
  mark: string;
  level: string;
  rowColor: string;
  read: boolean;
  notification: string;
  insertedAt: string;
};

export function classRowColor(level: string): string {
  switch (level) {
    case 'success': return 'notif-success';
    case 'error': return 'notif-danger';
    case 'info': return 'notif-info';
    default : return 'notif-info';
  }
}

export function findButtonColor(value: string): BaseButtonColor {
  switch (value) {
    case 'success':
      return NORMAL;
    case 'error':
      return ERROR;
    default:
      return INFO;
  }
}

export function handleReadChange() {
  return null;
}

