import { DisplayLineProps } from './components/DisplayLine';
import { Service } from './services.type';
import {
  HOSTNAME,
  LAST_POLLING_DATE,
  LAST_SUCCESSFUL_UPDATE,
  LAST_UPDATE,
  STATUS,
  STATUS_NOT_UP_TO_DATE
} from './services.constant';
import { durationFromNow } from './services';
import React from 'react';

export function expandDefault({ ...props }: Service): DisplayLineProps[] {
  return [
    {
      label: props.warning ? STATUS_NOT_UP_TO_DATE : '',
      value: ''
    },
    {
      label: HOSTNAME,
      value: '',
      innerHtml: <React.Fragment>: {props.hostname}</React.Fragment>,
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
