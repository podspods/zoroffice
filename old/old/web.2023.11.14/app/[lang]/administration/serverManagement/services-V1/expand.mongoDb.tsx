import React from 'react';
import {
  AVAILABLE,
  BITS,
  BYTES_IN,
  BYTES_OUT,
  CONNECTIONS,
  CURRENT,
  FALSE,
  HOST,
  IS_MASTER,
  MAPPED,
  MAPPED_WITH_JOURNAL,
  ME,
  MEMORY,
  NAME,
  NETWORK,
  NUMBER_OF_REQUESTS,
  OK,
  PRIMARY,
  PROCESS,
  REPLICA_SET,
  RESIDENT,
  SECONDARY,
  SUPPORTED,
  TOTAL_CREATED,
  TRUE,
  UPTIME_ESTIMATE,
  UPTIME_LABEL,
  UPTIME_MS,
  VERSION,
  VIRTUAL
} from './services.constant';
import { Service } from './services.type';
import { displayByte, elapsedTime } from './services';

import { DisplayLineProps } from 'app/[lang]/administration/serverManagement/services/components/DisplayLine';


export function expandMongoDb({ ...props }: Service): DisplayLineProps[] {
  return [
    { label: OK, value: props.ok ? TRUE : FALSE },

    {
      label: HOST,
      value: '',
      innerHtml: <React.Fragment>{props.hostname}</React.Fragment>,
      leading: true
    },
    { label: VERSION, value: props.version },
    { label: PROCESS, value: props.process },
    { label: UPTIME_LABEL, value: elapsedTime(props.uptime) },
    {
      label: UPTIME_MS,
      value: props.uptimeMillis ? props.uptimeMillis.toString() : undefined,
      column: 0
    },
    {
      label: UPTIME_ESTIMATE,
      value: elapsedTime(props.uptimeEstimate),
      column: 0
    },

    { label: MEMORY, value: '', leading: true },
    { label: BITS, value: props.mem.bits.toString(), column: 1 },
    { label: RESIDENT, value: displayByte(props.mem.resident), column: 1 },
    { label: VIRTUAL, value: displayByte(props.mem.virtual), column: 1 },
    { label: SUPPORTED, value: props.mem.supported.toString(), column: 1 },
    { label: MAPPED, value: displayByte(props.mem.mapped), column: 1 },
    {
      label: MAPPED_WITH_JOURNAL,
      value: displayByte(props.mem.mappedWithJournal),
      column: 1
    },

    { label: CONNECTIONS, value: '', leading: true },
    { label: CURRENT, value: props.connections.current, column: 1 },
    { label: AVAILABLE, value: props.connections.available, column: 1 },
    {
      label: TOTAL_CREATED,
      value: props.connections.totalCreated,
      column: 1
    },

    { label: NETWORK, value: '', leading: true },
    {
      label: BYTES_IN,
      value: displayByte(props.network.bytesIn),
      column: 1
    },
    {
      label: BYTES_OUT,
      value: displayByte(props.network.bytesOut),
      column: 1
    },
    {
      label: NUMBER_OF_REQUESTS,
      value: displayByte(props.network.numRequests),
      column: 1
    },

    { label: REPLICA_SET, value: '', leading: true },
    { label: NAME, value: props.repl.setName, column: 1 },
    {
      label: IS_MASTER,
      value: props.repl.ismaster ? TRUE : FALSE,
      column: 1
    },
    {
      label: SECONDARY,
      value: props.repl.secondary ? TRUE : FALSE,
      column: 1
    },
    { label: PRIMARY, value: props.repl.primary, column: 1 },
    { label: ME, value: props.repl.me, column: 1 }
  ];
}
