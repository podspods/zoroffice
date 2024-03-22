import useDefaultSWR, { type SWRHook, SWRResponse } from 'swr';
import {RowWithId} from '../Table/SimpleTable';
import {useRefreshProps} from '../hooks/useRemoteHooks';
import adaptParamsBuilder, { adaptParamsBuilderOpts } from './adaptParams';
import adaptResponseBuilder, { ResponseRowType, type adaptResponseBuilderProps } from './adaptResponse';

export type useRefreshBuilderOpts = {
  route: string,
  useSWR: SWRHook,
  adaptParamsOpts?: adaptParamsBuilderOpts,
  adaptResponseOpts: adaptResponseBuilderProps
};

export default function useRefreshBuilder<Row extends RowWithId>(opts: useRefreshBuilderOpts) {
  const {adaptParamsOpts, adaptResponseOpts, route, useSWR = useDefaultSWR} = opts;

  const adaptParams = adaptParamsBuilder(adaptParamsOpts);
  const adaptResponse = adaptResponseBuilder<Row>(adaptResponseOpts);

  return function useRefresh(query: useRefreshProps): ResponseRowType<Row> {
    const searchParams = adaptParams(query);
    const swrResponse: SWRResponse<unknown> = useSWR(route + '?' + searchParams);
    const response = adaptResponse(swrResponse);
    return response;
  };
}
