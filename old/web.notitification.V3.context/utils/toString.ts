import moment from 'moment';

export function durationFromNow(dateString: string): string {
  const myMoment = moment(dateString);
  return myMoment.isValid() ? myMoment.fromNow().toString() : '';
}
