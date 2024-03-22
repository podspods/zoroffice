/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
import moment from 'moment';
import {
  Notification,
  convertMessage,
  getClassName,
  getLevelColor,
  getLevelId
} from './notification.common';
import { useTranslation } from 'react-i18next';
import { durationFromNow } from '@/app/[lang]/administration/serverManagement/services/services';

// should use zod for those data type
type TypeDefinition = {
  type: string;
  value: string | number;
  label?: string;
};
type Data = {
  filename?: TypeDefinition;
  type?: TypeDefinition;
  id?: TypeDefinition;
  upgradeId?: TypeDefinition;
  err?: TypeDefinition;
};

type Str = {
  display: string;
  data: Data;
  v: number;
};

export type AdatatorProps = {
  id: string;
  insertedAt: string;
  level: string;
  str?: Str;
  read: boolean;
  pushed?: boolean;
};



export function adatator({ ...props }: AdatatorProps): Notification {
  const { t } = useTranslation();
  return {
    id: props.id,
    mark: t('marked'),
    level: props.level,
    levelId: getLevelId(props.level),
    levelColor: getLevelColor(props.level),
    rowColor: getClassName(props.level),
    read: props.read,
    insertedAt: t(durationFromNow(props.insertedAt)),
    notification: convertMessage(props.str)
    // notification: 'texte message'
  };
}
