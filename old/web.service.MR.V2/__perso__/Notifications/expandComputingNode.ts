
import { Service } from '../../web/app/[lang]/administration/serverManagement/services/serviceType';
import { DisplayLineProps } from '../../web/app/[lang]/administration/serverManagement/services/DisplayLine';
import { displayByte, durationFromNow } from '../../web/app/[lang]/administration/serverManagement/services/serviceUtils';

export default function expandComputingNode({
  ...props
}: Service): DisplayLineProps[] {
  return [
    {
      label: 'Hostname',
      value: props.hostname,
      leading: true
    },
    { label: 'Status', value: props.status },
    {
      label: 'Number of cores',
      value: props.nbCores ? props.nbCores.toString() : undefined
    },
    { label: 'Operating system', value: props.os },
    {
      label: 'Number of instances',
      value: props.nbInstances ? props.nbInstances.toString() : undefined
    },
    { label: 'Total Memory', value: displayByte(props.totalMemory) },
    { label: 'Available Memory', value: displayByte(props.availableMemory) },
    { label: 'Free Memory', value: displayByte(props.freeMemory) },
    { label: 'Cached Memory', value: displayByte(props.cachedMemory) },
    { label: 'Buffers Memory', value: displayByte(props.buffersMemory) },
    { label: 'Total Disk', value: displayByte(props.totalDisk) },
    { label: 'Available Disk', value: displayByte(props.availableDisk) },
    { label: 'Free Disk', value: displayByte(props.freeDisk) },
    { label: 'Load Average', value: displayByte(props.loadAverage) },
    {
      label: 'uptime',
      value: props.uptime ? props.uptime.toString() : undefined
    },
    { label: 'Last Update', value: durationFromNow(props.lastUpdate) }
  ];
}
