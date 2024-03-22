import { useMemo, useState } from 'react';

export function useSelectedRows<Service extends {id?: string | number}>(rows: readonly Service[]) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const selectedRows = useMemo(() => {
    const selectedRowIdsMap = new Set(selectedRowIds);
    return rows.filter((row) => row.id && selectedRowIdsMap.has(row.id));
  }, [rows, selectedRowIds]);
  return [selectedRows, setSelectedRowIds] as const;
}
