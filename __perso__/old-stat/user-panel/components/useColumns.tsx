import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useColumns() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('profile Name'),
        sortable: true,
        field: 'profileName'
      },
      {
        headerName: t('Language pair'),
        sortable: true,
        field: 'languagePair'
      },
      {
        headerName: t('request'),
        sortable: true,
        field: 'request'
      },
      {
        headerName: t('success'),
        sortable: true,
        field: 'success'
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

