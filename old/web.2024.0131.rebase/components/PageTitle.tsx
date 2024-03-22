import React, { PropsWithChildren } from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

export type Props = PropsWithChildren<{}>;

export default function PageTitle(props: Props) {
  return (
    <PageTitleContainer>
      <TypographyStyled>
        {props.children}
      </TypographyStyled>
    </PageTitleContainer>
  );
}

export const PageTitleContainer = styled('div')`
  margin-bottom: 24px;
`;

export const TypographyStyled = styled(Typography)`
  font-size: 24px;
  font-weight: 1000;
`;
