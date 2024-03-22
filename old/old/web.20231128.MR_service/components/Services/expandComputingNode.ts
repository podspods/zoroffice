import { DisplayLineProps } from '@/components/Services/components/DisplayLine';
import { Service } from '@/components/Services/type';
import {
  AVAILABLE_DISK,
  AVAILABLE_MEMORY,
  BUFFER_MEMORY,
  CACHE_MEMORY,
  FREE_DISK,
  FREE_MEMORY,
  HOSTNAME,
  LAST_UPDATE,
  LOAD_AVERAGE,
  NUMBER_OF_CORES,
  NUMBER_OF_INSTANCE,
  OPERATING_SYSTEM,
  STATUS,
  TOTAL_DISK,
  TOTAL_MEMORY,
  UPTIME
} from '@/components/Services/constant';
import { displayByte, durationFromNow } from '@/components/Services/utils';

export default function expandComputingNode({ ...props }: Service): DisplayLineProps[] {
  return [
    {
      label: HOSTNAME,
      value: props.hostname,
      leading: true
    },
    { label: STATUS, value: props.status },
    {
      label: NUMBER_OF_CORES,
      value: props.nbCores ? props.nbCores.toString() : undefined
    },
    { label: OPERATING_SYSTEM, value: props.os },
    {
      label: NUMBER_OF_INSTANCE,
      value: props.nbInstances ? props.nbInstances.toString() : undefined
    },
    { label: TOTAL_MEMORY, value: displayByte(props.totalMemory) },
    { label: AVAILABLE_MEMORY, value: displayByte(props.availableMemory) },
    { label: FREE_MEMORY, value: displayByte(props.freeMemory) },
    { label: CACHE_MEMORY, value: displayByte(props.cachedMemory) },
    { label: BUFFER_MEMORY, value: displayByte(props.buffersMemory) },
    { label: TOTAL_DISK, value: displayByte(props.totalDisk) },
    { label: AVAILABLE_DISK, value: displayByte(props.availableDisk) },
    { label: FREE_DISK, value: displayByte(props.freeDisk) },
    { label: LOAD_AVERAGE, value: displayByte(props.loadAverage) },
    {
      label: UPTIME,
      value: props.uptime ? props.uptime.toString() : undefined
    },
    { label: LAST_UPDATE, value: durationFromNow(props.lastUpdate) }
  ];
}
