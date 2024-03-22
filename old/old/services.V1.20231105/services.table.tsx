import SimpleTable from '@systran/react-components/lib/organisms/table/SimpleTable';
import React from 'react';
import { columnList } from './services.column';
import { useStore } from '@nanostores/react';
import { servicesStore, setCheckedList } from './services.store';
import { deregisterableList } from './services.type';
import { Expand } from './expand';
export function ServicesTable() {
  const { serviceRegisteredList } = useStore(servicesStore);
  return (
    <React.Fragment>
      <SimpleTable
        columns={columnList}
        rows={serviceRegisteredList}
        pagination
        showCellVerticalBorder
        showColumnVerticalBorder
        checkboxSelection
        onRowSelectionModelChange={setCheckedList}
        getDetailPanelContent={Expand}
        isRowSelectable={(params) =>
          deregisterableList.includes(params.row.name)
        }
      />
    </React.Fragment>
  );
}
