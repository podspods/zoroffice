import {ReactNode} from 'react';
import Grid from '@mui/material/Grid';
import {styled, Theme} from '@systran/react-components/lib/Theme';

type TComputingNodeCommonListProp = {
  list: Array<{label: string; value: null | string | number | ReactNode; hidden?: boolean}>;
  labelMd?: number;
  valueMd?: number;
};

const GridRow = ({label, value, labelMd, valueMd}: {label: string; value: null | number | string | ReactNode; labelMd: number; valueMd: number}) => {
  return (
    <Grid container>
      <Grid item md={labelMd}>
        {label}
      </Grid>
      <Grid item md={valueMd}>
        {value}
      </Grid>
    </Grid>
  );
};

export const ComputingNodeCommonList = ({list, labelMd = 4, valueMd = 8}: TComputingNodeCommonListProp) => {
  return (
    <DependencyContainer>
      {list.map(({label, value, hidden}) => {
        if (hidden) {
          return null;
        }
        return <GridRow key={label} label={label} value={value} labelMd={labelMd} valueMd={valueMd} />;
      })}
    </DependencyContainer>
  );
};

export const GridStyled = styled(Grid)<{theme?: Theme}>`
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  padding: 9px 12px;
  border-radius: 3px;
  background-color: ${({theme}) => {
    return theme.palette.info.light;
  }};
  margin-bottom: 20px;
`;

const DependencyContainer = styled.div<{theme?: Theme}>`
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  padding: 18px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => {
    return theme.palette.offGrey.border;
  }};
`;

export const Panel = styled.div<{theme?: Theme}>`
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid transparent;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: ${({theme}) => {
    return theme.palette.offGrey.border;
  }};
  border-radius: 4px;
`;

export const PanelHeading = styled.div<{theme?: Theme}>`
  padding: 20px 15px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${({theme}) => {
    return theme.palette.greyScale.light;
  }};
`;

export const PanelBody = styled.div<{theme?: Theme}>`
  padding: 15px;
`;
