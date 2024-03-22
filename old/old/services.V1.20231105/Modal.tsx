import React from 'react';
import ModalRegister from './Modal.register';
import {
  resetModalDeRegisterVisible,
  resetModalRegisterVisible,
  servicesStore,
  setHostname,
  setServiceSelected,
  toggleSecureService
} from './services.store';
import { useStore } from '@nanostores/react';
import {
  DEREGISTER,
  REGISTER_SERVICE,
  SERVICE_TYPE,
  SURE_TO_DEREGISTER
} from './services.constant';
import { fetchAddNewService, fetchDeregister, serviceList } from './services';
import ModalDeRegister from './Modal.deregister';

export function Modal() {
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={() =>
          fetchAddNewService(currentService, currentHostname, secureService)
        }
        onClose={resetModalRegisterVisible}
        toogleSecureService={toggleSecureService}
      />

      <ModalDeRegister
        open={modalDeRegisterVisible}
        title={DEREGISTER}
        serviceName={`${currentService} (${currentHostname})`}
        message={SURE_TO_DEREGISTER}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={() => fetchDeregister(currentService, currentHostname)}
        onClose={resetModalDeRegisterVisible}
      />
    </React.Fragment>
  );
}
