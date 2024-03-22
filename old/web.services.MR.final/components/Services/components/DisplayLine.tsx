import React from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material';
import styled from '@emotion/styled';
import { Status as ServiceStatus, Status } from '@/components/Services/type';

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
  label?: string;
  value?: string;
  innerHtml?: React.JSX.Element | undefined;
  column?: number | undefined;
  leading?: boolean | undefined;
  columnSize?: number | undefined;
  leadingSize?: number | undefined;
  status?: ServiceStatus;
};

export default function DisplayLine(
  {
    status = Status.INFO,
    label = undefined,
    value = undefined,
    innerHtml = undefined,
    column = 0,
    leading = false,
    columnSize = 5,
    leadingSize = 0.5
  }: DisplayLineProps,
  key: string
) {
  const { t } = useTranslation();
  if (label === undefined || value === undefined) return null;
  if (!key) key = `${label}_${value}`;
  const marginLeft = column * columnSize;
  const marginTop = leading ? leadingSize : 0;
  return (
    <StyledDisplayLine
      key={key}
      marginTop={marginTop}
      marginLeft={marginLeft}
      status={status}
    >
      {label ? <strong>{t(label)}</strong> : undefined}
      {label && value ? <strong>: </strong> : undefined}
      {value ? t(value) : undefined}
      {label && innerHtml ? <strong>: </strong> : undefined}
      {innerHtml ? innerHtml : undefined}
    </StyledDisplayLine>
  );
}

const StyledDisplayLine = styled.div<{
  theme?: Theme;
  status: Status;
  marginTop: number;
  marginLeft: number;
}>`
  background-color: ${({ status, theme }) => {
    if (status === Status.ERROR) {
      return theme.palette.error.light;
    }
    return null;
  }};
  padding-left: '0.4rem';
  margin-top: 2rem;
  margin-top: marginTop + 'rem';
  margin-left: marginLeft + 'rem';
`;
