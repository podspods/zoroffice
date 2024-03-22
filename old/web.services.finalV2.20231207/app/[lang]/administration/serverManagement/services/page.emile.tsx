'use client';

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Box, Toolbar, Typography } from '@mui/material';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';

import SimpleTable from '@systran/react-components/lib/organisms/Table/SimpleTable';
import PageTitle from '@/components/PageTitle';
// import { useSelectedRows } from '@/components/fromReact/Table/SimpleTable';
// import Modal from './Modal';
import ModalDeRegister from './ModalDeRegister';
const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;

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
type ClientsType = {
  connected_clients: string;
};
type ServiceData = {
  app: App;
  status: string;
  nodes: Nodes[];
  managementUrl: string;
  version: string;
  Server: ServerType;
  Clients: ClientsType;
  Memory: MemoryType;
  CPU: Cpu;
  Replication: ReplicationType;
};
type Nodes = {
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

type Service = {
  id: string;
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
  uptime?: string;
  uptimeMillis?: number;
  uptimeEstimate?: number;
  localTime?: string;
  pid?: number;
  mem?: Mem;
  repl?: Replica;
  connections?: Connections;

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
};

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

// enum TypeAction {
//   LIST = 'list',
//   DEREGISTER = 'deregister',
//   REGISTER = 'register'
// }

const deregisterableList: string[] = [
  ServiceName.BROKER,
  ServiceName.COMPUTING_NODE,
  ServiceName.DISPATCHER,
  ServiceName.ROUTING_SERVER,
  ServiceName.REDIS_NODE
];

function useColumns(actions: RowAction<Service>[]) {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('status'),
        disableColumnMenu: true,
        sortable: true,
        field: 'status',
        maxWidth: 120
        // renderCell: (params) => DisplayStatusBadge(params.row.status)
      },
      {
        disableColumnMenu: true,
        headerName: t('name'),
        sortable: true,
        minWidth: 400,
        field: 'name'
      },
      {
        disableColumnMenu: true,
        headerName: t('hostname'),
        minWidth: 200,
        sortable: true,
        field: 'hostname'
      },
      {
        disableColumnMenu: true,
        headerName: t('version'),
        minWidth: 200,
        sortable: true,
        field: 'version'
      },
      {
        headerName: '',
        field: 'elipsis',
        maxWidth: 80,
        flex: 0.2,
        sortable: false,
        editable: false,
        renderCell: ({ row }: GridRenderCellParams) => (
          <RowActionMenu actions={actions} selectedRow={row} />
        )
      }
    ],
    []
  );
}

/** ------------------------ main ---------------------------- */
export default function AdministrationServerManagementServices() {
  const { t } = useTranslation();
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('Never');
  const { data: rawData, error, isLoading, mutate } = useSWR(
    '/node/monitoring/list',
    {
      refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000
    }
  );
  // ???????????????????????
  // if (mutateAsked) {
  //   setMutateAsked(false);
  //   void mutate();
  // }

  // const actions: RowAction<Service>[] = [
  //   {
  //     label: 'Mark as read',
  //     icon: <PlusIcon />,
  //     onClick: (params) => void setModalDeRegisterVisible(params)
  //   }
  // ];

  // const columns = useColumns(actions);
  // const [selectedRows, setSelectedRowIds] = useSelectedRows(rawData);

  // const [serviceName, setServiceName] = useState<string>('');
  // const [hostName, setHostName] = useState<string>('');
  const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(
    false
  );
  const [modalDeRegisterVisible, setModalDeRegisterVisible] = useState<boolean>(
    false
  );

  const onConfirm = () => {
    // void fetchDeregister(serviceName, hostName);
    // setModalDeRegisterVisible(false)();
  };

  function deregister(rowList: Service[]) {
    const serviceName = rowList[0].displayName;
    const hostName = rowList[0].hostname;
  }

  const modalDeRegisterOnClose = () => {
    setModalDeRegisterVisible(false);
  };

  const actions: RowAction<Service>[] = [
    {
      label: 'Mark as read',
      icon: <PlusIcon />,
      onClick: (params) => void deregister(params)
    }
  ];

  const selectedRows: Service[] = [];
  const columns = useColumns(actions);
  return (
    <>
      <Container style={{ height: 400, width: '100%' }}>
        <Box>
          <PageTitle>{t('Service')}</PageTitle>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-flex' }}>
              {selectedRows && selectedRows.length > 0 ? (
                <RowActionToolbar
                  actions={actions}
                  selectedRows={selectedRows}
                />
              ) : (
                <Typography>
                  {t(
                    'Select a row or click on the ellipses to view single and multi row actions'
                  )}
                </Typography>
              )}
            </div>
            <div style={{ display: 'inline-flex' }}>
              <RefreshRateButton
                isLoading={isLoading}
                onRefresh={() => void mutate()}
                refreshRate={refreshRate}
                onRefreshChange={(value: RefreshRate) => setRefreshRate(value)}
              />
              <RowActionButton
                icon={<PlusIcon />}
                label={'New service'}
                onClick={() => {
                  void setModalRegisterVisible(true);
                }}
              />
            </div>
          </Toolbar>
          <SimpleTable
            columns={columns}
            rows={rawData}
            pagination
            showCellVerticalBorder
            showColumnVerticalBorder
            checkboxSelection
            // onRowSelectionModelChange={setSelectedRowIds}
            // getDetailPanelContent={Expand}
            getDetailPanelHeight={() => 'auto'}
            isRowSelectable={(params) =>
              deregisterableList.includes(params.row.name)
            }
          />
          <ModalDeRegister
            open={modalDeRegisterVisible}
            title={'deregister'}
            // serviceName={`${serviceName} (${hostName})`}
            serviceName={'toto'}
            message={
              'Are you sure you want to deregister the following services?'
            }
            onConfirm={onConfirm}
            onClose={modalDeRegisterOnClose}
          />
        </Box>
      </Container>
    </>
  );
}
