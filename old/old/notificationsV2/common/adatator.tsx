import i18n from '../../../../i18n';
import moment from 'moment';
import { Notification } from './common';
// should use zod for those data type

type TypeDefinition = {
  type: string;
  value: string;
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
  str: Str;
  read: boolean;
  pushed: boolean;
};

function convertDate(jsonDate: string): string {
  const myMoment = moment(jsonDate);
  return myMoment.fromNow().toString();
}

function getMessage({ ...props }: AdatatorProps): string {
  const replaceList = [
    props.str.data.filename && {tag: 'filename', value: props.str.data.filename.label},
    props.str.data.type && { tag: 'type', value: props.str.data.type.label },
    props.str.data.id && { tag: 'id', value: props.str.data.id.label },
    props.str.data.upgradeId && {tag: 'upgradeId', value: props.str.data.upgradeId.label },
    props.str.data.err && { tag: 'err', value: props.str.data.err.label }
  ];
  console.log('replaceList 47 ==>', replaceList);
  let message = props.str.display;
  for (const element of replaceList) {
    console.log('element 50 ==>', element);
    if (element) {
      const tag = `$\{${element.tag}}`;
      message = message.replace(tag, element.value);
    }
  }
  // for (const replace in replaceList)
  // if (props.str.data.filename)
  //   message = message.replace('${filename}', props.str.data.filename.label);
  // if (props.str.data.type)
  //   message = message.replace('${type}', props.str.data.type.label);
  // if (props.str.data.id)
  //   message = message.replace('${id}', props.str.data.id.label);
  // if (props.str.data.upgradeId)
  //   message = message.replace('${upgradeId}', props.str.data.upgradeId.label);
  // if (props.str.data.err)
  //   message = message.replace('${err}', props.str.data.err.label);

  // const messageReturn = message
  //   .replace('${filename}', props.str.data.filename.label)
  //   .replace('${type}', props.str.data.type.label)
  //   .replace('${id}', props.str.data.id.label)
  //   .replace('${upgradeId}', props.str.data.upgradeId.label)
  //   .replace('${err}', props.str.data.err.label);

  return message;
  // switch (level) {
  //   case 'success':
  //     return message.replace('${filename}', filename);
  //     // `File ${filename}  translated`;
  //   case 'error':
  //     return `Error on  ${filename}`;
  //   default:
  //     return `Info on  ${filename}`;
  //   }
}

export function adatator({ ...props }: AdatatorProps): Notification {
  return {
    id: props.id,
    mark: i18n.t('marked'),
    level: i18n.t(props.level),
    rowColor: `row-color-${props.level}`,
    read: props.read,
    insertedAt: i18n.t(convertDate(props.insertedAt)),
    notification: i18n.t(getMessage(props)),
  };
}
