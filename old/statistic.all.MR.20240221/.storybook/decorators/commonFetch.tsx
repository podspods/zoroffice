import { SWRConfig } from 'swr';
import { commonFetch } from '@/utils/fetcher';

export default function withCommonFetch(Story) {
  return (
    <SWRConfig value={{
      shouldRetryOnError: false,
      fetcher: commonFetch
    }}
    >
      <Story />
    </SWRConfig>
  );
}
