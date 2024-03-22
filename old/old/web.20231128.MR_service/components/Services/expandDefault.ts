import { DisplayLineProps } from '@/components/Services/components/DisplayLine';
import { Service } from '@/components/Services/type';
import {
  HOSTNAME,
  LAST_POLLING_DATE,
  LAST_SUCCESSFUL_UPDATE,
  LAST_UPDATE,
  STATUS,
  STATUS_NOT_UP_TO_DATE
} from '@/components/Services/constant';
import { durationFromNow } from '@/components/Services/utils';

export default function expandDefault({ ...props }: Service): DisplayLineProps[] {
  return [
    {
      label: props.warning ? STATUS_NOT_UP_TO_DATE : '',
      value: ''
    },
    {
      label: HOSTNAME,
      value: props.hostname,
      leading: true
    },
    { label: STATUS, value: props.status },
    {
      label: LAST_POLLING_DATE,
      value: durationFromNow(props.lastPollingDate)
    },
    {
      label: LAST_UPDATE,
      value: durationFromNow(props.lastUpdate)
    },
    {
      label: LAST_SUCCESSFUL_UPDATE,
      value: durationFromNow(props.lastSuccessfulUpdate)
    }
  ];
}
