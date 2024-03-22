import {useMemo} from 'react';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {Feedback} from './FeedbackType';
import {useTranslation} from 'react-i18next';
import {getCreatorLink, getDate as dateFormat, getSelectedLabel, getSourceTargetFromLp, languageRender} from './utils';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import CustomCell from '@/components/CustomCell';
import { actionColumn } from '@/components/Columns';

function formatId(id: string) {
  return (
    <CustomCell>
      <LinkInternal href={`/monitoring/translationReviews/${id}`}>{id}</LinkInternal>;
    </CustomCell>
  )
}

function formatValue(data: string) {
  return (
    <CustomCell>
      <span title={data}>{data}</span>
    </CustomCell>
  )
}

function formatterLanguagePair(languagePair: string) {
  const {t} = useTranslation();
  const result = getSourceTargetFromLp(languagePair);
  if (result) {
    const { source, target } = result;
    return languageRender(source, target, true) as any;
  }
  return t('Invalid language pair');
}

export default function useColumns(actions: RowAction<Feedback>[], hasAdminUserPermission: boolean) {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      {
        field: '_id',
        headerName: t('ID'),
        flex: 1.5,
        headerAlign: 'center',
        renderCell: ({ row }: { row: Feedback }) => formatId(row?._id)
      },
      {
        field: 'status',
        headerName: t('Status'),
        flex: 1,
        renderCell: ({ row }: { row: Feedback }) => <CustomCell>{getSelectedLabel(row?.status, 'status')}</CustomCell>
      },
      {
        field: 'problemSeverity',
        headerName: t('Problem Severity'),
        flex: 1,
        renderCell: ({ row }: { row: Feedback }) =>
          <CustomCell>{getSelectedLabel(row?.problemSeverity, 'problemSeverity')}</CustomCell>
      },
      {
        field: 'languagePair',
        headerName: t('Language Pair'),
        flex: 1.3,
        renderCell: ({ row }: { row: Feedback }) => (
          <CustomCell>{formatterLanguagePair(row.sourceLanguage + row.targetLanguage).label}</CustomCell>)
      },
      {
        field: 'displayName',
        headerName: t('Profile'),
        flex: 1,
        renderCell: ({ row }: { row: Feedback }) => formatValue(row?.displayName)
      },
      {
        field: 'source',
        headerName: t('Source'),
        flex: 1.5,
        renderCell: ({ row }: { row: Feedback }) => formatValue(row?.source)
      },
      {
        field: 'target',
        headerName: t('Target'),
        flex: 1.5,
        renderCell: ({ row }: { row: Feedback }) => formatValue(row?.target)
      },
      {
        field: 'accountName',
        headerName: t('Submitter'),
        flex: 1,
        renderCell: ({ row }: { row: Feedback }) => (
          <CustomCell>
            {getCreatorLink({creatorName: row?.accountName, accountId: row?.accountId, isAdmin: hasAdminUserPermission})}
          </CustomCell>
        )
      },
      {
        field: 'reviewer',
        headerName: t('Reviewer'),
        flex: 1,
        renderCell: ({ row }: { row: Feedback }) => formatValue(row?.reviewer)
      },
      {
        field: 'suggestedTranslation',
        headerName: t('Suggested Translation'),
        flex: 1.5,
        renderCell: ({ row }) => formatValue(row?.suggestedTranslation)
      },
      {
        field: 'translationRating',
        headerName: t('Translation Rating'),
        flex: 1,
        renderCell: ({ row }) =>
          <CustomCell>{getSelectedLabel(row?.translationRating, 'translationRating')}</CustomCell>
      },
      {
        field: 'insertedAt',
        headerName: t('Added'),
        flex: 1,
        renderCell: ({ row }) => <CustomCell>{dateFormat(row?.insertedAt)}</CustomCell>
      },
      {
        field: 'updatedAt',
        headerName: t('Updated At'),
        flex: 1,
        renderCell: ({ row }) => <CustomCell>{dateFormat(row?.updatedAt)}</CustomCell>
      },
      actionColumn({t, actions})
    ] satisfies GridColDef<Feedback>[];
  }, [t, actions]);
}
