import {GridColDef} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';
import {sizeToString} from '@systran/react-components/lib/organisms/utils';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import {timeElapsed} from '@/utils/time';
import {useMemo} from 'react';
import {Profile, TableFile} from './UploadedFilesTable';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { actionColumn } from '@/components/Columns';

type Props = {
  profiles: Profile[],
  actions: RowAction<TableFile>[]
}

export default function useColumns({profiles = [], actions = []}: Props): GridColDef<TableFile>[] {
  const {t, i18n: {language}} = useTranslation();

  const columns = useMemo(() => {
    return [
      {
        field: 'filename',
        headerName: t('Filename'),
        flex: 1
      },
      {
        field: 'status',
        headerName: t('Status'),
        flex: 1,
        renderCell: ({row}) => <StatusCell status={row.status} />
      },
      {
        field: 'uploadDate',
        headerName: t('Upload date'),
        flex: 1,
        renderCell: ({row}) => <>{timeElapsed(row.uploadDate || '', language)}</>
      },
      {
        field: 'languages',
        headerName: t('Languages'),
        flex: 1,
        renderCell: ({row}) => (<div><LanguagePairsRender source={row.source} target={row.locale || row.target} /></div>),
        valueGetter: ({row}) => `${row.source}${row.locale ? row.locale : row.target}`
      },
      {
        field: 'profile',
        headerName: t('Profile Selected'),
        flex: 1,
        renderCell: RenderProfileCell(profiles)
      },
      {
        field: 'length',
        headerName: t('Size'),
        valueGetter: ({row}) => sizeToString({number: row.length})
      },
      actionColumn({t, actions})
    ] satisfies GridColDef<TableFile>[];
  }, [profiles, actions]);

  return columns;
}

const RenderProfileCell = (profiles: Profile[]) => {
  return ({row}: {row: TableFile}) => {
    return profiles.find(profile => profile.id === row.profile)?.name;
  };
};

const statusMap = {
  error: ['error', 'Error', undefined],
  translated: ['success', 'Translated', undefined],
  translating: ['info', 'Translating', 'loading'],
  queued: ['default', 'Queued', undefined],
  cancelled: ['default', 'Cancelled', undefined],
  cancelling: ['info', 'Cancelling', 'loading'],
  deleting: ['info', 'Deleting', 'loading'],
  dequeued: ['default', 'Dequeued', undefined],
  default: ['default', 'Queued', undefined]
} as const;

export type Status = 'error' | 'translated' | 'translating' | 'cancelled' | 'cancelling' | 'deleting' | 'default'

export type StatusProps = {
  status?: Status
}

const StatusCell = ({status = 'default'}: StatusProps) => {

  const {t} = useTranslation();

  return (
    <StatusBadge
      status={statusMap[status]?.[0]} // todo remove ?. when all status are known
      endAdornment={statusMap[status]?.[2]}
    >
      {t(statusMap[status]?.[1])}
    </StatusBadge>
  );
};
