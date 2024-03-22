import React from 'react';
import StatusBadge, {
  Status as BadgeStatus
} from '@systran/react-components/lib/atoms/StatusBadge';
import { convertStatus } from '@/components/Services/utils';
import { UNKNOW } from '@/components/Services/constant';

export default function DisplayStatusBadge(inputStatus: string) {
  const compatibleStatus: BadgeStatus = convertStatus(inputStatus);
  return <StatusBadge title={inputStatus} status={compatibleStatus}>{inputStatus ? inputStatus : UNKNOW}</StatusBadge>;
}
