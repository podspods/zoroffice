import React from 'react';
import { convertStatus } from '../services';
import { useTranslation } from 'react-i18next';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';

export function HTStatusBadge({ ...props }) {
  const { t } = useTranslation();
  return (
    <div>
      {props.testStatusBadge && (
        <React.Fragment>
          <p>status: {convertStatus(props.serviceInput.services[0].status)}</p>
          <StatusBadge
            title={'test badge'}
            type={convertStatus(props.serviceInput.services[0].status)}
            text={t(props.serviceInput.services[0].status)}
          />
        </React.Fragment>
      )}
    </div>
  );
}

