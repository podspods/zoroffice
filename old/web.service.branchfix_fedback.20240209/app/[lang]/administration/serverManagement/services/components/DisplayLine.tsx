import { useTranslation } from 'react-i18next';
import { Theme } from '@systran/react-components/lib/Theme';
import styled from '@systran/react-components/lib/Theme/styled';
import { Status } from './serviceType';

export type DisplayLineProps = {
  label?: string;
  value?: string;
  innerHtml?: React.JSX.Element | undefined;
  column?: number | undefined;
  marginLeft?: number | undefined;
  leading?: boolean | undefined;
  columnSize?: number | undefined;
  leadingSize?: number | undefined;
  status?: Status;
};

export default function DisplayLine(
  {
    status = Status.INFO,
    label = undefined,
    value = undefined,
    innerHtml = undefined,
    column = 0,
    marginLeft = 0,
    leading = false,
    columnSize = 5,
    leadingSize = 0.5
  }: DisplayLineProps,
  key: string
) {
  const { t } = useTranslation();
  if (label === undefined || value === undefined) return null;
  if (!key) key = `${label}_${value}`;
  const paddingLeft = column * columnSize;
  const paddingTop = leading ? leadingSize : 0;
  const myMarginLeft = marginLeft * columnSize;
  return (
    <StyledDisplayLine
      key={key}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      marginLeft={myMarginLeft}
      status={status}
    >
      {label ? <strong>{t(label)}</strong> : undefined}
      {label && (value || innerHtml) ? <strong>: </strong> : undefined}
      {value ? t(value) : undefined}
      {innerHtml ? innerHtml : undefined}
    </StyledDisplayLine>
  );
}

const StyledDisplayLine = styled.div<{
  theme?: Theme;
  status: Status;
  paddingTop: number;
  paddingLeft: number;
  marginLeft: number;
}>`
  background: ${({ status, theme }) => {
    if (status === Status.PRIMARY) {
      return theme.palette.primary.light;
    }
    if (status === Status.ERROR) {
      return theme.palette.error.light;
    }
    if (status === Status.SUCCESS) {
      return theme.palette.success.light;
    }

    return null;
  }};
  padding-left: '0.4rem';
  padding-top: ${({ paddingTop }) => paddingTop.toString() + 'rem'};
  padding-left: ${({ paddingLeft }) => paddingLeft.toString() + 'rem'};
  margin-left: ${({ marginLeft }) => marginLeft.toString() + 'rem'};
  border-radius: 0.2rem;
`;
