import React from 'react';
import { BaseButton } from '@systran/react-components/lib/atoms/Buttons/Base';
export type ColorButtonProps ={
  value: string,
  color: string
}

export default function ColorButton({...props}: ColorButtonProps) {
  // console.log('ColorButton 9 ==>', props);
  // const buttonColor: BaseButtonColor = findButtonColor(props.value);
  return (<React.Fragment>
    <BaseButton color={props.color} fullWidth>
      {props.value}
    </BaseButton>
  </React.Fragment>);
}


