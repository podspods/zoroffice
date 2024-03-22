'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import styled from '@emotion/styled';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import { Service, deregisterableList } from './components/serviceType';
import {
  fetchAddNewService,
  loadService,
  modalDeRegisterOnConfirme,
  serviceList,
  setServiceSelected
} from './components/serviceUtils';
import Expand from './components/Expand';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import useColumns from './components/useColonne';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import ServiceToolBar from './components/ServiceToolBar';
import ModalDeRegister from './components/ModalDeRegister';
import ModalRegister from './components/ModalRegister';
import { useSelectedRows } from './components/ServiceHook';

/** %%%%%%%%%%%%%%%%%%%%%%%%% Main  %%%%%%%%%%%%%%%%%%%%%%%%%  */
export default function AdministrationServerManagementServices() {
  const { t } = useTranslation();
  const [currentService, setCurrentService] = useState<string>('');
  const [currentHostname, setCurrentHostname] = useState<string>('');
  const [switchDisabled, setSwitchDisabled] = useState<boolean>(true);
  const [secureService, setSecureService] = useState<boolean>(true);
  const [rowList, setRowList] = useState<Service[]>([]);
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('Never');
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(
    false
  );
  const [modalDeregisterVisible, setModalDeregisterVisible] = useState<boolean>(
    false
  );
  const [selectedRows, setSelectedRowIds] = useSelectedRows(rowList);

  const { data: rawData, isLoading, mutate } = useSWR('/node/monitoring/list', {
    refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
    onSuccess: () => setDataReady(true)
    // onError: (swrErr: Error) =>
    //   OnError({
    //     onError: !!swrErr as boolean,
    //     label: `Error useSWR on ${serviceRoute.LIST}: ${swrErr.message}`
    //   })
  });

  function updateRowList() {
    setRowList(loadService(rawData));
    setDataReady(false);
  }

  useEffect(() => {
    updateRowList();

    return () => setRowList([]);
  }, [dataReady]);

  const toggleSecureService = () => {
    setSecureService(!secureService);
  };

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
        selectedRows: selectedRows,
        registerNewService: () => {
          setModalRegisterVisible(true);
        }
      }
    }),
    [isLoading, refreshRate, setRefreshRate, actionList, mutate, selectedRows]
  );

  const slots = {
    toolbar: ServiceToolBar
  };

  return (
    <>
      <Container style={{ height: 400, width: '100%' }}>
        <PageTitle>{t('Service Status')}</PageTitle>
        <Table
          rows={rowList}
          columns={columns}
          getDetailPanelContent={Expand}
          checkboxSelection
          slots={slots}
          onRowSelectionModelChange={setSelectedRowIds}
          slotProps={slotProps}
          isRowSelectable={(params) => {
            return deregisterableList.includes(params.row.name);
          }}
        />
        <ModalDeRegister
          open={modalDeregisterVisible}
          title={'Deregister'}
          serviceName={`${currentService} (${currentHostname})`}
          message={
            'Are you sure you want to deregister the following services?'
          }
          onConfirm={() =>
            void modalDeRegisterOnConfirme(
              currentService,
              currentHostname,
              mutate
            )
          }
          onClose={() => setModalDeregisterVisible(false)}
        />

        <ModalRegister
          open={modalRegisterVisible}
          switchDisabled={switchDisabled}
          title={'Register a service'}
          nameList={'Service type'}
          hostnameValue={currentHostname}
          serviceSelected={currentService}
          serviceList={serviceList()}
          onChange={(event) =>
            setServiceSelected({ event, setCurrentService, setSwitchDisabled })
          }
          onChangeHostname={setCurrentHostname}
          onConfirm={() => {
            void fetchAddNewService(
              currentService,
              currentHostname,
              secureService
            );
            setModalRegisterVisible(false);
            void mutate();
          }}
          onClose={() => setModalRegisterVisible(false)}
          toogleSecureService={toggleSecureService}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;
