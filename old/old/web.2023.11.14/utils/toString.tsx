import moment from 'moment';

export function durationFromNow(dateString: string): string {
  if (!dateString) return '';
  return moment(dateString)
    .fromNow()
    .toString();
}
