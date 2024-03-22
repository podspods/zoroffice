import moment from 'moment';
import { commonFetch } from 'utils/fetcher';
import Apis from 'utils/apis';
import {
  ResponseServices,
  Service,
  ServiceName,
  TypeAction,
  deregisterableList
} from './serviceType';
import { uniqueId } from 'lodash';

export function adaptator(serviceInput: Service): Service {
  let service: Service = { ...serviceInput };
  if (!serviceInput.id && serviceInput._id) {
    service = { ...serviceInput, id: serviceInput._id };
  }
  else service = { ...service, id: uniqueId('no-id') };
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

function valueToFloat(value: number | string): number | undefined {
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
