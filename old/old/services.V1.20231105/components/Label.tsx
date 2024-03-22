import { Typography, styled } from '@mui/material';
import { SystranTheme } from '@systran/react-components/lib/Theme/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type LabelProps = {
  message?: string;
};
export function Label({ ...props }: LabelProps) {
  const { t } = useTranslation();
  return <MessageText>{props.message && t(props.message)}</MessageText>;
}

const MessageText = styled(Typography)<{ theme?: SystranTheme }>`
  color: ${({ theme }: { theme: SystranTheme }) => theme.palette.grey[500]};
  margin-left: 1rem;
`;
