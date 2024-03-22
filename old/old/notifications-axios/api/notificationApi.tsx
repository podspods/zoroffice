import { Notification } from '../types/Notification.type';
import axios from 'axios';

const notificationApi = axios.create({
  baseURL: '/node/'
});

export const notificationEndpoint = '/notifications/list';

export async function getNotificationList() {
  // const notificationListUrlEndpoint = '/list';
  const response = await notificationApi.get(notificationEndpoint);
  return response.data;
}
export async function setNotificationRead(notification: Notification) {
  const notificationReadUrlEndpoint = '/notification/read';
  console.log(' notificationReadUrlEndpoint 17 ==>', notificationReadUrlEndpoint);

  const response = await notificationApi.post(
    `${notificationReadUrlEndpoint}/${notification.id }`,
    // `${notificationReadUrlEndpoint}`,
    { id: notification.id }
  );
  console.log('setNotificationUnRead 27 ==>', notificationReadUrlEndpoint);
  return response.data;
}

export async function setNotificationUnRead(notification: Notification) {
  const notificationReadUrlEndpoint = '/notification/unread';
  console.log(
    ' notificationReadUrlEndpoint 30 ==>',
    notificationReadUrlEndpoint
  );
  const response = await notificationApi.post(
    `${notificationReadUrlEndpoint}`,
    // `${notificationReadUrlEndpoint}`,
    { id: notification.id }
  );
  console.log('setNotificationUnRead 41 ==>' );
  
  return response.data;
}
