// import i18n from '../../../../i18n';
import i18next from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';
import moment from 'moment';
import { Notification, getClassName, getLevelColor, getLevelId } from './common';

// import { sprintf, vsprintf} from 'sprintf-js';

// i18next.init({
//   overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler
// });

// i18next
//   .use(sprintf)
//   .init(i18nextOptions);

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

  console.log('i18n 59 ==>',i18next.t(props.str, { postProcess: 'sprintf', sprintf: props.str }));


    // const sprintf = require('sprintf-js').sprintf,
  // vsprintf = require('sprintf-js').vsprintf
  // console.log('sprintf 62 ==>', sprintf(props.str.display, props.str.data));
// console.log('sprintf 63 ==>', sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants'));
// vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s', ['a', 'b', 'c', 'd'])

  const input1 = 'The first 4 letters of the english alphabet are: %s, %s, %s and %s';
  console.log('i18n 50 ==>', i18next.t(input1, { postProcess: 'sprintf', sprintf: ['a', 'b', 'c', 'd'] }));
  const input = 'Hello %(users[0].name)s, %(users[1].name)s and %(users[2].name)s';

  console.log('i18n 57 ==>', i18next.t(input1, 'a', 'b', 'c', 'd') );
  

  console.log('i18n 53 ==>', i18n.t(props.str.display, { postProcess: 'sprintf', sprintf: props.str }));

  const message = i18next.t(input, { postProcess: 'sprintf', sprintf: { users: [{name: 'Dolly'}, {name: 'Molly'}, {name: 'Polly'}] } });
  // const message = i18next.t(props.str.display, { postProcess: 'sprintf', spintf: {props.str.data});
  console.log('message 46 ==>', message);
  // if (props.str.data.filename) replaceList.push({tag: 'filename', value: props.str.data.filename.label});
  // if (props.str.data.type) replaceList.push({tag: 'type', value: props.str.data.type.label });
  // if (props.str.data.id) replaceList.push({tag: 'id', value: props.str.data.id.label });
  // if (props.str.data.upgradeId) replaceList.push({tag: 'upgradeId', value: props.str.data.upgradeId.label });
  // if (props.str.data.err) replaceList.push({tag: 'err', value: props.str.data.err.label});


  // let message = props.str.display;
  // for (const element of replaceList) {
  //   message = message.replace(`$\{${element.tag}}`, element.value);
  // }
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
