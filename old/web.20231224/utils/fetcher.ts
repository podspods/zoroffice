import { isNull, omit, omitBy } from 'lodash';
import { Overwrite } from 'utility-types';

let csrfToken = '';
export function setCsrfToken(token: string) {
  csrfToken = token;
}

export type ExtendedHeaders = Record<string, string | null>
export type Options = Overwrite<RequestInit, {headers?: ExtendedHeaders}>

export async function commonFetch(api: string, options?: Options) {
  try {
    let headers: ExtendedHeaders = {
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
      ...omit(options, 'headers'),
      headers: omitBy(headers, isNull) as Record<string, string>
    });

    const contentType = response.headers.get('content-type');

    if(response.ok) {
      if(contentType?.includes('application/json')) {
        return await response.json();
      }
      // Should manage more case as redirection.
      return {status: response.status, ok: true, statusText: response.statusText};
    }

    // Manage Errors
    if (contentType?.includes('application/json')) {
      const { message } = await response.json();
      throw new Error(`${response.status} ${response.statusText} ${message ? `${message}` : ''}`, {cause: message});
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
