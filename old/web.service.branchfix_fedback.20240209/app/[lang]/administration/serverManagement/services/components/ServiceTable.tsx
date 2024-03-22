'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import MinusIcon from '@systran/react-components/lib/atoms/Icons/MinusIcon';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import PageTitle from '@/components/PageTitle';
import Apis from 'utils/apis';
import { Service, deregisterableList } from './serviceType';
import {
  fetchAddNewService,
  fetchDeregister,
  loadService
} from './serviceUtils';
import ServiceToolBar from './ServiceToolBar';
import ModalDeRegister from './ModalDeRegister';
import ModalRegister from './ModalRegister';
import Expand from './Expand';
import useColumns from './useColumns';

export default function ServiceTable() {
  const [currentService, setCurrentService] = useState<string>('');
  const [currentHostname, setCurrentHostname] = useState<string>('');
  const [refreshRate, setRefreshRate] = useState<RefreshRate>(5);
  const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(
    false
  );
  const [modalDeregisterVisible, setModalDeregisterVisible] = useState<boolean>(
    false
  );


  const { data: rawData, isLoading, mutate } = useSWR(Apis.service.list, {
    refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
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
      icon: <MinusIcon />,
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

  const isRowSelectable = (params: any) => {
    return deregisterableList.includes(params.row.name);
  };

  return (
    <>
      <Table
        rows={rowList}
        columns={columns as any}
        getDetailPanelContent={Expand as any}
        checkboxSelection
        slots={slots}
        slotProps={slotProps}
        isRowSelectable={isRowSelectable}
        getDetailPanelHeight={() => 'auto'}
      />
      <ModalDeRegister
        open={modalDeregisterVisible}
        serviceName={`${currentService} (${currentHostname})`}
        onConfirm={async () => {
          await fetchDeregister(currentService, currentHostname);
          await mutate();
        }}
        onClose={() => setModalDeregisterVisible(false)}
      />
      <ModalRegister
        open={modalRegisterVisible}
        onConfirm={async (
          service: string,
          hostname: string,
          secure: boolean
        ) => {
          await fetchAddNewService(service, hostname, secure);
          setModalRegisterVisible(false);
          await mutate();
        }}
        onClose={() => setModalRegisterVisible(false)}
      />
    </>
  );
}
