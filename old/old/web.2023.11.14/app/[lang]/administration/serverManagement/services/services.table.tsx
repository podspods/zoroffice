import SimpleTable from '@systran/react-components/lib/organisms/table/SimpleTable';
import React from 'react';
import { columnList } from './services.column';
import { setCheckedList } from './services.store';
import { Service, deregisterableList } from './services.type';
import { Expand } from './expand';
import { useTranslation } from 'react-i18next';

export type ServicesTableProps = {
  row: Service[];
};

export function ServicesTable({ ...props }: ServicesTableProps) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <SimpleTable
        columns={columnList.map((oneColumn) => ({
          ...oneColumn,
          headerName: t(oneColumn.headerName)
        }))}
        rows={props.row}
        pagination
        showCellVerticalBorder
        showColumnVerticalBorder
        checkboxSelection
        onRowSelectionModelChange={setCheckedList}
        getDetailPanelContent={Expand}
        getDetailPanelHeight={() => 'auto'}
        isRowSelectable={(params) =>
          deregisterableList.includes(params.row.name)
        }
      />
    </React.Fragment>
  );
}
