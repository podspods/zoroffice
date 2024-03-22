'use client';

import SkeletonContent from '@/components/IframeLoader';
import Apis from '@/utils/apis';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';

export default function InformationView() {
  const {data, isLoading} = useSWR(Apis.information.content);

  if (!data || isLoading) {
    return <SkeletonContent />;
  }

  return (
    <Box m={4}>
      <Typography
        dangerouslySetInnerHTML={{
          __html: data.information.replace(/href/g, 'target="_blank" rel="noreferrer" href')
        }}
      />
    </Box>
  );
}
