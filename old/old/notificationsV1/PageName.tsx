'use client';

import React from 'react';
export type PageNameProps = {
  name: string;
};

export default function PageName({ ...props }: PageNameProps) {
  document.title = props.name;
  return (
    <React.Fragment>
      <div className='root-page container'>
        <style>{`
              .page-title {
                margin-top: -8px,
                margin-bottom: 24px, 
                font-weight: 600
              }
            `}</style>
        <div className='page-title'>
          <h3 className='page-title'>{props.name}</h3>
        </div>
      </div>
    </React.Fragment>
  );
}
