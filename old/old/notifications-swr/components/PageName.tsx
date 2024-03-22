'use client';

import React from 'react';

export type PageNameProps = {
  name: string
}

export default function PageName({...props}: PageNameProps) {
  document.title = props.name;
  return (
    <React.Fragment>
      <h3 className='page-title'>{props.name}</h3>
    </React.Fragment>
  );
}
