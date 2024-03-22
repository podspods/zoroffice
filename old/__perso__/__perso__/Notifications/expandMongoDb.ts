
import { Service } from '../../web/app/[lang]/administration/serverManagement/services/serviceType';
import { DisplayLineProps } from '../../web/app/[lang]/administration/serverManagement/services/DisplayLine';
import { displayByte, elapsedTime } from '../../web/app/[lang]/administration/serverManagement/services/serviceUtils';

export default function expandMongoDb({
  ...props
}: Service): DisplayLineProps[] {
  return [
    { label: 'Ok', value: props.ok ? 'true' : 'false' },
    {
      label: 'host',
      value: props.hostname,
      leading: true
    },
    { label: 'Version', value: props.version },
    { label: 'Process', value: props.process },
    { label: 'Uptime', value: elapsedTime(props.uptime) },
    {
      label: 'Uptime millisecond',
      value: props.uptimeMillis ? props.uptimeMillis.toString() : undefined,
      column: 0
    },
    {
      label: 'Uptime estimate',
      value: elapsedTime(props.uptimeEstimate),
      column: 0
    },
    { label: 'Memory', value: '', leading: true },
    {
      label: 'Bits',
      value: props.mem ? props.mem.bits.toString() : '',
      column: 1
    },
    {
      label: 'Resident',
      value: props.mem ? displayByte(props.mem.resident) : '',
      column: 1
    },
    {
      label: 'Virtual',
      value: props.mem ? displayByte(props.mem.virtual) : '',
      column: 1
    },
    {
      label: 'Supported',
      value: props.mem ? props.mem.supported.toString() : '',
      column: 1
    },
    {
      label: 'Mapped',
      value: props.mem ? displayByte(props.mem.mapped) : '',
      column: 1
    },
    {
      label: 'Mapped with journal',
      value: props.mem ? displayByte(props.mem.mappedWithJournal) : '',
      column: 1
    },
    { label: 'Connections', value: '', leading: true },
    {
      label: 'Current',
      value: props.connections ? props.connections.current : '',
      column: 1
    },
    {
      label: 'Available',
      value: props.connections ? props.connections.available : '',
      column: 1
    },
    {
      label: 'Total created',
      value: props.connections ? props.connections.totalCreated : '',
      column: 1
    },

    { label: 'Network', value: '', leading: true },
    {
      label: 'Bytes in',
      value: props.network ? displayByte(props.network.bytesIn) : '',
      column: 1
    },
    {
      label: 'Bytes out',
      value: props.network ? displayByte(props.network.bytesOut) : '',
      column: 1
    },
    {
      label: 'Number of requests',
      value: props.network ? displayByte(props.network.numRequests) : '',
      column: 1
    },

    { label: 'Replica Set', value: '', leading: true },
    { label: 'Name', value: props.repl ? props.repl.setName : '', column: 1 },
    {
      label: 'Is master',
      value: props.repl ? (props.repl.ismaster ? 'true' : 'false') : '',
      column: 1
    },
    {
      label: 'Secondary',
      value: props.repl ? (props.repl.secondary ? 'true' : 'false') : '',
      column: 1
    },
    {
      label: 'Primary',
      value: props.repl ? props.repl.primary : '',
      column: 1
    },
    { label: 'Me', value: props.repl ? props.repl.me : '', column: 1 }
  ];
}
