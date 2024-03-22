import { action, map } from 'nanostores';
import { Service, ServiceName } from './type';
import { NEVER } from './constant';
import { adaptator, doSearch } from './utils';
import { ChangeEvent } from 'react';

export type ServicesStore = {
  modalRegisterVisible: boolean;
  modalDeRegisterVisible: boolean;
  isBusy: boolean;
  isDataReady: boolean;
  switchDisabled: boolean;
  refreshAsked: boolean;
  secureService: boolean;
  refreshRate: number;
  searchText: string;
  currentService: string;
  currentHostname: string;
  checkedList: string[];
  serviceRegisteredList: Service[];
  filteredList: Service[];
};

export const servicesStore = map<ServicesStore>({
  modalRegisterVisible: false,
  modalDeRegisterVisible: false,
  isBusy: false,
  isDataReady: false,
  switchDisabled: false,
  refreshRate: 0,
  refreshAsked: false,
  secureService: false,
  searchText: '',
  currentService: '',
  currentHostname: '',
  checkedList: [],
  serviceRegisteredList: [],
  filteredList: []
});

export const resetCurrentHostname = action(
  servicesStore,
  'resetCurrentHostname',
  (store) => {
    store.setKey('currentHostname', '');
  }
);
export const resetSwitchDisabled = action(
  servicesStore,
  'resetSwitchDisabled',
  (store) => {
    store.setKey('switchDisabled', false);
  }
);
export const resetCurrentService = action(
  servicesStore,
  'resetCurrentService',
  (store) => {
    store.setKey('currentService', '');
  }
);

export const toggleSecureService = action(
  servicesStore,
  'setHostname',
  (store) => {
    const { secureService } = store.get();
    const newSecureService = !secureService;
    store.setKey('secureService', newSecureService);
  }
);

export const setHostname = action(
  servicesStore,
  'setHostname',
  (store, host: string) => {
    store.setKey('currentHostname', host);
  }
);
export const setServiceSelected = action(
  servicesStore,
  'setServiceSelected',
  (store, event) => {
    store.setKey('currentService', event.target.value);
    const { currentService } = store.get();
    switch (currentService) {
      case ServiceName.REDIS_NODE:
        store.setKey('switchDisabled', false);
        break;
      case ServiceName.COMPUTING_NODE:
      case ServiceName.DISPATCHER:
      case ServiceName.ROUTING_SERVER:
      case ServiceName.BROKER:
      default:
        store.setKey('switchDisabled', true);
        break;
    }
  }
);

export const setCheckedList = action(
  servicesStore,
  'set list rowid checked',
  (store, rowIdList) => {
    store.setKey('checkedList', rowIdList);
  }
);

export const setDataReady = action(servicesStore, 'setDataReady', (store) => {
  const { isBusy } = store.get();
  if (!isBusy) {
    store.setKey('isDataReady', true);
  }
});

export const setModalRegisterVisible = action(
  servicesStore,
  'setModalRegisterVisible',
  (store) => {
    store.setKey('modalRegisterVisible', true);
  }
);

export const resetModalRegisterVisible = action(
  servicesStore,
  'resetModalRegisterVisible',
  (store) => {
    store.setKey('modalRegisterVisible', false);
  }
);

export const setModalDeRegisterVisible = action(
  servicesStore,
  'setModalDeRegisterVisible',
  (store) => {
    store.setKey('modalDeRegisterVisible', true);
  }
);

export const resetModalDeRegisterVisible = action(
  servicesStore,
  'resetModalDeRegisterVisible',
  (store) => {
    store.setKey('modalDeRegisterVisible', false);
  }
);

export const searchChange = action(
  servicesStore,
  'searchChange',
  (store, event: ChangeEvent<HTMLInputElement>) => {
    const { isBusy } = store.get();
    if (!isBusy) {
      store.setKey('isBusy', true);
      store.setKey('searchText', event.target.value);
      const { serviceRegisteredList } = store.get();
      const newFilteredList = doSearch(
        event.target.value,
        serviceRegisteredList
      );
      store.setKey('filteredList', newFilteredList);
      store.setKey('isBusy', false);
    }
  }
);

export const startSearch = action(
  servicesStore,
  'searchChange',
  (store, event) => {
    store.setKey('searchText', event.target.value);
  }
);

export const deRegisterByToolBar = action(
  servicesStore,
  'deRegisterByToolBar',
  (store, row: any) => {
    if (row) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const serviceChecked = row.find((oneRow: null) => oneRow !== null);
        store.setKey('currentService', serviceChecked.name);
        store.setKey('modalDeRegisterVisible', true);
        store.setKey('currentHostname', serviceChecked.hostname);
        // eslint-disable-next-line brace-style
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error 194==>', error);
      }
    }
  }
);

export const deRegisterByEllipsis = action(
  servicesStore,
  'deRegisterByEllipsis',
  (store, row: any) => {
    if (row) {
      try {
        store.setKey('modalDeRegisterVisible', true);
        store.setKey('currentService', row[0].name);
        store.setKey('currentHostname', row[0].hostname);
        // eslint-disable-next-line brace-style
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error 211 ==>', error);
      }
    }
  }
);

export const setRefresh = action(servicesStore, 'setRefresh', (store) => {
  store.setKey('refreshAsked', true);
});

export const refreshChange = action(
  servicesStore,
  'refreshChange',
  (store, event) => {
    const newRefreshRate: number = event === NEVER ? 0 : event;
    store.setKey('refreshRate', newRefreshRate);
  }
);

export const loadService = action(
  servicesStore,
  'load Service',
  (store, rawData) => {
    const { isDataReady, isBusy } = store.get();
    if (!isBusy && isDataReady) {
      store.setKey('isDataReady', false);
      store.setKey('isBusy', true);
      if (rawData && rawData.services) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newServiceList: Service[] = rawData.services.map((oneRow: any) =>
          adaptator(oneRow)
        );
        store.setKey('serviceRegisteredList', newServiceList);
        const { searchText } = store.get();
        let newFilteredList: Service[];
        if (searchText) {
          newFilteredList = doSearch(searchText, newServiceList);
        }
        else {
          newFilteredList = newServiceList.slice(0);
        }
        store.setKey('filteredList', newFilteredList);
      }
      store.setKey('isBusy', false);
    }
  }
);

export const mutateAsked = action(servicesStore, 'mutateAsked', (store) => {
  store.setKey('refreshAsked', false);
});
