import { DisplayLineProps } from '@/components/Services/components/DisplayLine';
import { Service, ServiceName, Status } from '@/components/Services/type';
import {
  MODE,
  BITS,
  UPTIME,
  CONNECTED_CLIENTS,
  MEMORY,
  USED_MEMORY,
  USED_MEMORY_RSS,
  PEAK_MEMORY_CONSUMED,
  MEMORY_USED_BY_THE_LUA_ENGINE,
  FRAGMENTATION_RATIO,
  CPU,
  SYSTEME_CPU_CONSUMED,
  USER_CPU_CONSUMED,
  SYSTEME_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES,
  USER_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES,
  REPLICATION,
  ROLE,
  MASTER_HOST,
  MASTER_PORT,
  MASTER_LINK_STATUS,
  TIME_SINCE_LAST_INTERACTION_WITH_LASTER,
  MASTER_IS_SINCING_TO_SLAVE,
  BYTES_LEFT_BEFORE_SYNCING_IS_COMPLETE,
  TIME_SINCE_LAST_TRANSFERT_IO_DURING_A_SYNC_OPERATION,
  TIME_SINCE_THE_LINK_IS_DOWN,
  CONNECTED_SLAVES,
  ERROR_NO_DATA
} from '@/components/Services/constant';
import { displayByte, roundOneDigit } from '@/components/Services/utils';

export default function expandRedis({ ...props }: Service): DisplayLineProps[] {
  if (!props.data)
    return [
      {
        label: ServiceName.REDIS,
        value: '',
        status: Status.ERROR,
        leading: true
      },
      { label: ERROR_NO_DATA, value: '', status: Status.ERROR }
    ];

  const redisData = props.data;

  return [
    { label: MODE, value: redisData.Server.redis_mode, leading: true },
    { label: BITS, value: redisData.Server.arch_bits },
    {
      label: UPTIME,
      value: displayByte(redisData.Server.uptime_in_seconds)
    },
    { label: CONNECTED_CLIENTS, value: redisData.Clients.connected_clients },

    { label: MEMORY, value: '', leading: true },
    {
      label: USED_MEMORY,
      value: displayByte(redisData.Memory.used_memory),
      column: 1
    },
    {
      label: USED_MEMORY_RSS,
      value: displayByte(redisData.Memory.used_memory_rss),
      column: 1
    },
    {
      label: PEAK_MEMORY_CONSUMED,
      value: displayByte(redisData.Memory.used_memory_peak),
      column: 1
    },
    {
      label: MEMORY_USED_BY_THE_LUA_ENGINE,
      value: displayByte(redisData.Memory.used_memory_lua),
      column: 1
    },
    {
      label: FRAGMENTATION_RATIO,
      value: redisData.Memory.mem_fragmentation_ratio
        ? redisData.Memory.mem_fragmentation_ratio.toString()
        : undefined,
      column: 1
    },

    { label: CPU, value: redisData.Server.arch_bits + ' bits', leading: true },
    {
      label: SYSTEME_CPU_CONSUMED,
      value: redisData.CPU.used_cpu_sys
        ? roundOneDigit(redisData.CPU.used_cpu_sys, '%')
        : undefined,
      column: 1
    },
    {
      label: USER_CPU_CONSUMED,
      value: redisData.CPU.used_cpu_user
        ? roundOneDigit(redisData.CPU.used_cpu_user, '%')
        : undefined,
      column: 1
    },
    {
      label: SYSTEME_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES,
      value: redisData.CPU.used_cpu_sys_children
        ? roundOneDigit(redisData.CPU.used_cpu_sys_children, '%')
        : undefined,
      column: 1
    },
    {
      label: USER_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES,
      value: redisData.CPU.used_cpu_user_children
        ? roundOneDigit(redisData.CPU.used_cpu_user_children, '%')
        : undefined,
      column: 1
    },

    { label: REPLICATION, value: '', leading: true },
    { label: ROLE, value: redisData.Replication.role, column: 1 },
    {
      label: MASTER_HOST,
      value: redisData.Replication.master_host,
      column: 1
    },
    {
      label: MASTER_PORT,
      value: redisData.Replication.master_port,
      column: 1
    },
    {
      label: MASTER_LINK_STATUS,
      value: redisData.Replication.master_link_status,
      column: 1
    },
    {
      label: TIME_SINCE_LAST_INTERACTION_WITH_LASTER,
      value: redisData.Replication.master_last_io_seconds_ago,
      column: 1
    },
    {
      label: MASTER_IS_SINCING_TO_SLAVE,
      value: redisData.Replication.master_sync_in_progress,
      column: 1
    },
    {
      label: BYTES_LEFT_BEFORE_SYNCING_IS_COMPLETE,
      value: redisData.Replication.master_sync_left_bytes,
      column: 1
    },
    {
      label: TIME_SINCE_LAST_TRANSFERT_IO_DURING_A_SYNC_OPERATION,
      value: redisData.Replication.master_sync_last_io_seconds_ago,
      column: 1
    },
    {
      label: TIME_SINCE_THE_LINK_IS_DOWN,
      value: redisData.Replication.master_link_down_since_seconds,
      column: 1
    },
    {
      label: CONNECTED_SLAVES,
      value: redisData.Replication.connected_slaves,
      column: 1
    }
  ];
}
