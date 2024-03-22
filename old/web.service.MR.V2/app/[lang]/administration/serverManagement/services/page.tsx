'use client';

import React, { useEffect, useState } from 'react';
import SimpleTable, {
  RowWithId,
  useSelectedRows
} from '@systran/react-components/lib/organisms/Table/SimpleTable';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import useColumns from './useColonne';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {
  Service,
  ServiceName,
  TypeAction,
  deregisterableList,
  serviceRoute
} from './serviceType';

import useSWR from 'swr';
import OnError from './OnError';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {
  endPoint,
  fetchAddNewService,
  loadService,
  serviceList
} from './serviceUtils';
import styled from '@emotion/styled';
import { Box, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';
import ModalDeRegister from './ModalDeRegister';
import { commonFetch } from '@/utils/fetcher';
import ModalRegister from './ModalRegister';
import Expand from './Expand';

const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;

/** %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% main %%%%%%%%%%%%%%%%%%%%%%%%  */
export default function AdministrationServerManagementServices() {
  const [rowList, setRowList] = useState<Service[]>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [switchDisabled, setSwitchDisabled] = useState<boolean>(true);
  const [secureService, setSecureService] = useState<boolean>(true);
  const [currentService, setCurrentService] = useState<string>('');
  const [currentHostname, setCurrentHostname] = useState<string>('');
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('Never');
  const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(
    false
  );
  const [modalDeregisterVisible, setModalDeregisterVisible] = useState<boolean>(
    false
  );

  const { data: rawData, isLoading, mutate } = useSWR(
    serviceRoute.LIST,
    {
      refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000,
      onSuccess: () => setDataReady(true),
      onError: (swrErr: Error) =>
        OnError({
          onError: !!swrErr as boolean,
          label: `Error useSWR on ${serviceRoute.LIST}: ${swrErr.message}`
        })
    }
  );

  const deregister = (params: Service[]) => {
    const service = params[0];
    setCurrentService(service.name);
    setCurrentHostname(service.hostname);
    setModalDeregisterVisible(true);
  };

  /** ------------------------------------------------------------------------------------------ */

  async function fetchDeregister(
    currentService: string,
    currentHostname: string
  ) {
    const api = endPoint(currentService, TypeAction.DEREGISTER);
    if (api) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          hostname: currentHostname
        })
      };

      const status = await commonFetch(api, options);
      if (status) {
        setCurrentService('');
        setCurrentHostname('');
        return status;
      }
    }
    return false;
  }

  /** ------------------------------------------------------------------------------------------ */

  const setServiceSelected = (event: SelectChangeEvent<string>) => {
    const serviceSelect = event.target.value;
    setCurrentService(serviceSelect);
    switch (serviceSelect) {
      case ServiceName.REDIS_NODE:
        setSwitchDisabled(true);
        break;
      case ServiceName.COMPUTING_NODE:
      case ServiceName.DISPATCHER:
      case ServiceName.ROUTING_SERVER:
      case ServiceName.BROKER:
      default:
        setSwitchDisabled(false);
        break;
    }
  };

  /** ------------------------------------------------------------------------------------------ */
  const actions: RowAction<Service>[] = [
    {
      label: 'Deregister',
      icon: <PlusIcon />,
      onClick: (params) => deregister(params)
    }
  ];

  function updateRowList() {
    setRowList(loadService(rawData));
    setDataReady(false);
  }

  useEffect(() => {

    updateRowList();

    return () => setRowList([]);
  }, [dataReady]);

  const columns = useColumns(actions);

  const RegisterNewService = () => {
    setModalRegisterVisible(true);
  };

  const modalDeRegisterOnConfirme = async (
    currentService: string,
    currentHostname: string
  ) => {
    await fetchDeregister(currentService, currentHostname);
    await mutate();
  };

  const toggleSecureService = () => {
    setSecureService(!secureService);
  };


  const [selectedRows, setSelectedRowIds] = useSelectedRows(
    rowList as RowWithId[]
  );

  const { t } = useTranslation();

  /**  +-+-+-+-+-+-+-+-+-+-+- body  +-+-+-+-+-+-+-+-+-+-+- */
  return (
    <Container style={{ height: 400, width: '100%' }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex' }}>
          {selectedRows && selectedRows.length === 1 ? (
            <RowActionToolbar
              actions={actions}
              selectedRows={selectedRows as Service[]}
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
            label={'Register new service'}
            onClick={RegisterNewService}
          />
        </div>
      </Toolbar>
      <Box>
        <PageTitle>{t('Services')}</PageTitle>
        <SimpleTable
          columns={columns}
          rows={rowList}
          pagination
          showCellVerticalBorder
          showColumnVerticalBorder
          checkboxSelection
          onRowSelectionModelChange={setSelectedRowIds}
          getDetailPanelContent={Expand}
          getDetailPanelHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          isRowSelectable={(params) =>
            deregisterableList.includes(params.row.name)
          }
        />

        <ModalDeRegister
          open={modalDeregisterVisible}
          title={'Deregister'}
          serviceName={`${currentService} (${currentHostname})`}
          message={
            'Are you sure you want to deregister the following services?'
          }
          onConfirm={() =>
            void modalDeRegisterOnConfirme(currentService, currentHostname)
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
          onChange={setServiceSelected}
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
      </Box>
    </Container>
  );
}
