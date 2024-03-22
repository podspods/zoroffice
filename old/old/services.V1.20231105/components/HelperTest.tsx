/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { ServiceName, TypeAction} from '../services.type';
import { convertStatus, endPoint } from '../services';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { useTranslation } from 'react-i18next';
export type HelperTestProps = {
  serviceInput: any;
};
const HelperTest = ({ ...props }: HelperTestProps) => {
  const { t } = useTranslation();
  const id = ServiceName['Broker'];
  return (
    <React.Fragment>
      <p>Helper Service</p>
      <p>{endPoint(ServiceName.BROKER, TypeAction.DEREGISTER)} </p>
      <p>{endPoint('Broker', TypeAction.REGISTER)} </p>
      <p>[{id}]</p>
      <p>[{ServiceName.COMPUTING_NODE}]</p>
      <p>total: {props.serviceInput.total}</p>
      <p>running: {props.serviceInput.running}</p>
      <p>failed: {props.serviceInput.failed}</p>
      <p>status: {convertStatus(props.serviceInput.services[0].status)}</p>
      <StatusBadge
        title={'test badge'}
        type={convertStatus(props.serviceInput.services[0].status)}
        text={t(props.serviceInput.services[0].status)}
      />
    </React.Fragment>
  );
};

export default HelperTest;
