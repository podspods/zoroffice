import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{}>;

export default function CustomCell(props: Props) {
  return (
    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {props.children}
    </span>
  );
}

