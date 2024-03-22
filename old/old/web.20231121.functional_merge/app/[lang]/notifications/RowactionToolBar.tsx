import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { NotificationInput } from './notifications.type';
import { MARK_AS_READ, MARK_AS_UNREAD } from './notifications.constant';
import { useStore } from '@nanostores/react';
import { notificationsStore } from './notifications.store';

// export type RowAction<RowType> = {
//   label?: string;
//   icon?: ReactNode;
//   onClick?: (selectedRows: RowType[]) => void;
//   disable?: (selectedRows: RowType[]) => boolean;
//   // Link related props
//   component?: ComponentType; // Component wrapping action (can be used to add a link)
//   href?: (selectedRows: RowType[]) => string; // Only called when the action is not disabled
// }

export const rowActions: RowAction<NotificationInput>[] = [
  {
    label: MARK_AS_READ,
    icon: <PlusIcon />,
    disable: (selectedRows) => !selectedRows.length,
    onClick: (params) => void rowActionRead(params)
  },
  {
    label: MARK_AS_UNREAD,
    icon: <PlusIcon />,
    disable: (selectedRows) => !selectedRows.length,
    onClick: (params) => void rowActionUnRead(params)
  }
];

function rowActionRead(param?: NotificationInput[]) {
  console.log('rowActionRead ==>', param);
}

function rowActionUnRead(param?: NotificationInput[]) {
  console.log('rowActionUnRead ==>', param);
}

export function MyToolbar() {
  const { checkedList } = useStore(notificationsStore);
  return (
    <RowActionToolbar
      actions={rowActions}
      selectedRows={selectedRows(checkedList)}
    />
  );
}

function selectedRows(idList: string[]): NotificationInput[] {
  const { notificationList } = useStore(notificationsStore);
  return notificationList.map((oneNotification) => {
    if (idList.includes(oneNotification.id)) return oneNotification;
  });
}
