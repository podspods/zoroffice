'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export type IsLoadingProps = {
  isLoading: boolean;
  label?: string;
};
export default function IsLoading({ ...props }: IsLoadingProps) {
  const { t } = useTranslation();
  if (props.isLoading) {
    return (
      <p>{props.label && t(props.label)}</p>
    );
  }
}
