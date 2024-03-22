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
  mimeType = 'mimeType',
  product = 'product',
  serviceName = 'serviceName',
  userAgent = 'userAgent'
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
    default:
      return <TableDefault />;
  }

  return <></>;
}
