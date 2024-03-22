import * as React from 'react';
import { styled, alpha, Theme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@systran/react-components/lib/atoms/Icons/SearchIcon';

export type SearchFieldProps = {
  placeholder: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
};

export default function SearchField({ ...props }: SearchFieldProps) {
  const { t } = useTranslation();
  return (
    <Search>
      <Icone onClick={props.onClick}>
        <SearchIcon />
      </Icone>
      <StyledInputBase
        placeholder={t(props.placeholder)}
        inputProps={{ 'aria-label': 'search' }}
        onChange={props.onChange}
      />
    </Search>
  );
}

const Icone = styled('div')<{ theme?: Theme }>`
  cursor: pointer;
  font-size: 2rem;
  padding: ${({ theme }) => theme.spacing(0, 1)};
  height: '100%';
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
`;

const Search = styled('div')<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.15)};
  margin-left: 0;
  width: '100%';
  &:hover {
    background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.25)};
  }
`;

const StyledInputBase = styled(InputBase)<{ theme?: Theme }>`
  color: 'inherit';
  & .MuiInputBase-input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 0)};
    padding-left: ${({ theme }) => `calc(1rem + ${theme.spacing(4)}`};
    transition: ${({ theme }) => theme.transitions.create('width')};
    width: '100%';
  }
`;
