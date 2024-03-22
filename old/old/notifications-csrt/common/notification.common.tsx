export const baseUrl = '/node/';

export type Notification = {
  id: string;
  mark: string;
  level: string;
  levelColor: string;
  levelId: number;
  rowColor: string;
  read: boolean;
  notification: string;
  insertedAt: string;
};

export const notificationRoute = {
  list: '/node/notifications/list',
  read: '/node/notification/read',
  unRead: '/node/notification/unread',
  remove: '/node/notification/delete'
};

// let csrfToken = '';
// export function setCsrfToken(token) {
//   csrfToken = token;
// }

// export async function commonFetch(api: string, options?: RequestInit) {
//   // console.log(' csrfToken 29 ==>', csrfToken);

//   // csrfToken = 'oKCfiTfA-QPmBD-wxY-RCOEFa0lvFrK3Cd-8';

//   // console.log(' csrfToken 33 ==>', csrfToken);
//   try {
//     let headers = {
//       'Content-Type': 'application/json',
//       'x-requested-with': 'XMLHttpRequest'
//     };
//     if (csrfToken) {
//       headers['X-CSRF-Token'] = csrfToken;
//     }
//     if (options?.headers) {
//       headers = {
//         ...headers,
//         ...options.headers
//       };
//     }
//     console.log('headers ==>', headers);

//     const response = await fetch(api, {
//       credentials: 'include',
//       headers,
//       ...options
//     });
//     if (response.status === 200) {
//       return response.json();
//     }
//     // if (response.status === 403) {
//     //   throw new Error('403 Forbidden');
//     // }
//     // throw new Error(response.statusText);
//     console.warn('ERROR', response.statusText);
//     return response.json();
//   } catch (error) {
//     // eslint-disable-next-line
//     console.log('ERROR', error);
//     throw error;
//   }
// }
