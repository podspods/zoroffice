import { SelectChangeEvent, styled } from '@mui/material';
import React from 'react';
import SearchIcon from '@systran/react-components/lib/atoms/Icons/SearchIcon';

export type SearchInputProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
};

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <Search>
      <Icone onClick={props.onClick}>
        <SearchIcon />
      </Icone>
      <StyledInput type='text' onChange={props.onChange} value={props.value} />
      {/* <input type='email' value={email} onChange={setEmail} name='email' /> */}
    </Search>
  );
};

export default SearchInput;

const StyledInput = styled('input')`
  font-size: 1.5rem;
  /* border: solid 1px red; */
  border: none;
  border-bottom: solid 1px black;
  /* width: '12ch'; */
  padding: 0 0.5;
  /* border-color: #eee; */
  /* border: none; */
  /* border-color: transparent; */
  outline: none;
  /* background-color: red; */
  height: 1.5rem;
`;

const Icone = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  /* border: solid 1px red; */
`;

const Search = styled('div')`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* border-bottom: solid 1px black; */
  border: solid 1px blue;
  border-radius: 0.5rem;
  width: '10%';
  height: 2rem;
  padding: 0.2 2rem;
`;
