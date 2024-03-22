import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Corpus } from './Corpus';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { actionColumn, sharingStatusColumn } from '@/components/Columns';
import { GridColDef } from '@systran/react-components/lib/organisms/Table/Table';

export function useColumns(actions: RowAction<Corpus>[], type: 'UD' | 'NORM') {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      sharingStatusColumn({t}),
      {
        field: 'name',
        type: 'string',
        headerName: t('Filename'),
        flex: 100
      },
      {
        field: 'srcLang',
        valueGetter: ({row}) => (`${row.srcLang} ${row.tgtLangs.join(' ')}`),
        type: 'string',
        headerName: t((type === 'UD') ? 'Language Pair' : 'Language'),
        flex: 50,
        renderCell: ({row}) => <div>{row.srcLang && <LanguagePairsRender source={row.srcLang} target={(type === 'UD') ? row.tgtLangs : undefined} />}</div>
      },
      {
        field: 'nbEntries',
        type: 'number',
        headerName: t('Size'),
        flex: 20,
        renderCell: ({row}) => (row.nbEntries ?? '')
      },
      {
        field: 'comments',
        type: 'string',
        flex: 110,
        headerName: t('Comments')
      },
      actionColumn({t, actions})
    ] satisfies GridColDef<Corpus>[];
  }, [t, actions, type]);
}
