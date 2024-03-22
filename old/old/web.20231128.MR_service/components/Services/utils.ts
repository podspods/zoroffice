import moment from 'moment';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { commonFetch } from 'utils/fetcher';
import {
  Service,
  ServiceName,
  Status,
  TypeAction,
  deregisterableList
} from '@/components/Services/type';
import {
  NO_HOSTNAME,
  NO_SERVICE_NAME,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE,
  actionDeRegister
} from '@/components/Services/constant';
import {
  resetCurrentHostname,
  resetCurrentService,
  resetSwitchDisabled,
  setRefresh
} from '@/components/Services/store';

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
      break;
  }
  return returnStatus;
}

export function uniqueIdRandom(): string {
  const dataNow = Date.now();
  const randomNumber = Math.floor(Math.random() * 100001);
  return `${dataNow}_${randomNumber}`;
}

export function uniqueId({ ...props }: Service): string {
  const serviceName = props.name ? props.name : NO_SERVICE_NAME;
  const hostname = props.hostname ? props.hostname : NO_HOSTNAME;
  return `${serviceName}_${hostname}`;
}

export function adaptator(rawData: any): Service {
  let service: Service = { ...rawData };
  if (!rawData.id) {
    if (rawData._id) service = { ...service, id: rawData._id };
    else service = { ...service, id: uniqueId(service) };
  }

  if (rawData.app && rawData.app.version)
    service = { ...service, version: rawData.app.version };

  return service;
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

export function actionList(checkList: string[]): RowAction<Service>[] {
  return [
    {
      ...actionDeRegister,
      disable: () => checkList.length !== 1
    }
  ];
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
    if (status) {
      resetCurrentService();
      resetCurrentHostname();
      resetSwitchDisabled();
      setRefresh();
      return status;
    }
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
    if (status) {
      resetCurrentService();
      resetCurrentHostname();
      resetSwitchDisabled();
      setRefresh();
      return status;
    }
  }
  return false;
}

export function endPoint(serviceName: string, action: TypeAction): string {
  if (!serviceName) return '';
  switch (serviceName) {
    case ServiceName.BROKER:
      return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/node/queue/${action}`;
    case ServiceName.COMPUTING_NODE:
      return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/node/computingNode/${action}`;
    case ServiceName.DISPATCHER:
      return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/node/dispatcher/${action}`;
    case ServiceName.ROUTING_SERVER:
      return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/node/route/${action}`;
    case ServiceName.REDIS_NODE:
      return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/node/cache/${action}`;
    default:
      return '';
  }
}

export function rowList(
  checkedList: string[],
  serviceRegisteredList: Service[]
): Service[] {
  if (!serviceRegisteredList) return [];
  return serviceRegisteredList.filter((oneService) =>
    checkedList.includes(oneService.id)
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
