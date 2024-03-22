import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';

import SimpleTable, {Props as SimpleTableProps, useSelectedRows, type RowWithId} from '@systran/react-components/lib/organisms/Table/SimpleTable';
import React from 'react';
import { columnList } from './notifications.column';
import { useTranslation } from 'react-i18next';

export type Props<Row extends RowWithId> = SimpleTableProps<Row> & {
  rowActions: RowAction<Row>[],
}

export default function NotificationsTable<Row extends RowWithId>(props: Props<Row>) {
  const {rows} = props;
  const [setSelectedRowIds] = useSelectedRows(rows);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <SimpleTable
        columns={columnList.map((oneColumn) => ({
          ...oneColumn,
          headerName: t(oneColumn.headerName)
        }))}
        pagination
        onRowSelectionModelChange={setSelectedRowIds}
        checkboxSelection
        {...props}
      />
    </React.Fragment>
  );
}
