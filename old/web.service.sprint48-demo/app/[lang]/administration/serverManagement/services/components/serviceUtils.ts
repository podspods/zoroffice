import { SelectChangeEvent } from '@mui/material';
import {
  ResponseServices,
  Service,
  ServiceName,
  TypeAction,
  Status,
  deregisterableList
} from './serviceType';

import moment from 'moment';
import { commonFetch } from 'utils/fetcher';

export function uniqueIdRandom(): string {
  const dateNow = Date.now();
  const randomNumber = Math.floor(Math.random() * 100001);
  return `${dateNow}_${randomNumber}`;
}

export function uniqueId({ ...props }: Service): string {
  const serviceName = props.name ? props.name : 'no-name service ';
  const hostname = props.hostname ? props.hostname : 'no-hostname';
  return `${serviceName}_${hostname}`;
}

export function adaptator(serviceInput: Service): Service {
  let service: Service = { ...serviceInput };
  if (!serviceInput.id && serviceInput._id) {
    service = { ...serviceInput, id: serviceInput._id };
  }
  else service = { ...service, id: uniqueId(service) };

  if (serviceInput.app && serviceInput.app.version)
    service = { ...service, version: serviceInput.app.version };

  return service;
}

export function loadService(rawData: ResponseServices): Service[] {
  if (rawData && rawData.services) {
    const newServiceList: Service[] = rawData.services.map((oneRow: Service) =>
      adaptator(oneRow)
    );

    return newServiceList;
  }
  return [];
}

export function endPoint(serviceName: string, action: TypeAction): string {
  if (!serviceName) return '';
  switch (serviceName) {
    case ServiceName.BROKER:
      return `/node/queue/${action}`;
    case ServiceName.COMPUTING_NODE:
      return `/node/computingNode/${action}`;
    case ServiceName.DISPATCHER:
      return `/node/dispatcher/${action}`;
    case ServiceName.ROUTING_SERVER:
      return `/node/route/${action}`;
    case ServiceName.REDIS_NODE:
      return `/node/cache/${action}`;
    default:
      return '';
  }
}

export function convertStatus(statusText: string) {
  let returnStatus: Status = Status.INFO;
  switch (statusText) {
    case 'fail':
      returnStatus = Status.ERROR;
      break;
    case 'running':
      returnStatus = Status.SUCCESS;
      break;
    case 'success':
      returnStatus = Status.SUCCESS;
      break;
    default:
      returnStatus = Status.INFO;
      break;
  }
  return returnStatus;
}

export function durationFromNow(dateString: string | undefined): string {
  if (!dateString) return '';
  return moment(dateString)
    .fromNow()
    .toString();
}

export function elapsedTime(nbSecond: number | string | undefined): string {
  if (!nbSecond) return '';
  if (typeof nbSecond === 'string') {
    try {
      const castToInt = parseInt(nbSecond, 10);
      return moment
        .duration(isNaN(castToInt) ? null : castToInt, 'seconds')
        .humanize();
    }
    catch (error) {
      return '';
    }
  }
  return moment.duration(nbSecond, 'seconds').humanize();
}

export function valueToFloat(value: number | string): number | undefined {
  let result: number | undefined;
  if (typeof value === 'string') {
    try {
      const castToInt = parseFloat(value);
      result = isNaN(castToInt) ? undefined : castToInt;
    }
    catch (error) {
      result = undefined;
    }
  }
  else {
    result = value;
  }
  return result;
}

export function roundOneDigit(value: number | string, unit: string): string {
  const result = valueToFloat(value);
  const returnValue = result ? `${Math.round(result)} ${unit}` : '';
  return returnValue;
}

export function displayByte(value: number | string | undefined): string {
  if (!value) return '';
  const result = valueToFloat(value);
  if (!result || result <= 0) return '0 B';
  const threshold = 0.8;
  const kConst = 1024;
  const mConst = kConst * 1024;
  const gConst = mConst * 1024;
  const gValue = result / gConst;
  if (gValue > threshold) return `${gValue.toFixed(2)} GB`;
  const mValue = result / mConst;
  if (mValue > threshold) return `${mValue.toFixed(2)} MB`;
  const kValue = result / kConst;
  if (kValue > threshold) return `${kValue.toFixed(2)} KB`;
  return `${result} B`;
}

export function serviceList(): string[] {
  const list = Object.values(ServiceName).filter((item) => {
    return deregisterableList.includes(item) && item.valueOf();
  });
  return list;
}

export async function fetchAddNewService(
  currentService: string,
  currentHostname: string,
  secureService: boolean
) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      secure: secureService,
      hostname: currentHostname
    })
  };
  const api = endPoint(currentService, TypeAction.REGISTER);
  if (api) {
    const status = await commonFetch(api, options);
    return status ? status : false;
  }
  return false;
}

export async function fetchDeregister(
  currentService: string,
  currentHostname: string
) {
  const api = endPoint(currentService, TypeAction.DEREGISTER);

  const options = {
    method: 'POST',
    body: JSON.stringify({
      hostname: currentHostname
    })
  };
  if (api) {
    const status = await commonFetch(api, options);
    return status ? status : false;
  }
  return false;
}

export function rowList(
  checkedList: string[],
  serviceRegisteredList: Service[]
): Service[] {
  if (!serviceRegisteredList) return [];
  return serviceRegisteredList.filter(
    (oneService) => oneService.id && checkedList.includes(oneService.id)
  );
}

export function doSearch(
  searchText: string,
  serviceRegisteredList: Service[]
): Service[] {
  if (searchText === '') {
    return [...serviceRegisteredList];
  }
  const NewfilteredList = serviceRegisteredList.filter((oneRow) => {
    if (searchExist(oneRow, searchText)) {
      return oneRow;
    }
    return null;
  });
  return NewfilteredList;
}

export function searchExist(row: Service, search: string): boolean {
  const searchTextLowerCase = search.toLowerCase();
  if (!row) return false;
  if (row.status && row.status.toLowerCase().includes(searchTextLowerCase))
    return true;
  if (row.name && row.name.toLowerCase().includes(searchTextLowerCase))
    return true;
  if (row.hostname && row.hostname.toLowerCase().includes(searchTextLowerCase))
    return true;
  if (row.version && row.version.toLowerCase().includes(searchTextLowerCase))
    return true;
  return false;
}

export async function modalDeRegisterOnConfirme(
  currentService: string,
  currentHostname: string,
  mutate: () => Promise<void>
) {
  await fetchDeregister(currentService, currentHostname);
  await mutate();
}

type setServiceSelectedProps = {
  event: SelectChangeEvent<string>;
  setCurrentService: (value: string) => void;
  setSwitchDisabled: (value: boolean) => void;
};

export function setServiceSelected({ ...props }: setServiceSelectedProps) {
  const serviceSelect = props.event.target.value;
  props.setCurrentService(serviceSelect);
  switch (serviceSelect) {
    case ServiceName.REDIS_NODE:
      props.setSwitchDisabled(true);
      break;
    case ServiceName.COMPUTING_NODE:
    case ServiceName.DISPATCHER:
    case ServiceName.ROUTING_SERVER:
    case ServiceName.BROKER:
    default:
      props.setSwitchDisabled(false);
      break;
  }
}
