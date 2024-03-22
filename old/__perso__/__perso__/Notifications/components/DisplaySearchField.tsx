import React from 'react';
import SearchField from '@/components/SearchField';
import { SEARCH } from '@/components/Notifications/constant';
import { searchChange, startSearch } from '@/components/Notifications/store';
export type DisplaySearchFieldProps = {
  searchText: string,
};

export default function DisplaySearchField({ ...props }: DisplaySearchFieldProps) {
  return (
    <SearchField
      placeholder={SEARCH}
      onChange={searchChange}
      onClick={startSearch}
      value={props.searchText}
    />
  );
}
