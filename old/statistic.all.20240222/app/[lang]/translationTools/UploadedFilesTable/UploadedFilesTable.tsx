import useSWR from 'swr';

import Table, {GridRowParams} from '@systran/react-components/lib/organisms/Table/Table';
import {uniqueId} from 'lodash';
import UploadedFilesToolbar, {Props as ToolbarProps} from './Toolbar';

import useColumns, {Status} from './useColumns';
import {useMemo, useState} from 'react';
import useModals from '../file/useModals';
import type useActionsType from '../speech/useActions';
import {Grow} from '@mui/material';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import Apis from '@/utils/apis';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';

type SystranError = {
  msg: string
  error: string,
  detail: null | string
}

export type FetchedFile = {
  filename: string,
  length: number,
  uploadDate?: string,
  uploadDateRenamed?: string,
  metadata: {
    status: Status | SystranError,
    source: string,
    target: string,
    selectors: {
      profileId?: string,
      owner?: string,
      domain?: string,
      size?: string
    },
    detectedSelectors?: {
      detectedProfileId: string,
      detectedOwner: string,
      detectedDomain: string,
      detectedSize: string
    },
    modelOptions: {[key: string]: unknown} & {locale?: string}
  },
  _id: string
}

export type TableFile = {
  id: string,
  key: string,
  filename: string,
  length: number,
  status?: Status,
  uploadDate?: string,
  profile?: string,
  owner?: string,
  domain?: string,
  size?: string
  source: string,
  target: string,
  locale?: string,
  error?: {type: string, message: string}
}

export type Profile = {
  id: string,
  name: string,
  selectors: {owner: string, domain: string, size: string}
}

export type UploadedFilesTableProps = {
  mode: 'file' | 'speech'
  useActions: typeof useActionsType,
}

const endpoints = {
  file: Apis.fileTranslation.files,
  speech: Apis.speechTranslation.files
}

export default function UploadedFilesTable({useActions, mode}: UploadedFilesTableProps) {

  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const {data: filesData, mutate: mutateFiles, isLoading, isValidating} = useSWR<{files: FetchedFile[]}>(
    endpoints[mode],
    null,
    {refreshInterval: refreshInterval === 'Never' ? 0 : refreshInterval * 1000}
  );
  const {data: profilesData, mutate: mutateProfiles} = useSWR<{profiles: Profile[]}>(
    Apis.fileTranslation.profiles,
    null,
    {refreshInterval: refreshInterval === 'Never' ? 0 : refreshInterval * 1000}
  );
  const [modal, setOpenedModal] = useModals();
  const actions = useActions(setOpenedModal);

  const files = filesData?.files || [];
  const profiles = profilesData?.profiles || [];

  const columns = useColumns({profiles, actions});

  const formattedFiles = useMemo(() => {
    return formatFiles(files);
  }, [files]) satisfies TableFile[];

  const mutate = async () => {
    mutateFiles();
    mutateProfiles();
  };

  const toolbarProps = {
    actions,
    mutate,
    refreshInterval,
    setRefreshInterval,
    isLoading,
    isValidating
  } satisfies ToolbarProps;

  return (
    <>
      {modal}
      <Table
        columns={columns as any}
        rows={formattedFiles}
        checkboxSelection
        disableColumnMenu
        slots={{toolbar: UploadedFilesToolbar}}
        slotProps={{toolbar: toolbarProps}}
        getDetailPanelContent={getDetailPanelContent as any}
        getDetailPanelHeight={() => 'auto'}
      />
    </>
  );
}

const getDetailPanelContent = ({row: {status, error}}: GridRowParams<TableFile>) => {
  if (status === 'error') {
    return (
      <Grow in timeout={500}>
        <div style={{width: 'fit-content'}}>
          <ErrorCard errorMessage={error?.message} />
        </div>
      </Grow>
    );
  }
  return undefined;
};

const formatFiles = (files: FetchedFile[]): TableFile[] => {
  return files.map(file => {

    const [status, error] = file.metadata.status instanceof Object
      ? ['error' as const, {type: file.metadata.status.msg, message: file.metadata.status.error}]
      : [file.metadata.status, undefined];

    return {
      id: file._id,
      key: uniqueId(),
      filename: file.filename,
      length: file.length,
      status,
      error,
      uploadDate: file.uploadDate || file.uploadDateRenamed,
      profile: file.metadata.selectors.profileId || file.metadata.detectedSelectors?.detectedProfileId,
      owner: file.metadata.selectors.owner || file.metadata.detectedSelectors?.detectedOwner,
      domain: file.metadata.selectors.domain || file.metadata.detectedSelectors?.detectedDomain,
      size: file.metadata.selectors.size || file.metadata.detectedSelectors?.detectedSize,
      source: file.metadata.source || '',
      target: file.metadata.target || '',
      locale: file.metadata.modelOptions.locale
    };
  });
};
