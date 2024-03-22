'use client';

import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { Parser } from 'html-to-react';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Box, Toolbar, Typography } from '@mui/material';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';

import SimpleTable, {
  useRemoteHooks,
  useSelectedRows
} from '@systran/react-components/lib/organisms/Table/SimpleTable';

import useRefreshBuilder from '@systran/react-components/lib/organisms/Table//hooks/useRefresh';

import PageTitle from '@/components/PageTitle';
import { commonFetch } from '@/utils/fetcher';
import { RefreshRate } from '@/components/fromReact/Table/hooks/useRemoteHooks';
const Container = styled.div`
  padding: 2em;
  width: 100%;
  height: fit-content;
`;

function useColumns(actions: RowAction<Notifications>[]) {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        field: 'level',
        headerName: 'level',
        align: 'center',
        headerAlign: 'center',
        minWidth: 150,
        renderCell: ({ row }: GridRenderCellParams) => (
          <StatusBadge title={row.level} status={row.level}>
            {t(row.level)}
          </StatusBadge>
        )
      },
      {
        field: 'read',
        headerName: 'read',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => {
          const { t } = useTranslation();
          return row.read ? t('read') : t('unread');
        }
      },
      {
        field: 'str',
        headerName: 'notification',
        align: 'left',
        headerAlign: 'center',
        minWidth: 500,
        // renderHeader: () => DisplaySearchField({ searchText: searchText }),
        renderCell: ({ row }: GridRenderCellParams) => {
          const parser = Parser();
          return row.str && parser.parse(convertMessage(row.str));
        }
      },
      {
        field: 'insertedAt',
        headerName: 'insertedAt',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) =>
          durationFromNow(row.insertedAt),
        sortable: true
      },
      {
        field: 'elipsis',
        headerName: '',
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        renderCell: ({ row }: GridRenderCellParams) => (
          <RowActionMenu actions={actions} selectedRow={row} />
        ),
        sortable: true
      }
    ],
    []
  );
}
const actions: RowAction<Notifications>[] = [
  {
    label: 'Mark as read',
    icon: <PlusIcon />,
    onClick: (params) => void markAsRead(params)
  },
  {
    label: 'Mark as unread',
    icon: <PlusIcon />,
    onClick: (params) => void markAsUnRead(params)
  }
];

type Notifications = {
  id: string;
  insertedAt: string;
  level: string;
  str?: {
    display: string;
    data: {
      [key: string]:
        | { type: string; value: string | number; label?: string }
        | undefined;
      filename?: { type: string; value: string | number; label?: string };
      type?: { type: string; value: string | number; label?: string };
      id?: { type: string; value: string | number; label?: string };
      upgradeId?: { type: string; value: string | number; label?: string };
      err?: { type: string; value: string | number; label?: string };
      hostname?: { type: string; value: string | number; label?: string };
      tr?: { type: string; value: string | number; label?: string };
      n?: { type: string; value: string | number; label?: string };
      nb?: { type: string; value: string | number; label?: string };
      sn?: { type: string; value: string | number; label?: string };
      p?: { type: string; value: string | number; label?: string };
      url?: { type: string; value: string | number; label?: string };
    };
    v: number;
  };
  read: boolean;
  pushed?: boolean;
};

const typeRoute: TypeRoute[] = [
  { tag: 'profiler', value: '/profilesManagement/' },
  { tag: 'tm', value: '/resourcesManagement/translationMemory/' },
  { tag: 'tr', value: '/advancedConfiguration/translationResources/' },
  { tag: 'node', value: '/advancedConfiguration/computingNode/' },
  { tag: 'nodeView', value: '/advancedConfiguration/computingNode/view/' },
  { tag: 'fileTranslation', value: '/translationTools/file/' }
];

export type TypeRoute = {
  tag: string;
  value: string;
};

function markAsRead(rowList: Notifications[]) {
  rowList.map((oneRow: Notifications) =>
    setNotificationStatus(oneRow.id, true)
  );
}

function markAsUnRead(rowList: Notifications[]) {
  rowList.map((oneRow: Notifications) =>
    setNotificationStatus(oneRow.id, false)
  );
}

async function markAllAsRead() {
  const options = {
    method: 'POST'
  };
  const status = await commonFetch('/node/notification/read/all', options);
  return status;
}

