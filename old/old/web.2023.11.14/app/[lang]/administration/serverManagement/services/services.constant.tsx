import React from 'react';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {
  setModalRegisterVisible,
  deRegisterByEllipsis,
  deRegisterByToolBar,
  setModalDeRegisterVisible
} from './services.store';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Service } from './services.type';


export const isToasted = false;

export const PAGE_NAME = 'Service Status';
export const EMPTY = '';
export const STATUS = 'Status';
export const NAME = 'Name';
export const HOSTNAME = 'Hostname';
export const HOST = 'Host';
export const VERSION = 'Version';

export const FIELD_STATUS = 'status';
export const FIELD_NAME = 'name';
export const FIELD_HOSTNAME = 'hostname';
export const FIELD_VERSION = 'version';


export const LAST_POLLING_DATE = 'Last Polling Date';
export const LAST_UPDATE = 'Last Update';
export const LAST_SUCCESSFUL_UPDATE = 'Last Successful Update';
export const OK = 'ok';
export const PROCESS = 'Process';
export const UPTIME_LABEL = 'Uptime';
export const UPTIME = 'uptime';
export const UPTIME_MS = 'Uptime millisecond';
export const UPTIME_ESTIMATE = 'Uptime estimate';
export const LOCAL_TIME = 'Local time';
export const TRUE = 'true';
export const FALSE = 'false';

export const MEMORY = 'Memory';
export const BITS = 'Bits';
export const RESIDENT = 'Resident';
export const VIRTUAL = 'Virtual';
export const SUPPORTED = 'Supported';
export const MAPPED = 'Mapped';
export const MAPPED_WITH_JOURNAL = 'Mapped with journal';

export const CONNECTIONS = 'Connections';
export const CURRENT = 'Current';
export const AVAILABLE = 'Available';
export const TOTAL_CREATED = 'Total created';

export const NETWORK = 'Network';
export const BYTES_IN = 'Bytes in';
export const BYTES_OUT = 'Bytes out';
export const NUMBER_OF_REQUESTS = 'Number of requests';

export const REPLICA_SET = 'Replica Set';
export const IS_MASTER = 'Is master';
export const SECONDARY = 'Secondary';
export const PRIMARY = 'Primary';
export const ME = 'Me';

export const CLUSTER_NAME = 'Cluster name';
export const RABBITMQ_VERSION = 'RabbitMQ version';
export const QUEUED_MESSAGES = 'Queued messages';
export const READY = 'Ready';
export const UNACKNOWLEDGED = 'Unacknowledged';
export const GLOBAL_COUNTS = 'Global counts';
export const CHANNELS = 'Channels';
export const EXCHANGES = 'Exchanges';
export const QUEUES = 'Queues';
export const CONSUMERS = 'Consumers';
export const NODE = 'Nodes';
export const MORE_DETAIL = 'More details on the RabbitMQ Management page';
export const RUNNING = 'Running';
export const FILE_DESCRIPTOR = 'File descriptors';
export const SOCKETS_DESCRIPTORS = 'Sockets descriptors';
export const ERLANG_PROCESS = 'Erlang process';
export const DISK_SPACE = 'Disk space';
export const TYPE = 'Type';
export const TOTAL = 'Total';
export const HIGH_WATERMARK = 'high watermark';
export const MODE = 'Mode';
export const ERROR_NO_DATA = 'Error No metadata available';
export const LOADING = 'Loading...';
export const SECURE = 'Secure';
export const NO_SECURE = 'Not secure';
export const Yes = 'Yes';
export const NO = 'No';

export const CONNECTED_CLIENTS = 'Connected clients';
export const USED_MEMORY = 'Used memory';
export const USED_MEMORY_RSS = 'Used memory RSS';
export const PEAK_MEMORY_CONSUMED = 'Peak memory consumed';
export const MEMORY_USED_BY_THE_LUA_ENGINE = 'Memory used by the Lua engine';
export const FRAGMENTATION_RATIO = 'Fragmentation ratio';
export const CPU = 'CPU';
export const SYSTEME_CPU_CONSUMED = 'System CPU consumed';
export const USER_CPU_CONSUMED = 'User CPU consumed';
export const SYSTEME_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES =
  'System CPU consumed by the background processes';
export const USER_CPU_CONSUMED_BY_THE_BACKGROUND_PROCESSES =
  'User CPU consumed by the background processes';
export const REPLICATION = 'Replication';
export const ROLE = 'Role';
export const MASTER_HOST = 'Master host';
export const MASTER_PORT = 'Master port';
export const MASTER_LINK_STATUS = 'Master link status';
export const TIME_SINCE_LAST_INTERACTION_WITH_LASTER =
  'Time since the last interaction with master';
export const MASTER_IS_SINCING_TO_SLAVE = 'The master is SYNCing to the slave';
export const BYTES_LEFT_BEFORE_SYNCING_IS_COMPLETE =
  'Bytes left before SYNCing is complete';
export const TIME_SINCE_LAST_TRANSFERT_IO_DURING_A_SYNC_OPERATION =
  'Time since last transfer I/O during a SYNC operation';
export const TIME_SINCE_THE_LINK_IS_DOWN = 'Time since the link is down';
export const CONNECTED_SLAVES = 'Connected Slaves';
export const NONE = 'None';

export const OPERATING_SYSTEM = 'Operating system';
export const NUMBER_OF_CORES = 'Number of cores';
export const NUMBER_OF_INSTANCE = 'Number of instances';
export const TOTAL_MEMORY = 'Total Memory';
export const AVAILABLE_MEMORY = 'Available Memory';
export const FREE_MEMORY = 'Free Memory';
export const CACHE_MEMORY = 'Cached Memory';
export const BUFFER_MEMORY = 'Buffers Memory';
export const TOTAL_DISK = 'Total Disk';
export const AVAILABLE_DISK = 'Available Disk';
export const FREE_DISK = 'Free Disk';
export const LOAD_AVERAGE = 'Load Average';

export const ERROR = 'error';
export const STATUS_NOT_UP_TO_DATE = 'The status is not up to date';

export const REGISTER_NEW_SERVICE = 'Register new service';
export const REFRESH = 'Refresh';
export const DEREGISTER = 'Deregister';
export const SEARCH = 'Search';
export const NEVER = 'Never';
export const RABBITMQ_LINK = 'http://rabbitmq:15672/';
export const NODE_URL = '/node/';
export const DEREGISTER_URL = '/deregister';
export const REGISTER_URL = '/register';
export const REGISTER_SERVICE = 'Register a service';
export const SERVICE_TYPE = 'Service type';
export const SURE_TO_DEREGISTER =
  'Are you sure you want to deregister the following services?';

export const URL_HOST = 'localhost';
export const URL_PROTOCOLE = 'https';
export const URL_PORT = '3450';

export const NO_SERVICE_NAME = 'no_service_name';
export const NO_HOSTNAME = 'no_hostname';


export const actionDeRegisterEllipsis: RowAction<Service> = {
  icon: <DeleteIcon />,
  label: DEREGISTER,
  onClick: (param) => deRegisterByEllipsis(param)
};

export const actionDeRegister: RowAction<Service> = {
  ...actionDeRegisterEllipsis,
  onClick: (param) => {
    deRegisterByToolBar(param);
    setModalDeRegisterVisible();
  },
  disable: () => true
};

export const actionRegister: RowAction<Service> = {
  icon: <PlusIcon />,
  label: REGISTER_NEW_SERVICE,
  onClick: setModalRegisterVisible
};
