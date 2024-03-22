import {DateTime} from 'luxon';

export default function renderTimeFrom(dateISO: string, locale: string|string[]) {
  const date = DateTime.fromISO(dateISO).setLocale(locale.toString() || 'en');
  return date.toRelative()?.toString() || '';
}