async function setNotificationStatus(id: string, read: boolean) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api =
    (read ? '/node/notification/read' : '/node/notification/unread') + '/' + id;
  const status = await commonFetch(api, options);
  return status;
}

const CustomSimpleTable = styled(SimpleTable)`
  & .MuiDataGrid-columnHeader .MuiFormControl-root {
    width: 100%;
  }
`;

function getTag(inputstring: string): string[] {
  const extractRule = new RegExp(/[$]{([^\s>]+)}/, 'g');
  const tagList: string[] = [];
  let endOfString = false;

  while (!endOfString) {
    const tag = extractRule.exec(inputstring);
    if (tag) tagList.push(tag[1].toString());
    else endOfString = true;
  }
  return tagList;
}

function convertMessage(str: {
  display: string;
  data: {
    [key: string]:
      | { type: string; value: string | number; label?: string }
      | undefined;
    filename?: { type: string; value: string | number; label?: string };
    type?: { type: string; value: string | number; label?: string };
    id?: { type: string; value: string | number; label?: string };
    upgradeId?: { type: string; value: string | number; label?: string };
    err?: { type: string; value: string | number; label?: string };
    hostname?: { type: string; value: string | number; label?: string };
    tr?: { type: string; value: string | number; label?: string };
    n?: { type: string; value: string | number; label?: string };
    nb?: { type: string; value: string | number; label?: string };
    sn?: { type: string; value: string | number; label?: string };
    p?: { type: string; value: string | number; label?: string };
    url?: { type: string; value: string | number; label?: string };
  };
  v: number;
}): string {
  if (!str) return '';
  const tagList = getTag(str.display);

  let stringReturn: string = str.display;
  for (const tag of tagList) {
    const dataTag = str.data[tag];
    let linkValue = '';
    if (dataTag) {
      linkValue = dataTag.value.toString();
      const route = typeRoute.find((route) => route.tag === dataTag.type);
      if (route) {
        const hyperLink = `${route.value}${linkValue}`;
        linkValue = `<a href=${hyperLink}>${
          dataTag.label ? dataTag.label : ''
        }</a>`;
      }
    }
    stringReturn = stringReturn.replace(
      `$\{${tag}}`,
      `${'&#20;'}${linkValue}${'&#20;'}`
    );
  }
  return stringReturn;
}

function durationFromNow(dateString: string): string {
  const myMoment = moment(dateString);
  return myMoment.isValid() ? myMoment.fromNow().toString() : '';
}

export default function MonitoringNotificationsReviews() {
  const { t } = useTranslation();
  const useRefresh = useRefreshBuilder<Notifications>({
    route: '/node/notifications/list',
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      }
    },

    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'notifications',
      totalRowCountField: 'total'
    }
  });

  const [mutateAsked, setMutateAsked] = useState(true);
  const remoteHooksData = useRemoteHooks<Notifications>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const { mutate, loading, refreshRate, setRefreshRate } = remoteHooksData;
  const [selectedRows, setSelectedRowIds] = useSelectedRows(
    remoteHooksData.rows
  );

  const columns = useColumns(actions);

  if (mutateAsked) {
    setMutateAsked(false);
    mutate();
  }

  return (
    <>
      <Container style={{ height: 400, width: '100%' }}>
        <Box>
          <PageTitle>{t('Notifications')}</PageTitle>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-flex' }}>
              {selectedRows && selectedRows.length > 0 ? (
                <RowActionToolbar
                  actions={actions}
                  selectedRows={selectedRows}
                />
              ) : (
                <Typography>
                  {t(
                    'Select a row or click on the ellipses to view single and multi row actions'
                  )}
                </Typography>
              )}
            </div>
            <div style={{ display: 'inline-flex' }}>
              <RefreshRateButton
                isLoading={loading}
                onRefresh={mutate}
                refreshRate={refreshRate}
                onRefreshChange={setRefreshRate}
              />
              <RowActionButton
                icon={<PlusIcon />}
                label={'Mark all as read'}
                onClick={() => {
                  markAllAsRead();
                  mutate();
                }}
              />
            </div>
          </Toolbar>
          <CustomSimpleTable
            {...remoteHooksData}
            columns={columns}
            onRowSelectionModelChange={setSelectedRowIds}
            checkboxSelection
            pagination
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0
                }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
            disableColumnSelector
          />
        </Box>
      </Container>
    </>
  );
}

