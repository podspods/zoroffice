import SingleSelect from '@/components/SingleSelect';
import * as React from 'react';

export type TestingProp = {
  minWidth: string;
  maxWidth: string;
  width: string;
};

export default function Testing({ ...props }: TestingProp) {
  const optionList = ['1', '2long long long '];
  return (
    <SingleSelect
      minWidth={props.minWidth}
      maxWidth={props.maxWidth}
      width={props.width}
      options={optionList}
      // value={value}
      label={'textLabel'}
      // placeHolder={textLabel}
      // disableClearable
      // onChange={handleChange}
    />
  );
}
