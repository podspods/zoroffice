import { useTranslation } from 'react-i18next';
import { Theme } from '@systran/react-components/lib/Theme';
import styled from '@systran/react-components/lib/Theme/styled';
import { Status } from './serviceType';

export type DisplayLineProps = {
  label?: string;
  value?: string;
  innerHtml?: React.JSX.Element | undefined;
  column?: number | undefined;
  leading?: boolean | undefined;
  columnSize?: number | undefined;
  leadingSize?: number | undefined;
  status?: Status;
  toTranslate?: boolean;
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
    leadingSize = 0.5,
    toTranslate = true
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
<<<<<<< Updated upstream
      {label ? <strong>{t(label)}</strong> : undefined}
      {label && value ? <strong>: </strong> : undefined}
      {value ? t(value) : undefined}
      {label && innerHtml ? <strong>: </strong> : undefined}
      {innerHtml ? innerHtml : undefined}
=======
      {label && (
        <>
          <strong>{t(label)}</strong>
          {(value || innerHtml) && <strong>: </strong>}
        </>
      )}
      {value && (toTranslate ? t(value) : value)}
      {innerHtml}
>>>>>>> Stashed changes
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
  margin-top: ${({ marginTop }) => marginTop.toString() + 'rem'};
  margin-left: ${({ marginLeft }) => marginLeft.toString() + 'rem'};
  border-radius: 0.2rem;
`;
