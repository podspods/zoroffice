'use client';

import React from 'react';

export type NotificationFooterProps = {
  name: string
}

export default function NotificationFooter({...props}: NotificationFooterProps) {
  return (<React.Fragment>
    <p>{props.name}</p>
  </React.Fragment>);

}
