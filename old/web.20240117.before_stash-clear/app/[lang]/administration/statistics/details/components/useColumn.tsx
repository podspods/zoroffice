import { GridColDef } from '@systran/react-components/lib/organisms/Table/Table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DetailStat } from './statType';

export default function useColumns() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('Id'),
        sortable: true,
        field: 'id'
      },
      {
        headerName: t('Date'),
        sortable: true,
        field: 'date'
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

        valueGetter: ({ row }: { row: DetailStat }) => {
          return `${row.sourceLang} > ${row.sourceLang}`;
        }
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
        field: 'numberChar'
      }
    ],
    [t]
  );
}
