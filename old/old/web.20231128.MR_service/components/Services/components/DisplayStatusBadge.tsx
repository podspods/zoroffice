import React from 'react';
import StatusBadge, {
  Status as BadgeStatus
} from '@systran/react-components/lib/atoms/StatusBadge';
import { Status } from '@/components/Services/type';
import { convertStatus } from '@/components/Services/utils';
import { UNKNOW } from '../constant';

export default function DisplayStatusBadge(inputStatus: Status) {
  const compatibleStatus: BadgeStatus = convertStatus(inputStatus);
  return <StatusBadge title={inputStatus} status={compatibleStatus}>{inputStatus ? inputStatus : UNKNOW}</StatusBadge>;
}
