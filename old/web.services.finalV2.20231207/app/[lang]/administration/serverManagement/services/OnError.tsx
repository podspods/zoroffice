'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export type OnErrorProps = {
  onError: boolean;
  label: string;
};
export default function OnError({ ...props }: OnErrorProps) {
  const { t } = useTranslation();
  return props.onError && <p>{props.label && t(props.label)}</p>;
}
