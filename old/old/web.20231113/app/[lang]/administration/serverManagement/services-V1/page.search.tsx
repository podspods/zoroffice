'use client';

import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

import PageTitle from '@/components/PageTitle';
import { ERROR, LOADING, PAGE_NAME } from './services.constant';
import { Box } from '@mui/material';
import { useStore } from '@nanostores/react';
import {
  servicesStore,
  loadService,
  mutateAsked,
  setDataReady
} from './services.store';

import useSWR from 'swr';
import { serviceRoute } from './services.type';
import { Modal } from './Modal';
import { ServiceToolbar } from './services.toolbar';
import { ToastedMessage } from './services';
import { ServicesTable } from './services.table';
import { useTranslation } from 'react-i18next';
import { SearchBar } from './components/SearchBar';
import Data from './data/MOCK_DATA.json';
export default function AdministrationServerManagementServices() {
  const [query, setQuery] = useState('');

  const dataFilter = Data.filter((post) => {
    if (query === '') {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
    return null;
  });
  console.log(' dataFilter ==>', dataFilter);

  return (
    <React.Fragment>
      <Box style={{ width: '100%' }}>
        <input
          placeholder='Enter Post Title'
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>{query}</div>
        {dataFilter.map((post) => (
          <div className='box' key={`${post.title} ${post.author}`}>
            <p>{post.title}</p>
            <p>{post.author}</p>
          </div>
        ))}
      </Box>
    </React.Fragment>
  );
}
