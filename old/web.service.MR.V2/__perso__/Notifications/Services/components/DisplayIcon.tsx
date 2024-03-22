import React from 'react';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';

export enum IconeName {
  DELETE = 1,
  PLUS
}

export default function DisplayIcon(iconeName: IconeName): React.ReactNode {
  switch (iconeName) {
    case IconeName.DELETE:
      return <DeleteIcon />;
    case IconeName.PLUS:
      return <PlusIcon />;
    default:
      return <></>;
  }
}
