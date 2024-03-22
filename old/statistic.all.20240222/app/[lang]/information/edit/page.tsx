'use client';

import SkeletonContent from '@/components/IframeLoader';
import Apis from '@/utils/apis';
import Box from '@mui/material/Box';
import useSWR from 'swr';
import StatusBadge, {Status} from '@systran/react-components/lib/atoms/StatusBadge';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {commonFetch} from '@/utils/fetcher';
import FileEditor from '@systran/react-components/lib/molecules/FileEditor';
import InternalRoutes from '@/utils/internalRoutes';

export default function InformationEdit() {
  const {t} = useTranslation();
  const [status, setStatus] = useState<{msg: string; type: Status | undefined}>({msg: '', type: undefined});
  const {data = {}, isLoading} = useSWR(Apis.information.contentMD, {
    onError: () => setStatus({msg: 'Error while fetching data', type: 'error'}),
    onSuccess: () => setStatus({msg: '', type: undefined})
  });
  const router = useRouter();

  if (isLoading) {
    return <SkeletonContent />;
  }

  const onClose = () => {
    router.push(InternalRoutes.informationView);
  };

  const onSave = async (content: string) => {
    try {
      setStatus({msg: '', type: undefined});
      const requestOption = {
        method: 'POST',
        body: JSON.stringify({information: content})
      };
      await commonFetch(Apis.information.content, requestOption);
      setStatus({msg: 'New information saved', type: 'success'});
    }
    catch (error) {
      setStatus({msg: 'Error while saving', type: 'error'});
    }
  };

  return (
    <Box m={4} width='100%'>
      {status.msg && (
        <StatusBadge title={status.msg} status={status.type}>
          {t(status.msg)}
        </StatusBadge>
      )}
      <FileEditor id='information-edit' content={data.information} onSave={onSave} onClose={onClose} />
    </Box>
  );
}
