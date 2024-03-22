import { useMemo, useState } from 'react';

export default function useSelectedRows<Row extends {id: string | number}>(rows: readonly Row[]) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const selectedRows = useMemo(() => {
    const selectedRowIdsMap = new Set(selectedRowIds);
    return rows.filter((row) => selectedRowIdsMap.has(row.id));
  }, [rows, selectedRowIds]);
  return [selectedRows, setSelectedRowIds] as const;
}
