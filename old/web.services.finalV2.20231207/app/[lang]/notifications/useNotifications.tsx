'use client';

import { RefreshRate } from '@/components/fromReact/Table/hooks/useRemoteHooks';
import React, { createContext, useContext, useState } from 'react';
import { Notifications } from './NotificationsTypes';

export function useNotifications() {
  const {
    refreshAsked,
    refreshRate,
    isLoading,
    selectedRows,
    setRefreshAsked,
    resetRefreshAsked,
    updateRefreshRate,
    updateSelectedRows,
    updateIsLoading
  } = useContext(NotificationsContext);
  return {
    refreshAsked,
    refreshRate,
    selectedRows,
    isLoading,
    isRowsSelected: selectedRows.length !== 0,
    setRefreshAsked,
    resetRefreshAsked,
    updateRefreshRate,
    updateSelectedRows,
    updateIsLoading
  };
}

type NotificationsContextProp = {
  refreshAsked: boolean;
  isLoading: boolean;
  refreshRate: RefreshRate;
  selectedRows: Notifications[];
  setRefreshAsked: () => void;
  resetRefreshAsked: () => void;
  updateRefreshRate: (value: RefreshRate) => void;
  updateSelectedRows: (value: Notifications[]) => void;
  updateIsLoading: (value: boolean) => void;
};

const NotificationsContextInit: NotificationsContextProp = {
  refreshAsked: false,
  isLoading: false,
  refreshRate: 'Never',
  selectedRows: [],
  setRefreshAsked: () => {},
  resetRefreshAsked: () => {},
  updateRefreshRate: (value: RefreshRate) => {},
  updateSelectedRows: (idList: Notifications[]) => {},
  updateIsLoading: (value: boolean) => {}
};

const NotificationsContext = createContext(NotificationsContextInit);

export function NotificationsContextProvider({ children }) {
  const [refreshAsked, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('Never');
  const [selectedRows, setSelectedRows] = useState<Notifications[]>([]);

  function setRefreshAsked() {
    setRefresh(true);
  }
  function updateIsLoading(value: boolean) {
    setIsLoading(value);
  }
  function resetRefreshAsked() {
    setRefresh(false);
  }

  function updateRefreshRate(value: RefreshRate) {
    setRefreshRate(value);
  }

  function updateSelectedRows(value: Notifications[]) {
    setSelectedRows(value);
  }

  return (
    <NotificationsContext.Provider
      value={{
        refreshAsked,
        refreshRate,
        selectedRows,
        isLoading,
        setRefreshAsked,
        resetRefreshAsked,
        updateRefreshRate,
        updateSelectedRows,
        updateIsLoading
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
