import { useCallback } from 'react';

export default function useSelectableRows<Row extends {id: string | number}>(rows: Row[], filter: (row: Row) => boolean) {
  return useCallback(({id}: {id: string | number}) => {
    const unselectableRowIds = new Set<string | number>(rows.filter(filter).map(({id}) => id));
    return !unselectableRowIds.has(id);
  }, [rows]);
}
