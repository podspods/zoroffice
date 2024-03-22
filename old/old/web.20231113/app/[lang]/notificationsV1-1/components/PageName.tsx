'use client';

import React from 'react';
import { styled } from '@mui/material';
export type PageNameProps = {
  name: string;
};

export default function PageName({ ...props }: PageNameProps) {
  return <StyledpageName>{props.name}</StyledpageName>;
}

const StyledpageName = styled('p')({
  borderRadius: 4,
  marginTop: '2rem',
  fontSize: '2rem',
  marginBottom: '2rem',
  fontWeight: 600
});
