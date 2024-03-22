import React from 'react';
// TODO: remove the @mui library from package.json
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SkeletonContent() {
  return (
    <Stack spacing={4} style={{flex: '1', border: '0px', position: 'absolute', paddingInline: '60px', paddingTop: '80px'}}>
      <Skeleton variant='rectangular' width='246px' height='35px' animation='wave' style={{borderRadius: '4px'}} />
      <Skeleton variant='rectangular' width='443px' height='36px' animation='wave' style={{borderRadius: '4px'}} />
      <Skeleton variant='rectangular' width='273px' height='36px' animation='wave' style={{borderRadius: '4px'}} />
      <Skeleton variant='rectangular' width='555px' height='101px' animation='wave' style={{borderRadius: '4px', marginTop: '70px'}} />
      <Skeleton variant='rectangular' width='435px' height='161px' animation='wave' style={{borderRadius: '4px'}} />
    </Stack>
  );
}
