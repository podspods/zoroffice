'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export type LoadingProps = {
  isLoading: boolean;
  error: boolean;
  labelLoading: string;
  labelError: string;
};
export function Loading({ ...props }: LoadingProps) {
  const { t } = useTranslation();
  if (props.isLoading) return <p>{t(props.labelLoading)}</p>;
  if (props.error)
    return (
      <p>
        {t(props.labelError)}
        {props.error}
      </p>
    );
}
