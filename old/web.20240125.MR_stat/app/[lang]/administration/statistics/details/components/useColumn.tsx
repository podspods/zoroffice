import {
  GridColDef,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fullViewDataField } from '../../components/statisticsUtils';

export default function useColumns() {
  const { t } = useTranslation();
  const CcolumnList: GridColDef<GridValidRowModel>[] = fullViewDataField.map(
    (column) => {
      const result = {
        headerName: t(column.label),
        sortable: column.sortable,
        field: column.field,
        // renderHeaderFilter: column.renderHeaderFilter || undefined,
        valueGetter: column.valueGetter || undefined
      };

      return result;
    }
  );

  return useMemo<GridColDef<GridValidRowModel>[]>(() => CcolumnList, [t]);
}
