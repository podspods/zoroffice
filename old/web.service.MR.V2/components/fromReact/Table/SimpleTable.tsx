import React, { useMemo, useState } from 'react';

import {
  DataGridPro,
  DataGridProProps,
  GridValidRowModel
} from '@mui/x-data-grid-pro';
import styled from '@emotion/styled';
import ChevronIcon from '@systran/react-components/lib/atoms/Icons/ChevronIcon';
import SortIcon from '@systran/react-components/lib/atoms/Icons/SortIcon';
import { useRemoteHooks } from './hooks/useRemoteHooks';
import { Theme } from '@mui/material';

export type Props<R extends GridValidRowModel> = DataGridProProps<R>;

export default function SimpleTable<R extends GridValidRowModel>({
  slots,
  getDetailPanelContent,
  ...props
}: Props<R>) {
  return (
    <Container>
      <DataGridPro
        autoHeight
        slots={{
          columnSortedDescendingIcon: () => <SortIcon direction='down' />,
          columnSortedAscendingIcon: () => <SortIcon direction='up' />,
          columnUnsortedIcon: () => <SortIcon />,
          detailPanelExpandIcon: () => <ChevronIcon direction='right' />,
          detailPanelCollapseIcon: () => <ChevronIcon direction='down' />,
          ...slots
        }}
        getDetailPanelContent={
          !getDetailPanelContent
            ? undefined
            : (params) => {
              const content = getDetailPanelContent(params);
              if (!content) {
                return null;
              }
              return <DetailPanel>{content}</DetailPanel>;
            }
        }
        columnHeaderHeight={props.columnHeaderHeight || 70}
        {...props}
      />
    </Container>
  );
}

export type RowWithId = GridValidRowModel & { id: string | number };

export function useSelectedRows<RowType extends RowWithId>(
  rows: readonly RowType[]
) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const selectedRows = useMemo(() => {
    const selectedRowIdsMap = new Set(selectedRowIds);
    return rows.filter((row) => selectedRowIdsMap.has(row.id));
  }, [rows, selectedRowIds]);
  return [selectedRows, setSelectedRowIds] as const;
}

export { useRemoteHooks };

const Container = styled.div<{ theme?: Theme }>`
  & .MuiDataGrid-root {
    /* background-color: ${({ theme }) => theme.palette.common.white}; */
    font-size: 14px;
    padding: 0px 8px;
    border-radius: 4px;

    .MuiDataGrid-footerContainer div,
    & .MuiDataGrid-footerContainer span,
    & .MuiDataGrid-footerContainer p {
      font-size: 14px;
    }

    .MuiDataGrid-columnHeaders {
      border-bottom: 1px solid ${({ theme }) => theme.palette.offGrey.main};
      height: 64px;
    }

    .MuiDataGrid-columnHeader .MuiFormControl-root {
      width: 100%;
    }

    .MuiDataGrid-columnHeader {
      border: 0px;
    }

    .MuiDataGrid-columnHeader:focus {
      outline: none;
    }

    .MuiDataGrid-columnHeader:focus-within {
      outline: none;
    }

    .MuiDataGrid-row {
      border: 0px;
      min-height: 56px;
    }

    .MuiDataGrid-cell {
      border: 0px;
      border-bottom: 1px solid ${({ theme }) => theme.palette.offGrey.border};
    }

    .MuiDataGrid-row--detailPanelExpanded .MuiDataGrid-cell {
      border-bottom: 0px;
    }

    .MuiDataGrid-cell:focus {
      outline: none;
    }

    .MuiDataGrid-cell:focus-within {
      outline: none;
    }

    .MuiDataGrid-detailPanel {
      background-color: unset;
      border-bottom: 1px solid ${({ theme }) => theme.palette.offGrey.border};
    }

    .MuiDataGrid-detailPanelToggleCell {
      width: 100%;
    }

    .Mui-disabled.MuiDataGrid-detailPanelToggleCell {
      visibility: hidden;
    }
  }
`;

const DetailPanel = styled.div`
  padding: 20px 50px;
  width: auto;
`;
