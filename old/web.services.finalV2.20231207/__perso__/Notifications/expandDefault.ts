import { Service } from '../../web/app/[lang]/administration/serverManagement/services/serviceType';
import { DisplayLineProps } from '../../web/app/[lang]/administration/serverManagement/services/DisplayLine';
import { durationFromNow } from '../../web/app/[lang]/administration/serverManagement/services/serviceUtils';

export default function expandDefault({
  ...props
}: Service): DisplayLineProps[] {
  return [
    {
      label: props.warning ? 'The status is not up to date' : '',
      value: ''
    },
    {
      label: 'Hostname',
      value: props.hostname,
      leading: true
    },
    { label: 'Status', value: props.status },
    {
      label: 'Last Polling Date',
      value: durationFromNow(props.lastPollingDate)
    },
    {
      label: 'Last Update',
      value: durationFromNow(props.lastUpdate)
    },
    {
      label: 'Last Successful Update',
      value: durationFromNow(props.lastSuccessfulUpdate)
    }
  ];
}
