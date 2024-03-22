import React from 'react';
import { BaseButton, BaseButtonColor } from '@systran/react-components/lib/atoms/Buttons/Base';
import { findButtonColor } from '../common/common';
export type ColorButtonProps ={
  value: string,
}

export default function ColorButton({...props}: ColorButtonProps) {

  const buttonColor: BaseButtonColor = findButtonColor(props.value);
  return (<React.Fragment>
    <BaseButton color={buttonColor} fullWidth>
      {props.value}
    </BaseButton>
  </React.Fragment>);
}


