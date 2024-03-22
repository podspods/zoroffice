'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export type OnErrorProps = {
  onError: boolean;
  label: string;
};
export function OnError({ ...props }: OnErrorProps) {
  const { t } = useTranslation();
  if (props.onError) {
    return (
      <p>{props.label && t(props.label)}</p>
    );
  }
}
