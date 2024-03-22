import React from 'react';
import {
  AVAILABLE,
  CHANNELS,
  CLUSTER_NAME,
  CONNECTIONS,
  CONSUMERS,
  DISK_SPACE,
  ERLANG_PROCESS,
  ERROR_NO_DATA,
  EXCHANGES,
  FALSE,
  FILE_DESCRIPTOR,
  GLOBAL_COUNTS,
  HIGH_WATERMARK,
  MEMORY,
  MORE_DETAIL,
  NODE,
  QUEUED_MESSAGES,
  QUEUES,
  RABBITMQ_LINK,
  RABBITMQ_VERSION,
  READY,
  RUNNING,
  SOCKETS_DESCRIPTORS,
  TOTAL,
  TRUE,
  TYPE,
  UNACKNOWLEDGED,
  UPTIME_LABEL
} from './services.constant';
import { DisplayLineProps } from './components/DisplayLine';
import { Link } from '@mui/material';
import { Service, ServiceName, Status } from './services.type';
import { displayByte, elapsedTime } from './services';

export function expandRabbitMQ({ ...props }: Service): DisplayLineProps[] {
  if (!props.data) {
    return [
      {
        label: ServiceName.RABIT_MQ,
        value: '',
        status: Status.ERROR,
        leading: true
      },
      { label: ERROR_NO_DATA, value: '', status: Status.ERROR }
    ];
  }
  let nodesList: DisplayLineProps[][];
  if (props.data.nodes) {
    nodesList = props.data.nodes.map((oneNode) => {
      return [
        {
          label: CLUSTER_NAME,
          value: oneNode.name,
          leading: true,
          column: 1
        },
        {
          label: RUNNING,
          value: oneNode.running ? TRUE : FALSE,
          column: 2,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR
        },
        {
          label: FILE_DESCRIPTOR,
          value: `${oneNode.fd_used} (${oneNode.fd_total} ${AVAILABLE})`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: SOCKETS_DESCRIPTORS,
          value: `${oneNode.sockets_used} (${oneNode.sockets_total} ${AVAILABLE})`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: ERLANG_PROCESS,
          value: `${oneNode.proc_used} (${oneNode.proc_total} ${AVAILABLE})`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: MEMORY,
          value: `${displayByte(oneNode.mem_used)} (${displayByte(
            oneNode.mem_limit
          )} ${HIGH_WATERMARK})`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: DISK_SPACE,
          value: `${displayByte(oneNode.disk_free)} (${displayByte(
            oneNode.disk_free_limit
          )} ${HIGH_WATERMARK})`,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: UPTIME_LABEL,
          value: oneNode.uptime ? elapsedTime(oneNode.uptime) : undefined,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        },
        {
          label: TYPE,
          value: oneNode.type,
          status: oneNode.running ? Status.PRIMARY : Status.ERROR,
          column: 2
        }
      ];
    });
  }

  const body = [
    { label: CLUSTER_NAME, value: props.data.overview.cluster_name },
    { label: RABBITMQ_VERSION, value: props.data.overview.rabbitmq_version },
    { label: QUEUED_MESSAGES, value: '', leading: true },

    {
      label: READY,
      value: props.data.overview.queue_totals.messages_ready
        ? props.data.overview.queue_totals.messages_ready.toString()
        : undefined,
      column: 1
    },
    {
      label: UNACKNOWLEDGED,
      value: props.data.overview.queue_totals.messages_unacknowledged
        ? props.data.overview.queue_totals.messages_unacknowledged.toString()
        : undefined,
      column: 1
    },
    {
      label: TOTAL,
      value: props.data.overview.queue_totals.messages
        ? props.data.overview.queue_totals.messages.toString()
        : undefined,
      column: 1
    },
    { label: GLOBAL_COUNTS, value: '', leading: true },
    {
      label: CONNECTIONS,
      value: props.data.overview.object_totals.connections
        ? props.data.overview.object_totals.connections.toString()
        : undefined,
      column: 1
    },
    {
      label: CHANNELS,
      value: props.data.overview.object_totals.channels
        ? props.data.overview.object_totals.channels.toString()
        : undefined,
      column: 1
    },
    {
      label: EXCHANGES,
      value: props.data.overview.object_totals.exchanges
        ? props.data.overview.object_totals.exchanges.toString()
        : undefined,
      column: 1
    },
    {
      label: QUEUES,
      value: props.data.overview.object_totals.queues
        ? props.data.overview.object_totals.queues.toString()
        : undefined,
      column: 1
    },
    {
      label: CONSUMERS,
      value: props.data.overview.object_totals.consumers
        ? props.data.overview.object_totals.consumers.toString()
        : undefined,
      column: 1
    },
    { label: NODE, value: '', leading: true }
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
      innerHtml: <Link href={RABBITMQ_LINK}>{MORE_DETAIL}</Link>,
      leading: true
    }
  ];
}
