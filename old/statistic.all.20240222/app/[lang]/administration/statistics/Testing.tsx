import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from './components/DatePicker';
export default function Testing() {
  const { t } = useTranslation();
  return (
    <DatePicker
      onChange={() => null}
      label={t('Date Period')}
    />
  );
}
