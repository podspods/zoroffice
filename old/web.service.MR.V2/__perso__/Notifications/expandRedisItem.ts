
import { Service, ServiceName, Status } from '../../web/app/[lang]/administration/serverManagement/services/serviceType';
import { DisplayLineProps } from '../../web/app/[lang]/administration/serverManagement/services/DisplayLine';
import { displayByte, roundOneDigit } from '../../web/app/[lang]/administration/serverManagement/services/serviceUtils';

export default function expandRedis({ ...props }: Service): DisplayLineProps[] {
  if (!props.data)
    return [
      {
        label: ServiceName.REDIS,
        value: '',
        status: Status.ERROR,
        leading: true
      },
      { label: 'Error No metadata available', value: '', status: Status.ERROR }
    ];

  const redisData = props.data;

  return [
    { label: 'Mode', value: redisData.Server.redis_mode, leading: true },
    { label: 'Bits', value: redisData.Server.arch_bits },
    {
      label: 'uptime',
      value: displayByte(redisData.Server.uptime_in_seconds)
    },
    { label: 'Connected clients', value: redisData.Clients.connected_clients },

    { label: 'Memory', value: '', leading: true },
    {
      label: 'Used memory',
      value: displayByte(redisData.Memory.used_memory),
      column: 1
    },
    {
      label: 'Used memory RSS',
      value: displayByte(redisData.Memory.used_memory_rss),
      column: 1
    },
    {
      label: 'Peak memory consumed',
      value: displayByte(redisData.Memory.used_memory_peak),
      column: 1
    },
    {
      label: 'Memory used by the Lua engine',
      value: displayByte(redisData.Memory.used_memory_lua),
      column: 1
    },
    {
      label: 'Fragmentation ratio',
      value: redisData.Memory.mem_fragmentation_ratio
        ? redisData.Memory.mem_fragmentation_ratio.toString()
        : undefined,
      column: 1
    },

    { label: 'CPU', value: redisData.Server.arch_bits + ' bits', leading: true },
    {
      label: 'System CPU consumed',
      value: redisData.CPU.used_cpu_sys
        ? roundOneDigit(redisData.CPU.used_cpu_sys, '%')
        : undefined,
      column: 1
    },
    {
      label: 'User CPU consumed',
      value: redisData.CPU.used_cpu_user
        ? roundOneDigit(redisData.CPU.used_cpu_user, '%')
        : undefined,
      column: 1
    },
    {
      label: 'System CPU consumed by the background processes',
      value: redisData.CPU.used_cpu_sys_children
        ? roundOneDigit(redisData.CPU.used_cpu_sys_children, '%')
        : undefined,
      column: 1
    },
    {
      label: 'User CPU consumed by the background processes',
      value: redisData.CPU.used_cpu_user_children
        ? roundOneDigit(redisData.CPU.used_cpu_user_children, '%')
        : undefined,
      column: 1
    },

    { label: 'Replication', value: '', leading: true },
    { label: 'Role', value: redisData.Replication.role, column: 1 },
    {
      label: 'Master host',
      value: redisData.Replication.master_host,
      column: 1
    },
    {
      label: 'Master port',
      value: redisData.Replication.master_port,
      column: 1
    },
    {
      label: 'Master link status',
      value: redisData.Replication.master_link_status,
      column: 1
    },
    {
      label: 'Time since the last interaction with master',
      value: redisData.Replication.master_last_io_seconds_ago,
      column: 1
    },
    {
      label: 'The master is SYNCing to the slave',
      value: redisData.Replication.master_sync_in_progress,
      column: 1
    },
    {
      label: 'Bytes left before SYNCing is complete',
      value: redisData.Replication.master_sync_left_bytes,
      column: 1
    },
    {
      label: 'Time since last transfer I/O during a SYNC operation',
      value: redisData.Replication.master_sync_last_io_seconds_ago,
      column: 1
    },
    {
      label: 'Time since the link is down',
      value: redisData.Replication.master_link_down_since_seconds,
      column: 1
    },
    {
      label: 'Connected Slaves',
      value: redisData.Replication.connected_slaves,
      column: 1
    }
  ];
}
