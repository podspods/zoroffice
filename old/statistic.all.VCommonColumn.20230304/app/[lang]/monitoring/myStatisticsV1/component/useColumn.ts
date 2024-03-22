import { Column } from 'app/[lang]/administration/statistics/components/statisticsType';

export const MyStatColumn: Column[] = [
  {
    field: 'name',
    label: 'Profile Name',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'success',
    label: 'success',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'langPair',
    label: 'Language pair',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'sourceLang',
    label: 'Source Lang',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: false  // sort par langpair
  },
  {
    field: 'targetLang',
    label: 'Target Lang',
    hidden: true,
    hideable: true,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'mimeType',
    label: 'Mime-type',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  },
  {
    field: 'request',
    label: 'Request',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestError',
    label: 'Error (Request)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'requestSuccessPercent',
    label: '% of Success (Request)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: false
  },
  {
    field: 'character',
    label: 'Characters',
    hidden: false,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'tus',
    label: 'TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'tusFail',
    label: 'Failed TUs',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'elapsedTime',
    label: 'Elapsed Time (ms)',
    hidden: true,
    hideable: true,
    renderHeaderFilter: () => null,
    flex: 0.1,
    sortable: true
  },
  {
    field: 'userAgent',
    label: 'User-Agent',
    hidden: false,
    hideable: true,
    flex: 0.2,
    sortable: true
  }
];

