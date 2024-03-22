import React from 'react';

export type LinkToProps = {
  label: string;
  link: string;
};
export default function LinkTo({ ...props }: LinkToProps) {
  return (
    <>
      <a href={props.link}>{props.label}</a>,
    </>
  );
}
