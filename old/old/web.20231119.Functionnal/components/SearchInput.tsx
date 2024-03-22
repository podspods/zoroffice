import { styled } from '@mui/material';
import React from 'react';
import SearchIcon from '@systran/react-components/lib/atoms/Icons/SearchIcon';
import AppTextField from '@systran/react-components/lib/atoms/AppTextField';
import { useTranslation } from 'react-i18next';
// ???? use systran them here ???

export type SearchInputProps = {
  placeholder: string;
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
        placeholder={t(props.placeholder)}
        style={{
          flexGrow: 1,
        }}
      />
    </Search>
  );
}

const Icone = styled('div')`
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  border: solid 1px blue;
  border-radius: 0.2rem 0 0 0.2rem;
  padding: 0.2rem 0.5rem;
`;

const Search = styled('div')`
  display: flex;
  min-width: 100%;
  width: 100%;
  align-items: center;
  /* border: solid 1px blue; */
  border-radius: 0.2rem;
  width: 'auto';
  height: 2rem;
  padding: 2rem 0.5rem;
`;
