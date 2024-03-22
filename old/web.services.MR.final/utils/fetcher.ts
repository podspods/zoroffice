let csrfToken = '';
export function setCsrfToken(token: string) {
  csrfToken = token;
}

export async function commonFetch(api: string, options?: RequestInit) {
  try {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-requested-with': 'XMLHttpRequest'
    };
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
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

// It's for calling multiple apis. Ex: useSWR([Apis.profilesLps, Apis.profilesOwner, Apis.profilesDomain, Apis.profilesSize, Apis.profilesTechno], allSettledFetcher);
export function allSettledFetcher(urls: Array<string>) {
  return Promise.allSettled(urls.map((url) => commonFetch(url)));
}