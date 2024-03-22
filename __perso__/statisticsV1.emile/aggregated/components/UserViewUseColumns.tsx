import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useColumns() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        field: 'profileName',
        label: t(t('Profile Name')),
        hidden: false,
        hideable: true,
        flex: 0.2,
        sortable: true
      },
      {
        field: 'success',
        label: t('Success'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'sourceLang',
        label: t('Source Lang'),
        hidden: true,
        hideable: true,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'targetLang',
        label: t('Target Lang'),
        hidden: true,
        hideable: true,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'langPair',
        label: t('langPair'),
        hidden: false,
        hideable: true,
        flex: 0.1,
        sortable: false
      },
      {
        field: 'mimeType',
        label: t('Mime-type'),
        hidden: false,
        hideable: true,
        flex: 0.2,
        sortable: true
      },
      {
        field: 'request',
        label: t('Request'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'requestSuccess',
        label: t('Success (Request)'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'requestError',
        label: t('Error (Request)'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'requestSuccessPercent',
        label: t('% of Success (Request)'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'segment',
        label: t('Segments'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'segmentInCache',
        label: t('Segments in cache'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'character',
        label: t('Characters'),
        hidden: false,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'characterInCache',
        label: t('Characters in cache'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'tus',
        label: t('TUs'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'tusFail',
        label: t('Failed TUs'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'elapsedTime',
        label: t('Elapsed Time (ms)'),
        hidden: true,
        hideable: true,
        renderHeaderFilter: () => null,
        flex: 0.1,
        sortable: true
      },
      {
        field: 'userAgent',
        label: t('User-Agent'),
        hidden: false,
        hideable: true,
        flex: 0.2,
        sortable: true
      }
    ],
    [t]
  );
}
