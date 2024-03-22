type Overview = {
  cluster_name: string;
  rabbitmq_version: string;
  queue_totals: QueueTotals;
  object_totals: ObjectTotals;
};

type ObjectTotals = {
  connections: number;
  channels: number;
  consumers: number;
  exchanges: number;
  queues: number;
};

type QueueTotals = {
  messages: number;
  messages_ready: number;
  messages_unacknowledged: number;
  messages_ready_details: number;
};

type App = {
  label: string;
  version: string;
  semverVersion: string;
  invalidVersion: string;
  name: string;
};
type Cpu = {
  used_cpu_sys: number;
  used_cpu_user: number;
  used_cpu_sys_children: number;
  used_cpu_user_children: number;
};
type MemoryType = {
  used_memory: number;
  used_memory_rss: number;
  used_memory_peak: number;
  used_memory_lua: number;
  mem_fragmentation_ratio: number;
};
type ServerType = {
  redis_mode: string;
  arch_bits: string;
  uptime_in_seconds: number;
  connected_clients: number;
};
type ReplicationType = {
  role: string;
  master_host: string;
  master_port: string;
  master_link_status: string;
  master_last_io_seconds_ago: string;
  master_sync_in_progress: string;
  master_sync_left_bytes: string;
  master_sync_last_io_seconds_ago: string;
  master_link_down_since_seconds: string;
  connected_slaves: string;
};
type Route = {
  profileId: string;
  queue: string;
  serverVersion: string;
  service: string;
};
export type TranslationResources = {
  id: string;
  name: string;
  status: string;
  nbInstances: number;
  routes: Route[];
};

type ClientsType = {
  connected_clients: string;
};
type ServiceData = {
  app: App;
  status: string;
  overview: Overview;
  nodes: Nodes[];
  managementUrl: string;
  version: string;
  Server: ServerType;
  Clients: ClientsType;
  Memory: MemoryType;
  CPU: Cpu;
  Replication: ReplicationType;
};
export type Nodes = {
  name: string;
  running: boolean;
  fd_used: number;
  fd_total: number;
  sockets_used: number;
  sockets_total: number;
  proc_used: number;
  proc_total: number;
  mem_used: number;
  mem_limit: number;
  disk_free: number;
  disk_free_limit: number;
  uptime: number;
  type: string;
};
type Replica = {
  setName: string;
  ismaster: string;
  secondary: string;
  primary: string;
  me: string;
  hosts: string[];
};
type Connections = {
  current: string;
  available: string;
  totalCreated: string;
};
type Mem = {
  bits: number;
  resident: number;
  virtual: number;
  supported: number;
  mapped: number;
  mappedWithJournal: number;
};
type Network = {
  bytesIn: number;
  bytesOut: number;
  numRequests: number;
};

export type Service = {
  id?: string;
  _id?: string;
  hostname: string;
  status: string;
  name: string;
  type?: string;
  displayName?: string;
  insertedAt?: string;
  lastFailedUpdate?: string;
  lastPollingError?: string;
  lastPollingDate?: string;
  lastTrsUpdate?: string;
  lastUpdate?: string;
  lastSuccessfulUpdate?: string;
  warning?: boolean;
  ok?: string;
  label?: string;
  msg?: string;
  version?: string;
  process?: string;
  uptime?: number;
  uptimeMillis?: number;
  uptimeEstimate?: number;
  localTime?: string;
  pid?: number;
  mem?: Mem;
  repl?: Replica;
  connections?: Connections;
  translationResources?: TranslationResources[];
  network?: Network;
  nbCores?: number;
  os?: string;
  nbInstances?: number;
  totalMemory?: string;
  availableMemory?: string;
  freeMemory?: string;
  cachedMemory?: string;
  buffersMemory?: string;
  totalDisk?: string;
  availableDisk?: string;
  freeDisk?: string;
  loadAverage?: string;
  data?: ServiceData;
  app?: App;
};

export type ResponseServices = {
  services: Service[];
  total: number;
  running: number;
  failed: number;
};

export enum Status {
  SUCCESS = 'success',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  INFO = 'info'
}

export enum ServiceName {
  ELASTIC_SEARCH = 'Elastic Search',
  RABIT_MQ = 'RabbitMQ (used by ses-file-translation-consumer)',
  MONGO_DB = 'MongoDB',
  REDIS = 'Redis',
  REDIS_NODE = 'Redis (used by Computing Nodes)',
  ACTIVITY_SERVER = 'Activity Server',
  BROKER = 'Broker',
  COMPUTING_NODE = 'Computing Node',
  CORPUS_MANAGER = 'Corpus Manager',
  ROUTING_SERVER = 'Routing Server',
  DISPATCHER = 'Dispatcher',
  GDICT = 'GDict',
  LOOKUP_SERVER = 'Lookup Server',
  TM_INDEXER = 'TM Indexer',
  DCT_INDEXER = 'DCT Indexer',
  GATEWAY = 'Gateway',
  TRS_CONSOLE = 'TRS Console',
  SES_CONSOLE = 'SES Console',
  TRS_POLLER = 'TRS Poller'
}

export enum TypeAction {
  LIST = 'list',
  DEREGISTER = 'deregister',
  REGISTER = 'register'
}

export const deregisterableList: string[] = [
  ServiceName.BROKER,
  ServiceName.COMPUTING_NODE,
  ServiceName.DISPATCHER,
  ServiceName.ROUTING_SERVER,
  ServiceName.REDIS_NODE
];
