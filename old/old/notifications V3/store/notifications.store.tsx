import { action, map } from 'nanostores';
import { ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { Notification } from '../common/common';


export type NotificationStore = {
  id: string;
  isAllChecked: boolean | null;
  isChecked: boolean | null;
  notificationLevel: string;
  readStatus: boolean | null;
  message: string;
  messageMoment: string;
  notificationList: Notification[];
};

export const NotificationStore = map<NotificationStore>({
  id: '',
  isAllChecked: false,
  isChecked: false,
  notificationLevel: '',
  readStatus: false,
  message: '',
  messageMoment: '',
  notificationList: []
});

export const setRefresh = action(
  NotificationStore,
  'setRefresh',
  (store, e: ChangeEvent<HTMLInputElement>) => {
    store.setKey('id', e.currentTarget.value);
    const { id } = store.get();
    console.log('store.get(id) 29=>', id, e.currentTarget.value);
  }
);

function writeMessageRead(id: string) {
  // writeToData(id,true)
}

// export const setRead = action(
//   NotificationStore,
//   'setRead',
//   (store, event: MouseEvent<HTMLDivElement>) => {})
//     console.log('store.get(id) 29=>');
  
    // 1 -> filter notificationItem checked
    // const readNotification = notificationList.map((id) =>{
      // getStatInCheckboxForEachId. if checked then return 

    // })
    // 2 -> update on database Only field (update all rrecord ?)
      // UpdateNotifiacationList(readNotification);
      // refreshNotificationListFromStore()
  // }
// );
