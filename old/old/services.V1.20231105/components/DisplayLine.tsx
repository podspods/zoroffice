import { styled } from '@mui/material';

import { useTheme } from '@systran/react-components/lib/Theme/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Status } from '../services.type';
/**
 * this component display a text line. it is first created to use in the expand box.
 * label : in strong (bold)
 * value : simple texte value could be null, undefined, empty string or string
 * innerhtml : react.node
 * key : index key for react component (should be a unique key)
 * column :equivalent to a tab
 * leading : equivalent to a line space on the top of the line
 * columnSize : define the size of the column
 * leadingSize : define the size on line space before text
 */

export type DisplayLineProps = {
  label?: string | undefined;
  value?: string | undefined;
  innerHtml?: React.JSX.Element | undefined;
  column?: number | undefined;
  leading?: boolean | undefined;
  columnSize?: number | undefined;
  leadingSize?: number | undefined;
  status?: Status;
};

export function DisplayLine(
  {
    label,
    value,
    innerHtml = undefined,
    column = 0,
    leading = false,
    columnSize = 5,
    leadingSize = 0.5,
    status
  }: DisplayLineProps,
  key: string
) {
  const { t } = useTranslation();
  if (label === undefined || value === undefined) return null;
  if (!key) key = `${label}_${value}`;
  const marginLeft = column * columnSize;
  const marginTop = leading ? leadingSize : 0;

  const theme = useTheme();
  const bgColor = status && theme.palette[status].light;

  return (
    <StyledDisplayLine
      key={key}
      marginTop={marginTop}
      marginLeft={marginLeft}
      backgroundColor={bgColor}
    >
      {label ? <strong>{t(label)}</strong> : undefined}
      {value ? `: ${t(value)}` : undefined}
      {innerHtml ? innerHtml : undefined}
    </StyledDisplayLine>
  );
}

const StyledDisplayLine = styled('div')<{
  backgroundColor?: string;
  marginTop: number;
  marginLeft: number;
}>(({ backgroundColor, marginTop, marginLeft }) => ({
  backgroundColor: backgroundColor,
  paddingLeft: '0.4rem',
  marginTop: `${marginTop}rem`,
  marginLeft: `${marginLeft}rem`
}));
