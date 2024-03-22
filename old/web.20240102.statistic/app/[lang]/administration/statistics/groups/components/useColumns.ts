import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useColumnsGroups() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      // {
      //   headerName: t('id'),
      //   field: 'id'
      // },
      {
        headerName: t('isCounted'),
        field: 'isCounted',
        type: 'boolean'
      },
      {
        headerName: t('groupName'),
        field: 'groupName',
        width: 300
      },
      {
        headerName: t('nbChar'),
        field: 'nbCharacters',
        width: 150
      },
      {
        headerName: t('nbRequest'),
        field: 'request',
        width: 150
      }
    ],
    []
  );
}

export function useColumnsGlobal() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('id'),
        field: 'id'
      },
      {
        headerName: t('isCounted'),
        field: 'isCounted'
      },
      {
        headerName: t('groupName'),
        field: 'groupName'
      },
      {
        headerName: t('nbCacheHits'),
        field: 'nbCacheHits'
      },
      {
        headerName: t('nbCharacters'),
        field: 'nbCharacters'
      },
      {
        headerName: t('nbCharactersCacheHits'),
        field: 'nbCharactersCacheHits'
      },
      {
        headerName: t('nbSegments'),
        field: 'nbSegments'
      },
      {
        headerName: t('nbCacheHits'),
        field: 'request'
      },
      {
        headerName: t('nbTokens'),
        field: 'nbTokens'
      },
      {
        headerName: t('nbTus'),
        field: 'nbTus'
      },
      {
        headerName: t('nbTusFailed'),
        field: 'nbTusFailed'
      },
      {
        headerName: t('request'),
        field: 'request'
      },
      {
        headerName: t('success'),
        field: 'success'
      }
    ],
    []
  );
}
