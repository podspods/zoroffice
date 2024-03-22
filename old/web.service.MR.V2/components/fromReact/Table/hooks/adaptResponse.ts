import type {SWRResponse} from 'swr';

export type adaptResponseBuilderProps = {
  validateRowFct: (data: unknown) => boolean,
  rowsField?: string,
  totalRowCountField?: string,
  rowParser?: RowParser,
  pageInfoParser?: PageInfoParser
}

function narrowingRows<Row>(validateRowFct: adaptResponseBuilderProps['validateRowFct'], data: unknown): data is Row[] {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(validateRowFct);
}

function narrowDataSWRResponse(data: unknown, {rowsField, totalRowCountField}: {rowsField: string, totalRowCountField: string}): data is {[key: string]: unknown} {
  return !!(data && typeof data === 'object' && rowsField in data && totalRowCountField in data);
}

function builderDefaultRowParser({rowsField, validateRowFct}: {rowsField: string, validateRowFct: (data: unknown) => boolean}) {
  return function defaultRowParser<Row>(data: {[key: string]: unknown}): Row[] {
    const rows: unknown = data[rowsField];
    // const totalRowCount: unknown = data[totalRowCountField];

    if (!narrowingRows<Row>(validateRowFct, rows)) {
      throw new Error('Invalid rows data');
    }
    return rows;
  };
}

function builderDefaultPageInfoParser({totalRowCountField}: {totalRowCountField: string}) {
  return function defaultPageInfoParser(data: {[key: string]: unknown}): PageInfo {
    const totalRowCount: unknown = data[totalRowCountField];

    if (typeof totalRowCount !== 'number') {
      throw new Error('Invalid totalRowCount data');
    }

    return {totalRowCount};
  };
}

export type PageInfo = {totalRowCount: number}
export type RowParser = <Row>(data: unknown) => Row[]
export type PageInfoParser = <T extends PageInfo>(data: unknown) => T
export type ResponseRowType<Row> = Omit<SWRResponse<unknown, Error | undefined>, 'data'> & {rows: Row[], pageInfo?: {totalRowCount: number}}

export default function adaptResponseBuilder<Row>(builderOpts: adaptResponseBuilderProps) {
  const {
    validateRowFct,
    rowsField = 'data',
    totalRowCountField = 'iTotalRecords'
  } = builderOpts || {};

  const {
    rowParser = builderDefaultRowParser({rowsField: rowsField || 'data', validateRowFct}),
    pageInfoParser = builderDefaultPageInfoParser({totalRowCountField: totalRowCountField || 'iTotalRecords'})
  } = builderOpts || {};

  return function adaptResponse(swrResponse: SWRResponse<unknown | undefined, Error | undefined>): ResponseRowType<Row> {
    const {data, error, isLoading, isValidating, mutate} = swrResponse;

    if (isLoading || error) {
      return {isLoading, rows: [], error, isValidating, mutate};
    }

    if (!narrowDataSWRResponse(data, {rowsField, totalRowCountField})) {
      return {isLoading, rows: [], error: new Error('Invalid response data'), isValidating, mutate};
    }

    let rows: Row[];
    let pageInfo: PageInfo;

    try {
      rows = rowParser(data);
    }
    catch (error: any) {
      return {isLoading, rows: [], error, isValidating, mutate};
    }

    try {
      pageInfo = pageInfoParser(data);
    }
    catch (error: any) {
      return {isLoading, rows, error, isValidating, mutate};
    }

    return {isLoading, rows, pageInfo, error: undefined, isValidating, mutate};
  };
}
