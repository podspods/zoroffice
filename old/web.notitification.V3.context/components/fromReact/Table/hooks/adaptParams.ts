import {useRefreshProps, QueryOptions} from '../hooks/useRemoteHooks';
import { useMemo } from 'react';


function buildAdaptPaginationParams({limit, skip}: PaginationParamsFields): AdaptPaginationFunctionParams {
  return function adaptPaginationParams(paginationModel: useRefreshProps['paginationModel']) {
    return {[limit]: paginationModel.pageSize, [skip]: paginationModel.page * paginationModel.pageSize};
  };
}

function buildAdaptSortParams({sortName, sortOrder}: SortParamsFields): AdaptQueryOptionsFunctionParams {
  return function adaptSortParams(queryOptions: QueryOptions) {
    if (!queryOptions.sortModel?.[0]) {
      return {};
    }
    const {field, sort} = queryOptions.sortModel?.[0] || {};
    return {[sortName]: field, [sortOrder]: sort};
  };
}

function buildAdaptFilterParams(filterParamsFieldFct: FilterParamsFieldFct): AdaptQueryOptionsFunctionParams {
  return function adaptFilterParams(queryOptions: QueryOptions) {
    const query: {[key: string]: unknown} = {};
    queryOptions.filterModel?.items.forEach(({field, value}) => {
      query[filterParamsFieldFct(field)] = value;
    });
    return query;
  };
}

type AdaptPaginationFunctionParams = ((model: useRefreshProps['paginationModel']) => {[x: string]: any});
type AdaptQueryOptionsFunctionParams = ((queryOptions: QueryOptions) => {[x: string]: any});

type buildAdaptParamsOpts = {adaptPaginationParams: AdaptPaginationFunctionParams, adaptSortParams: AdaptQueryOptionsFunctionParams, adaptFilterParams: AdaptQueryOptionsFunctionParams};

function buildAdaptParams({adaptPaginationParams, adaptSortParams, adaptFilterParams}: buildAdaptParamsOpts) {
  return function adaptParams({paginationModel, queryOptions}: useRefreshProps): string {
    return new URLSearchParams([
      ...Object.entries(adaptPaginationParams(paginationModel)),
      ...Object.entries(adaptSortParams(queryOptions)),
      ...Object.entries(adaptFilterParams(queryOptions))
    ]).toString();
  };
}

type PaginationParamsFields = {limit: string, skip: string};
type SortParamsFields = {sortName: string, sortOrder: string};
type FilterParamsFieldFct = (field: string) => string;

export type adaptParamsBuilderOpts = {
  paginationParamsFields?: PaginationParamsFields,
  sortParamsField?: SortParamsFields,
  filterParamsFieldFct?: FilterParamsFieldFct
}

export default function adaptParamsBuilder(builderOpts?: adaptParamsBuilderOpts) {
  const {
    paginationParamsFields = {limit: 'limit', skip: 'skip'},
    sortParamsField = {sortName: 'sortName', sortOrder: 'sortOrder'},
    filterParamsFieldFct = (field: string) => `eleFilters[${field}][]`
  } = builderOpts || {};

  const adaptPaginationParams = useMemo(() => buildAdaptPaginationParams(paginationParamsFields), [paginationParamsFields]);
  const adaptSortParams = useMemo(() => buildAdaptSortParams(sortParamsField), [sortParamsField]);
  const adaptFilterParams = useMemo(() => buildAdaptFilterParams(filterParamsFieldFct), [filterParamsFieldFct]);
  const adaptParams = useMemo(() => buildAdaptParams({adaptPaginationParams, adaptSortParams, adaptFilterParams}), [adaptPaginationParams, adaptSortParams, adaptFilterParams]);
  return adaptParams;
}
