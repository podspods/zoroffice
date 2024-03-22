import React, { PropsWithChildren } from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography'

export type Props = PropsWithChildren<{}>;

export default function PageTitle(props: Props) {
  return (
    <TypographyStyled>
      {props.children}
    </TypographyStyled>
  );
}

const TypographyStyled = styled(Typography)`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 1000;
`;
