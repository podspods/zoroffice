export const api = {
  notificationList: '/node/admin//notifications/list',
  notificationRead: '/node/admin/notification/read/',
  notificationUnRead: '/node/admin/notification/unread/',
  notificationDelete: '/node/admin//notification/delete/'
};

export async function commonFetch(api: string, options?: RequestInit) {
  try {
    let headers = {
      'Content-Type': 'application/json',
      'x-requested-with': 'XMLHttpRequest'
    };

    if (options?.headers) {
      headers = {
        ...headers,
        ...options.headers
      };
    }
    const response = await fetch(api, {
      credentials: 'include',
      headers,
      ...options
    });
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 403) {
      throw new Error('403 Forbidden');
    }
    throw new Error(response.statusText);
  }
  catch (error) {
    // eslint-disable-next-line
    console.log('ERROR', error);
    throw error;
  }
}
