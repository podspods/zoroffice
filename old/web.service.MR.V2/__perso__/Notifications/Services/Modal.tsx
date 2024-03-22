import React from 'react';
import { useStore } from '@nanostores/react';
import {
  resetModalDeRegisterVisible,
  resetModalRegisterVisible,
  servicesStore,
  setHostname,
  setServiceSelected,
  toggleSecureService
} from '@/components/Services/store';
import {
  DEREGISTER,
  REGISTER_SERVICE,
  SERVICE_TYPE,
  SURE_TO_DEREGISTER
} from '@/components/Services/constant';
import { fetchAddNewService, fetchDeregister, serviceList } from '@/components/Services/utils';
import ModalDeRegister from '@/components/Services/modal/ModalDeRegister';
import ModalRegister from '@/components/Services/modal/ModalRegister';

export default function Modal() {
  const {
    modalDeRegisterVisible,
    modalRegisterVisible,
    currentService,
    currentHostname,
    secureService,
    switchDisabled
  } = useStore(servicesStore);
  return (
    <React.Fragment>
      <ModalRegister
        open={modalRegisterVisible}
        switchDisabled={switchDisabled}
        secureService={secureService}
        title={REGISTER_SERVICE}
        nameList={SERVICE_TYPE}
        hostnameValue={currentHostname}
        serviceSelected={currentService}
        serviceList={serviceList()}
        onChange={(event) => setServiceSelected(event)}
        onChangeHostname={setHostname}
        onConfirm={() => {
          void fetchAddNewService(
            currentService,
            currentHostname,
            secureService
          );
          resetModalRegisterVisible();
        }}
        onClose={resetModalRegisterVisible}
        toogleSecureService={toggleSecureService}
      />
      <ModalDeRegister
        open={modalDeRegisterVisible}
        title={DEREGISTER}
        serviceName={`${currentService} (${currentHostname})`}
        message={SURE_TO_DEREGISTER}
        onConfirm={() => {
          void fetchDeregister(currentService, currentHostname);
          resetModalRegisterVisible();
        }}
        onClose={resetModalDeRegisterVisible}
      />
    </React.Fragment>
  );
}
