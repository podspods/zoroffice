import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useColumns() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('User Name'),
        sortable: true,
        field: 'userName',
        minWidth: 200
      },
      {
        headerName: t('Group Name'),
        sortable: true,
        field: 'groupName',
        minWidth: 200
      },
      {
        headerName: t('Language pair'),
        sortable: true,
        field: 'languagePair',
        minWidth: 200
      },
      {
        headerName: t('Profile Name'),
        sortable: true,
        field: 'profileName',
        minWidth: 300
      },
      {
        headerName: t('User-agent'),
        sortable: true,
        field: 'userAgent',
        minWidth: 200
      },
      {
        headerName: t('Mime-type'),
        sortable: true,
        field: 'mimeType',
        minWidth: 200
      },
      {
        headerName: t('Characters'),
        sortable: true,
        field: 'numberChar',
        minWidth: 200
      }
    ],
    [t]
  );
}
