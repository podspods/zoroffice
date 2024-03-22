import React from 'react';

/** service helper and utilities  */
import {
  Service,
  ServiceName,
  Status,
  TypeAction,
  deregisterableList
} from './services.type';
import moment from 'moment';
import {
  actionDeRegister,
  actionRegister,
  isToasted
} from './services.constant';
import { commonFetch } from 'utils/fetcher';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {
  resetCurrentHostname,
  resetCurrentService,
  resetSwitchDisabled,
  setRefresh
} from './services.store';
import Toaster from './components/Toaster';

export function convertStatus(statusText: string) {
  switch (statusText) {
    case 'fail':
      return Status.error;
    case 'running':
      return Status.success;
    case 'success':
      return Status.success;
    default:
      return 'default';
  }
}

export function convertService(rawData: any): Service {
  if (rawData.id) return { ...rawData };
  if (rawData._id) return { ...rawData, id: rawData._id };
  return { ...rawData, id: rawData.name };
}
// export function getStatusList(notificationList: Service[]): string[] {
//   const statusTab = notificationList.map(
//     (notification: any) => notification.status
//   );
//   return [...new Set(statusTab)];
// }

/** dateString should be mongoDb data format e.g  'Y-MM-DD HH:mm:ss.SSS Z'*/
export function durationFromNow(dateString: string): string {
  if (!dateString) return '';
  return moment(dateString)
    .fromNow()
    .toString();
}

export function elapsedTime(nbSecond: number | string) {
  if (typeof nbSecond === 'string') {
    try {
      const castToInt = parseInt(nbSecond, 10);
      return moment
        .duration(isNaN(castToInt) ? null : castToInt, 'seconds')
        .humanize();
      // eslint-disable-next-line brace-style
    } catch (error) {
      return null;
    }
  }
  return moment.duration(nbSecond, 'seconds').humanize();
}

export function displayByte(value: number | string): string {
  let result: number | null = 0;
  if (typeof value === 'string') {
    try {
      const castToInt = parseInt(value, 10);
      result = isNaN(castToInt) ? null : castToInt;
      // eslint-disable-next-line brace-style
    } catch (error) {
      result = null;
    }
    // eslint-disable-next-line brace-style
  } else {
    result = value;
  }

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
    actionRegister,
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

/**
 *
 * register
 * https://localhost:3450/computingNode/register
 * hostname = "localhost"
 * {"hostname":"rallla","secure":true}
 */
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

/**
 *
 * register
 * https://localhost:3450/dispatcher/deregister
 * hostname = "localhost"
 */
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

export const URL_HOST = 'localhost';
export const URL_PROTOCOLE = 'https';
export const URL_PORT = '3450';

export function endPoint(serviceName: string, action: TypeAction): string {
  if (!serviceName) return null;
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
      return null;
  }
}

export function rowList(
  checkedList: string[],
  serviceRegisteredList: Service[]
): Service[] {
  return serviceRegisteredList.map((oneService) => {
    if (checkedList.includes(oneService.id)) return oneService;
    return null;
  });
}

export function ToastedMessage(messageList: string[]) {
  return (
    isToasted &&
    messageList.map((oneMessage) => <Toaster message={oneMessage} />)
  );
}
