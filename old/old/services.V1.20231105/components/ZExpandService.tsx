'use client';

import React from 'react';
import { Service } from '../services.type';
import { DisplayParagraphe } from './ZDisplayParagraphe';
import { expandText } from '../expand';
// import { GridColDef, GridRowParams } from '@mui/x-data-grid';

export type expandComponentProps = Service;

export function ExpandService(props: expandComponentProps): React.ReactNode {
  // console.log('params 15 ==>', props);
  // console.log('params 15 ==>', props.row);

  const lineList = expandText(props);

  return (
    <React.Fragment>
      <DisplayParagraphe lineList={lineList} />
    </React.Fragment>
  );
}
