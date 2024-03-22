import React from 'react';
import StatusBadge, {
  Status
} from '@systran/react-components/lib/atoms/StatusBadge';
import { useTranslation } from 'react-i18next';
export type DisplayStatusProps = {
  level: Status;
};

export default function DisplayStatus({ ...props }: DisplayStatusProps) {
  const { t } = useTranslation();
  return (
    <StatusBadge
      title={props.level}
      status={props.level}
    >
      {t(props.level)}
    </StatusBadge>
  );
}
