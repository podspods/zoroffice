import { Nodes, Service, ServiceName, Status } from '../../web/app/[lang]/administration/serverManagement/services/serviceType';
import { DisplayLineProps } from '../../web/app/[lang]/administration/serverManagement/services/DisplayLine';
import { displayByte, elapsedTime } from '../../web/app/[lang]/administration/serverManagement/services/serviceUtils';
import LinkTo from '../../web/app/[lang]/administration/serverManagement/services/LinkTo';

export default function expandRabbitMQ({
  ...props
}: Service): DisplayLineProps[] {
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
