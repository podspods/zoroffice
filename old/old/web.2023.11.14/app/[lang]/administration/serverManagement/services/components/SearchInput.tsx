import { styled } from '@mui/material';
import React from 'react';
import SearchIcon from '@systran/react-components/lib/atoms/Icons/SearchIcon';
import AppTextField from '@systran/react-components/lib/atoms/AppTextField';
import { SEARCH } from '../services.constant';
import { useTranslation } from 'react-i18next';
// ???? use systran them here ???

export type SearchInputProps = {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
};

export function SearchInput({ ...props }: SearchInputProps) {
  const { t } = useTranslation();
  return (
    <Search>
      <Icone onClick={props.onClick}>
        <SearchIcon />
      </Icone>
      <AppTextField
        type='text'
        readOnly={false}
        onChange={props.onChange}
        value={props.value}
        placeholder={t(SEARCH)}
      />
    </Search>
  );
}

const Icone = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0 2.5;
`;

const Search = styled('div')`
  display: flex;
  align-items: center;
  border: solid 1px blue;
  border-radius: 0.2rem;
  width: 'auto';
  height: 2rem;
  padding: 0.2 2rem;
`;
