import moment from 'moment';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import EyeIcon from '@systran/react-components/lib/atoms/Icons/EyeIcon';
import { Notification } from './NotificationsType';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
export function markAsRead(rowList: Notification[], mutate: () => Promise<unknown>) {
  const unReadList = rowList.filter(
    (oneRow: Notification) => oneRow.read === false
  );
  if (unReadList.length > 0) {
    unReadList.map(
      async (oneRow: Notification) =>
        await setNotificationStatus(oneRow.id, true)
    );
    void mutate();
  }
}

export function markAsUnRead(rowList: Notification[], mutate: () => Promise<unknown>) {
  const readList = rowList.filter(
    (oneRow: Notification) => oneRow.read === true
  );
  if (readList.length > 0) {
    readList.map(
      async (oneRow: Notification) =>
        await setNotificationStatus(oneRow.id, false)
    );
    void mutate();
  }
}

export async function markAllAsRead(mutate: () => Promise<unknown>) {
  const options = {
    method: 'POST'
  };
  try {
    await commonFetch(Apis.notification.readAll, options);
    return null;
  }
  catch (error) {
    return (
      error instanceof Error && (
        <ErrorCard
          errorMessage={`Error during network request  ${error.toString()}`}
        />
      )
    );
  }
  finally {
    void mutate();
  }
}

export async function setNotificationStatus(id: string, read: boolean) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api =
    (read ? String(Apis.notification.read) : String(Apis.notification.unRead)) +
    '/' +
    String(id);
  await commonFetch(api, options);
}

export function durationFromNow(dateString: string): string {
  const myMoment = moment(dateString);
  return myMoment.isValid() ? myMoment.fromNow().toString() : '';
}

export function actionList(mutate: () => Promise<unknown>) {
  const actions: RowAction<Notification>[] = [
    {
      label: 'Mark as read',
      icon: <EyeIcon />,
      onClick: (params) => void markAsRead(params, mutate)
    },
    {
      label: 'Mark as unread',
      icon: <EyeIcon slash />,
      onClick: (params) => void markAsUnRead(params, mutate)
    }
  ];

  return actions;
}
