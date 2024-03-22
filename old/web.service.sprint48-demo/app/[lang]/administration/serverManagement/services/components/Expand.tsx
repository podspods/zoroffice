import { GridRowParams, GridValidRowModel } from '@mui/x-data-grid-pro';
import React from 'react';
import { Nodes, Service, ServiceName, Status } from './serviceType';
import DisplayLine, { DisplayLineProps } from './DisplayLine';
import {
  displayByte,
  durationFromNow,
  elapsedTime,
  roundOneDigit
} from './serviceUtils';
import LinkTo from './LinkTo';

export default function Expand(
  params: GridRowParams<GridValidRowModel>
): React.ReactNode {
  const service: Service = {
    hostname: '',
    status: '',
    name: '',
    ...params.row
  };

  const lineList: DisplayLineProps[] = expandText(service);
  if (lineList && lineList.length > 0) {
    return (
      <React.Fragment>
        {lineList.map((oneLine, index) => {
          const lineKey = `${oneLine.label ? oneLine.label : index}_${
            oneLine.value ? oneLine.value : index
          }`;
          return (
            <DisplayLine
              key={lineKey}
              label={oneLine.label}
              status={oneLine.status}
              innerHtml={oneLine.innerHtml}
              value={oneLine.value}
              column={oneLine.column}
              leading={oneLine.leading}
            />
          );
        })}
      </React.Fragment>
    );
  }
  return null;
}

function expandText(props: Service): DisplayLineProps[] {
  if (!props || !props.name) return [];
  let itemList: DisplayLineProps[] = [];

  switch (props.name) {
    case ServiceName.MONGO_DB:
      itemList = expandMongoDb(props);
      break;
    case ServiceName.RABIT_MQ:
      itemList = expandRabbitMQ(props);
      break;
    case ServiceName.REDIS:
    case ServiceName.REDIS_NODE:
      itemList = expandRedis(props);
      break;
    case ServiceName.COMPUTING_NODE:
      itemList = expandComputingNode(props);
      break;
    case ServiceName.TRS_POLLER:
    case ServiceName.TRS_CONSOLE:
    case ServiceName.SES_CONSOLE:
    case ServiceName.ELASTIC_SEARCH:
    case ServiceName.TM_INDEXER:
    case ServiceName.GATEWAY:
    case ServiceName.LOOKUP_SERVER:
    case ServiceName.DCT_INDEXER:
    case ServiceName.GDICT:
    case ServiceName.DISPATCHER:
    case ServiceName.ROUTING_SERVER:
    case ServiceName.CORPUS_MANAGER:
    case ServiceName.BROKER:
    case ServiceName.ACTIVITY_SERVER:
    default:
      itemList = expandDefault(props);
      break;
  }
  return itemList;
}

function expandComputingNode({ ...props }: Service): DisplayLineProps[] {
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

function expandDefault({ ...props }: Service): DisplayLineProps[] {
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

function expandMongoDb({ ...props }: Service): DisplayLineProps[] {
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

function expandRabbitMQ({ ...props }: Service): DisplayLineProps[] {
  if (!props.data) {
    return [
      {
        label: ServiceName.RABIT_MQ,
        value: '',
        status: Status.ERROR,
        leading: true
      },
      { label: 'Error No metadata available', value: '', status: Status.ERROR }
    ];
  }
  let nodesList: DisplayLineProps[][] = [];
  if (props.data.nodes) {
    nodesList = props.data.nodes.map((oneNode: Nodes) => {
      return [
        {
          label: 'Cluster name',
          value: oneNode.name,
          leading: true,
          column: 1
        },
        {
          label: 'Running',
          value: oneNode.running ? 'true' : 'false',
          column: 2,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR
        },
        {
          label: 'File descriptors',
          value: `${oneNode.fd_used} (${oneNode.fd_total} "Available")`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Sockets descriptors',
          value: `${oneNode.sockets_used} (${oneNode.sockets_total} "Available")`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Erlang process',
          value: `${oneNode.proc_used} (${oneNode.proc_total} "Available")`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Memory',
          value: `${displayByte(oneNode.mem_used)} (${displayByte(
            oneNode.mem_limit
          )} "high watermark")`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Disk space',
          value: `${displayByte(oneNode.disk_free)} (${displayByte(
            oneNode.disk_free_limit
          )} "high watermark")`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Uptime',
          value: oneNode.uptime ? elapsedTime(oneNode.uptime) : '',
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: 'Type',
          value: oneNode.type,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        }
      ];
    });
  }

  const body = [
    { label: 'Cluster name', value: props.data.overview.cluster_name },
    { label: 'RabbitMQ version', value: props.data.overview.rabbitmq_version },
    { label: 'Queued messages', value: '', leading: true },

    {
      label: 'Ready',
      value: props.data.overview.queue_totals.messages_ready
        ? props.data.overview.queue_totals.messages_ready.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Unacknowledged',
      value: props.data.overview.queue_totals.messages_unacknowledged
        ? props.data.overview.queue_totals.messages_unacknowledged.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Total',
      value: props.data.overview.queue_totals.messages
        ? props.data.overview.queue_totals.messages.toString()
        : undefined,
      column: 1
    },
    { label: 'Global counts', value: '', leading: true },
    {
      label: 'Connections',
      value: props.data.overview.object_totals.connections
        ? props.data.overview.object_totals.connections.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Channels',
      value: props.data.overview.object_totals.channels
        ? props.data.overview.object_totals.channels.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Exchanges',
      value: props.data.overview.object_totals.exchanges
        ? props.data.overview.object_totals.exchanges.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Queues',
      value: props.data.overview.object_totals.queues
        ? props.data.overview.object_totals.queues.toString()
        : undefined,
      column: 1
    },
    {
      label: 'Consumers',
      value: props.data.overview.object_totals.consumers
        ? props.data.overview.object_totals.consumers.toString()
        : undefined,
      column: 1
    },
    { label: 'Nodes', value: '', leading: true }
  ];

  let finale: DisplayLineProps[] = [...body];

  if (nodesList.length > 0) {
    for (const node of nodesList) {
      finale = [...finale, ...node];
    }
  }

  return [
    ...finale,
    {
      label: '',
      value: '',
      innerHtml: LinkTo({
        link: 'http://rabbitmq:15672/',
        label: 'More details on the RabbitMQ Management page'
      }),
      leading: true
    }
  ];
}

function expandRedis({ ...props }: Service): DisplayLineProps[] {
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

    {
      label: 'CPU',
      value: redisData.Server.arch_bits + ' bits',
      leading: true
    },
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
