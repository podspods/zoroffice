import PieGlobal from './PieGlobal';
import TableAccountId from './TableAccountId';
import TableSource from './TableSource';
import TableTarget from './TableTarget';

export function TableDefault() {
  return (
    <>
      <p>TableDefault</p>
    </>
  );
}

export enum typeTable {
  Source = 'source',
  Target = 'target',
  AccountId = 'accountId',
  PieGlobal = 'pieGlobal'
  // mimeType = 'mimeType',
  // product = 'product',
  // serviceName = 'serviceName',
  // userAgent = 'userAgent'
}

export type tableSubjectProps = {
  subject: typeTable;
};

export function tableSubject({ ...props }: tableSubjectProps) {
  switch (props.subject) {
    case typeTable.Source:
      return <TableSource />;
    case typeTable.Target:
      return <TableTarget />;
    case typeTable.AccountId:
      return <TableAccountId />;
    case typeTable.PieGlobal:
      return <PieGlobal />;
    default:
      return <TableDefault />;
  }

  return <></>;
}
