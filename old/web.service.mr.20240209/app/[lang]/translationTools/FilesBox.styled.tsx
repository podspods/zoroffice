import styled from '@systran/react-components/lib/Theme/styled';
import Typography from '@mui/material/Typography';
import type {Theme} from '@systran/react-components/lib/Theme';
import TranslationFormFeature from '@systran/react-components/lib/organisms/TranslateBox/TranslationForm/TranslationFormFeature';

export const Title = styled(Typography) <{theme?: Theme}>`
  font-size: 22px;
  font-weight: 400;
  color: ${({theme}) => theme.palette.offGrey.dark};
`;
export const Instructions = styled(Typography) <{theme?: Theme}>`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.palette.greyScale.extraDark};
`;

export const Form = styled(TranslationFormFeature)`
  width: 100%;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 24px;
  margin-top: 10px;
`;

export const TranslateButton = styled.div`
  margin-left: 16px;
`;

export const TableContainer = styled('div')`
  margin-top: 32px;
`;
