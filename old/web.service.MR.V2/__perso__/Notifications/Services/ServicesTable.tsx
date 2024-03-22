import React from 'react';
import SimpleTable from '@systran/react-components/lib/organisms/Table/SimpleTable';
import { useTranslation } from 'react-i18next';

import { columnList } from '@/components/Services/column';
import { setCheckedList } from '@/components/Services/store';
import { Service, deregisterableList } from '@/components/Services/type';
import Expand from '@/components/Services/Expand';

export type ServicesTableProps = {
  row: Service[];
};

export default function ServicesTable({ ...props }: ServicesTableProps) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <SimpleTable
        columns={columnList.map((oneColumn) => ({
          ...oneColumn,
          headerName: oneColumn.headerName ? t(oneColumn.headerName) : ''
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
