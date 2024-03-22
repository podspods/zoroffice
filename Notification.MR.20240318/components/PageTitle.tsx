import React, { PropsWithChildren, ReactNode } from 'react';
import { styled as MUIStyled } from '@mui/system';
import {Typography as MUITypography} from '@mui/material';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import { type Theme, styled } from '@systran/react-components/lib/Theme';


export type PageTitleProps = PropsWithChildren<object>;

export type TitleWithTooltipProps = {
  titleName: string;
  tooltipContent: ReactNode;
}


export default function PageTitle(props: PageTitleProps) {
  return (
    <TitleContainer>
      <TypographyTitle>
        {props.children}
      </TypographyTitle>
    </TitleContainer>
  );
}

export const TitleTooltip = ({titleName, tooltipContent}: TitleWithTooltipProps) => {

  return (
    <TitleTooltipContainer>
      <TypographyTitle>{titleName}</TypographyTitle>
      <Tooltip title={<>{tooltipContent}</>} placement={'right'} disableMaxWidth>
        <ColoredIcon><InfoIcon shape={'solid'} size={'lg'} /></ColoredIcon>
      </Tooltip>
    </TitleTooltipContainer>
  );
};


const ColoredIcon = styled('div')<{ theme?: Theme }>`
  color: ${({theme}) => theme.palette.primary.main};
  display: flex;
  align-items: center;
`;


export const TitleContainer = styled('div')`
  margin-bottom: 24px;
`;

export const TypographyTitle = MUIStyled(MUITypography)`
  font-size: 24px;
  font-weight: 1000;
  font-family: Quicksand;
`;

export const TitleTooltipContainer = MUIStyled(TitleContainer)<{ theme?: Theme }>`
  display: flex;
  gap: 0.5rem;
`;
