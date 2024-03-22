import { GridFilterModel, GridSortModel, GridPaginationModel } from '@mui/x-data-grid-pro';
import { useState, useCallback, useEffect } from 'react';

export type QueryOptions = {filterModel?: GridFilterModel, sortModel?: GridSortModel}
export type useRefreshProps = {paginationModel: GridPaginationModel, queryOptions: QueryOptions}

export type RemoteHooksProps<Row> = {
  useRefresh: (query: useRefreshProps) => { isLoading: boolean, rows: Row[], pageInfo?: {totalRowCount: number}}
}

export function useRemoteHooks<Row>(props: RemoteHooksProps<Row>) {
  const {useRefresh} = props;
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });

  const { isLoading, rows, pageInfo } = useRefresh({paginationModel, queryOptions}); // on refresh hook

  const [rowCountState, setRowCountState] = useState(
    pageInfo?.totalRowCount || 0
  );

  const onFilterModelChange = (filterModel: GridFilterModel) => {
    const newFilterModel = {...filterModel};
    if (filterModel?.items?.length) {
      newFilterModel.items = filterModel.items.filter((item) => item.value !== undefined); // Because initial data when click on filter button is always undefined
    }
    setQueryOptions({filterModel: {...newFilterModel}, sortModel: queryOptions.sortModel});
    setPaginationModel((prev) => ({...prev, page: 0}));
  };

  const onSortModelChange = (sortModel: GridSortModel) => {
    setQueryOptions({sortModel: [...sortModel], filterModel: queryOptions.filterModel});
    setPaginationModel((prev) => ({...prev, page: 0}));
  };

  const onPaginationModelChange = useCallback((model: GridPaginationModel) => {
    setPaginationModel(model);
  }, []);

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  },
  [pageInfo?.totalRowCount, setRowCountState]);

  return {
    sortingMode: 'server', filterMode: 'server', paginationMode: 'server',
    onPaginationModelChange, onSortModelChange, onFilterModelChange,
    loading: isLoading, rows, rowCount: rowCountState, paginationModel
  };
}
