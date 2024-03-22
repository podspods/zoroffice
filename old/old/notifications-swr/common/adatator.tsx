import i18n from '../../../../i18n';
import moment from 'moment';
import { Notification, getClassName, getLevelColor, getLevelId } from './common';
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

function convertDate(jsonDate: string): string {
  const myMoment = moment(jsonDate);
  return myMoment.fromNow().toString();
}

function getMessage({ ...props }: AdatatorProps): string {
<<<<<<< Updated upstream
  const replaceList = [];
  if (props.str.data.filename) replaceList.push({tag: 'filename', value: props.str.data.filename.label});
  if (props.str.data.type) replaceList.push({tag: 'type', value: props.str.data.type.label });
  if (props.str.data.id) replaceList.push({tag: 'id', value: props.str.data.id.label });
  if (props.str.data.upgradeId) replaceList.push({tag: 'upgradeId', value: props.str.data.upgradeId.label });
  if (props.str.data.err) replaceList.push({tag: 'err', value: props.str.data.err.label});


  let message = props.str.display;
  for (const element of replaceList) {
    message = message.replace(`$\{${element.tag}}`, element.value);
  }
=======
  const message = i18n.t(props.str.shift(), { postProcess: 'sprintf', sprintf: props.str.data });

  // const replaceList = [];
  // if (props.str.data.filename) replaceList.push({tag: 'filename', value: props.str.data.filename.label});
  // if (props.str.data.type) replaceList.push({tag: 'type', value: props.str.data.type.label });
  // if (props.str.data.id) replaceList.push({tag: 'id', value: props.str.data.id.label });
  // if (props.str.data.upgradeId) replaceList.push({tag: 'upgradeId', value: props.str.data.upgradeId.label });
  // if (props.str.data.err) replaceList.push({tag: 'err', value: props.str.data.err.label});


  // let message = props.str.display;
  // for (const element of replaceList) {
  //   message = message.replace(`$\{${element.tag}}`, element.value);
  // }
>>>>>>> Stashed changes
  return message;
}

export function adatator({ ...props }: AdatatorProps): Notification {
  return {
    id: props.id,
    mark: i18n.t('marked'),
    level: i18n.t(props.level),
    levelId: getLevelId(props.level),
    levelColor: getLevelColor(props.level),
    rowColor: getClassName(props.level),
    read: props.read,
    insertedAt: i18n.t(convertDate(props.insertedAt)),
    notification: i18n.t(getMessage(props)),
  };
}
