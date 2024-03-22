import {
  GridColDef,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useColumns() {
  const { t } = useTranslation();

  return useMemo<GridColDef<GridValidRowModel>[]>(
    () => [
      {
        headerName: t('Id'),
        sortable: true,
        field: 'id',
        renderHeaderFilter: () => null
      },
      {
        headerName: t('Date'),
        sortable: true,
        field: 'date',
        renderHeaderFilter: () => null
      },
      {
        headerName: t('User Name'),
        sortable: true,
        field: 'userName'
      },
      {
        headerName: t('Group Name'),
        sortable: true,
        field: 'groupName'
      },
      {
        headerName: t('Language pair concat'),
        sortable: true,

        valueGetter: ({ row }: { row: GridValidRowModel }) => {
          return `${row.sourceLanguage as string} > ${row.targetLanguage as string}`;
        },
        field: 'langPair',
        renderHeaderFilter: () => null
      },
      {
        headerName: t('source'),
        sortable: true,
        field: 'sourceLanguage'
      },
      {
        headerName: t('target'),
        sortable: true,
        field: 'targetLanguage'
      },
      {
        headerName: t('profile Name'),
        sortable: true,
        field: 'profileName'
      },
      {
        headerName: t('User-agent'),
        sortable: true,
        field: 'userAgent'
      },
      {
        headerName: t('Mime-type'),
        sortable: true,
        field: 'mimeType'
      },
      {
        headerName: t('Characters'),
        sortable: true,
        field: 'numberChar',
        renderHeaderFilter: () => null
      }
    ],
    [t]
  );
}
