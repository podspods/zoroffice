'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Box } from '@mui/material';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import PageTitle from '@/components/PageTitle';
import Apis from 'utils/apis';
import { Service, deregisterableList } from './components/serviceType';
import {
  fetchAddNewService,
  fetchDeregister,
  loadService
} from './components/serviceUtils';
import ServiceToolBar from './components/ServiceToolBar';
import ModalDeRegister from './components/ModalDeRegister';
import ModalRegister from './components/ModalRegister';
import Expand from './components/Expand';
import useColumns from './components/useColumns';

export default function AdministrationServerManagementServices() {
  const { t } = useTranslation();
  const [currentService, setCurrentService] = useState<string>('');
  const [currentHostname, setCurrentHostname] = useState<string>('');
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('Never');
  const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(
    false
  );
  const [modalDeregisterVisible, setModalDeregisterVisible] = useState<boolean>(
    false
  );
  const { data: rawData, isLoading, mutate } = useSWR(Apis.service.list, {
    refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
    shouldRetryOnError: false,
    onError: (swrErr: Error) => (
      <ErrorCard
        errorMessage={`Error useSWR on ${Apis.service.list}: ${swrErr.message}`}
      />
    )
  });
  const rowList: Service[] = useMemo(() => loadService(rawData), [rawData]);
  const deregister = (params: Service[]) => {
    const service = params[0];
    setCurrentService(service.name);
    setCurrentHostname(service.hostname);
    setModalDeregisterVisible(true);
  };
  const actionList: RowAction<Service>[] = [
    {
      label: 'Deregister',
      icon: <PlusIcon />,
      onClick: deregister,
      disable: () => false
    }
  ];
  const columns = useColumns(actionList);
  const slotProps = useMemo(
    () => ({
      toolbar: {
        isLoading,
        refreshRate,
        setRefreshInterval: setRefreshRate,
        actions: actionList,
        mutate,
        registerNewService: () => {
          setModalRegisterVisible(true);
        }
      }
    }),
    [isLoading, refreshRate, setRefreshRate, actionList, mutate]
  );
  const slots = {
    toolbar: ServiceToolBar
  };

  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Service Status')}</PageTitle>
      <Table
        rows={rowList}
        columns={columns}
        getDetailPanelContent={Expand}
        checkboxSelection
        slots={slots}
        slotProps={slotProps}
        isRowSelectable={(params) => {
          return deregisterableList.includes(params.row.name);
        }}
        getDetailPanelHeight={() => 'auto'}
      />
      <ModalDeRegister
        open={modalDeregisterVisible}
        serviceName={`${currentService}: ${currentHostname}`}
        onConfirm={async () => {
          await fetchDeregister(currentService, currentHostname);
          await mutate();
        }}
        onClose={() => setModalDeregisterVisible(false)}
      />
      <ModalRegister
        open={modalRegisterVisible}
        onConfirm={async (service: string, hostname: string, secure: boolean) => {
          await fetchAddNewService(service, hostname, secure);
          setModalRegisterVisible(false);
          await mutate();
        }}
        onClose={() => setModalRegisterVisible(false)}
      />
    </Box>
  );
}
