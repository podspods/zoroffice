import { commonFetch } from 'utils/fetcher';
import Apis from 'utils/apis';
import { DateTime } from 'luxon';
import {
  ResponseServices,
  Service,
  ServiceName,
  TypeAction,
  deregisterableList
} from './serviceType';

function serviceAdaptator(serviceInput: Service): Service {
  let service: Service = { ...serviceInput };
  if (!serviceInput.id) {
    if (!serviceInput.id) {
      if (serviceInput._id) service = { ...serviceInput, id: serviceInput._id };
      else service = { ...service, id: `no-id_${serviceInput.name}` };
    }
  }

  if (!serviceInput.id) {
    if (serviceInput._id) service = { ...serviceInput, id: serviceInput._id };
    else service = { ...service, id: `no-id_${serviceInput.name}` };
  }

  if (serviceInput?.app?.version)
    service = { ...service, version: serviceInput.app.version };
  return service;
}

export function loadService(rawData: ResponseServices): Service[] {
  if (rawData && rawData.services) {
    const newServiceList: Service[] = rawData.services.map((oneRow: Service) =>
      serviceAdaptator(oneRow)
    );
    return newServiceList;
  }
  return [];
}

function endPoint(serviceName: string, action: TypeAction): string {
  if (!serviceName) return '';
  switch (serviceName) {
    case ServiceName.BROKER:
      return Apis.service.broker(action);
    case ServiceName.COMPUTING_NODE:
      return Apis.service.computingNode(action);
    case ServiceName.DISPATCHER:
      return Apis.service.dispatcher(action);
    case ServiceName.ROUTING_SERVER:
      return Apis.service.routingServer(action);
    case ServiceName.REDIS_NODE:
      return Apis.service.redistNode(action);
    default:
      return '';
  }
}
export function durationFromNow(
  dateString: string | undefined
): string | undefined {
  if (!dateString) return undefined;
  const result = DateTime.fromISO(dateString).toRelative();
  return result ? result : undefined;
}

export function elapsedTime(
  nbMilliSecond: number | undefined
): string | undefined {
  if (!nbMilliSecond) return undefined;
  return DateTime.now()
    .minus({ milliseconds: nbMilliSecond ? nbMilliSecond : undefined })
    .toRelative();
}

function valueToFloat(value: number | string): number | undefined {
  let result: number | undefined;
  if (typeof value === 'string') {
    try {
      const castToInt = parseFloat(value);
      result = isNaN(castToInt) ? undefined : castToInt;
    }
    catch (error) {
      console.error('valueToFloat', error); // eslint-disable-line no-console
      result = undefined;
    }
  }
  else {
    result = value;
  }
  return result;
}

export function displayByte(
  value: number | string | undefined,
  multiplier?: number
): string {
  if (!value) return '';
  const convertedValue = valueToFloat(value);
  if (!convertedValue || convertedValue <= 0) return '0 B';

  const result = multiplier ? convertedValue * multiplier : convertedValue;
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

export async function fetchDeregister(service: string, hostname: string) {
  const api = endPoint(service, TypeAction.DEREGISTER);

  const options = {
    method: 'POST',
    body: JSON.stringify({
      hostname: hostname
    })
  };
  if (api) {
    const status = await commonFetch(api, options);
    return status ? status : false;
  }
  return false;
}

export function toLocalTime(dateSring: string): string {
  if (!dateSring) return '';
  const inputDateTime = DateTime.fromISO(dateSring, { zone: 'utc' });
  const formattedDate = inputDateTime.setLocale('en').toLocaleString({
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return formattedDate;
}

export function lastSuccessfulUpdate(service: Service): string | undefined {
  if (
    (service.status !== 'running' || service.warning !== undefined) &&
    service.lastSuccessfulUpdate !== undefined
  )
    return durationFromNow(service.lastSuccessfulUpdate);
  return undefined;
}

export function displayStatus(service: Service): string | undefined {
  if (
    (service.hostname ||
      service.lastPollingDate ||
      service.lastPollingDate ||
      service.lastTrsUpdate ||
      service.lastUpdate) &&
    service.status
  ) {
    return service.status;
  }
  return undefined;
}
