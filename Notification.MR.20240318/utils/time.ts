import {DateTime} from "luxon";

export const timeElapsed = (dateString: string, locale = 'en'): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: 'auto'});
  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30.5;
  const year = month * 12;
  let time = '';

  for (const [unit, secondsInUnit] of Object.entries({year, month, week, day, hour, minute, second})) {
    if (diffInSeconds > secondsInUnit) {
      time = rtf.format(-Math.round(diffInSeconds / secondsInUnit), unit as Intl.RelativeTimeFormatUnit);
      break;
    }
  }
  return time;
};

export const getTimestampFromTime = (time: number) => {
  const timeMinSec = {
    minute: Math.floor(time / 60),
    second: Math.floor(time % 60)
  };
  return DateTime.fromObject(timeMinSec).toFormat('mm:ss');
};
