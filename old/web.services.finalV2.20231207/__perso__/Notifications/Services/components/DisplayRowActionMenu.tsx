import React from 'react';
import { Service, deregisterableList } from '../type';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import { actionDeRegisterEllipsis } from '@/components/Services/constant';

export default function DisplayRowActionMenu(row: Service) {
  if (!deregisterableList.includes(row.name)) return <></>;

  return (
    <RowActionMenu actions={[actionDeRegisterEllipsis]} selectedRow={row} />
  );
}
