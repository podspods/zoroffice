import { SystranFile } from '@systran/react-components/lib/organisms/FileUploadCore';
import { commonFetch } from '@/utils/fetcher';

export type Part = {name: string, value: string | Blob}

export async function uploadFile(route: string, parts: Part[], file: SystranFile) {
  const body = new FormData();
  try {
    parts.forEach(({name, value}) => body.append(name, value));
    body.append('files[]', file.rawFile);
    return await commonFetch(route, {
      headers: {
        'x-file-size': file.size.toString(),
        'Content-Type': null
      },
      method: 'POST',
      body
    });
  }
  catch (err) {
    if (err instanceof Error) {
      return { error: { type: err.cause, message: err.message } };
    }
    return { error: { type: 'request', message: 'Unknown error' } };
  }
}
