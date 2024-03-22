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
} from '@/components/Services/constant';
import { Service } from '@/components/Services/type';
import { displayByte, elapsedTime } from '@/components/Services/utils';
import { DisplayLineProps } from '@/components/Services/components/DisplayLine';

export default function expandMongoDb({ ...props }: Service): DisplayLineProps[] {
  return [
    { label: OK, value: props.ok ? TRUE : FALSE },
    {
      label: HOST,
      value: props.hostname,
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
    {
      label: BITS,
      value: props.mem ? props.mem.bits.toString() : '',
      column: 1
    },
    {
      label: RESIDENT,
      value: props.mem ? displayByte(props.mem.resident) : '',
      column: 1
    },
    {
      label: VIRTUAL,
      value: props.mem ? displayByte(props.mem.virtual) : '',
      column: 1
    },
    {
      label: SUPPORTED,
      value: props.mem ? props.mem.supported.toString() : '',
      column: 1
    },
    {
      label: MAPPED,
      value: props.mem ? displayByte(props.mem.mapped) : '',
      column: 1
    },
    {
      label: MAPPED_WITH_JOURNAL,
      value: props.mem ? displayByte(props.mem.mappedWithJournal) : '',
      column: 1
    },
    { label: CONNECTIONS, value: '', leading: true },
    {
      label: CURRENT,
      value: props.connections ? props.connections.current : '',
      column: 1
    },
    {
      label: AVAILABLE,
      value: props.connections ? props.connections.available : '',
      column: 1
    },
    {
      label: TOTAL_CREATED,
      value: props.connections ? props.connections.totalCreated : '',
      column: 1
    },

    { label: NETWORK, value: '', leading: true },
    {
      label: BYTES_IN,
      value: props.network ? displayByte(props.network.bytesIn) : '',
      column: 1
    },
    {
      label: BYTES_OUT,
      value: props.network ? displayByte(props.network.bytesOut) : '',
      column: 1
    },
    {
      label: NUMBER_OF_REQUESTS,
      value: props.network ? displayByte(props.network.numRequests) : '',
      column: 1
    },

    { label: REPLICA_SET, value: '', leading: true },
    { label: NAME, value: props.repl ? props.repl.setName : '', column: 1 },
    {
      label: IS_MASTER,
      value: props.repl ? (props.repl.ismaster ? TRUE : FALSE) : '',
      column: 1
    },
    {
      label: SECONDARY,
      value: props.repl ? (props.repl.secondary ? TRUE : FALSE) : '',
      column: 1
    },
    { label: PRIMARY, value: props.repl ? props.repl.primary : '', column: 1 },
    { label: ME, value: props.repl ? props.repl.me : '', column: 1 }
  ];
}
