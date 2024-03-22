import { useStore } from '@nanostores/react';
import React from 'react';
import {
  startSearch,
  searchChange,
  notificationsStore
} from '../notifications.store';
import { SearchInput } from '@/components/SearchInput';
import { SEARCH } from '../notifications.constant';

export function SearchTempo() {
  const { refreshAsked, searchText } = useStore(notificationsStore);

  return (
    <div>
      <SearchInput
        placeholder={SEARCH}
        onChange={searchChange}
        onClick={startSearch}
        value={searchText}
      />
      <p>send request :{refreshAsked ? 'sending' : 'waiting'}</p>
    </div>
  );
}
