import i18n from 'i18n';
import { t } from 'i18next';
import { DateTime, DateTimeFormatOptions, Duration } from 'luxon';
import { useMemo } from 'react';

export const getFormattedDate = (
  date: string,
  formatOpts?: DateTimeFormatOptions
) => DateTime.fromISO(date).toLocaleString(formatOpts || DateTime.DATETIME_MED);

export const isToday = (date: string) => {
  return DateTime.fromISO(date).hasSame(DateTime.local(), 'day');
};

export const isYesterday = (date: string) => {
  return DateTime.fromISO(date).hasSame(
    DateTime.local().minus(Duration.fromObject({ day: 1 })),
    'day'
  );
};

export function useDateDifference(date: string) {
  const parsedDate = DateTime.fromFormat(date, 'yyyy-MM-dd hh:mm a');
  const diff = parsedDate.diffNow();

  const { days, hours, minutes } = diff
    .shiftTo('days', 'hours', 'minutes')
    .toObject();

  const dateColor:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' = useMemo(() => {
    const completeMins = diff.shiftTo('minutes').minutes;
    return completeMins < 0
      ? 'error'
      : completeMins >= 1 && completeMins <= 20
        ? 'warning'
        : 'success';
  }, [diff]);

  const prefix = `${dateColor === 'error' ? t('due_since') : t('due_in')}`;
  const daysValue = days! === 0 ? '' : `${Math.abs(days!)} ${t('days')}`;
  const hoursValue = hours! === 0 ? '' : `${Math.abs(hours!)} ${t('hours')}`;
  const minsValue =
    minutes! === 0 ? '' : `${Math.abs(Math.round(minutes!))} ${t('mins')}`;
  const parsedDateString = `${prefix} ${daysValue} ${hoursValue} ${minsValue}`;

  return {
    parsedDateString,
    dateColor,
    prefix,
    daysValue,
    hoursValue,
    minsValue,
  };
}

export const getTime = (date: string, format = 'yyyy-LL-dd hh:mm a') => {
  const isoDate = DateTime.fromFormat(date, format).toISO();
  return DateTime.fromISO(isoDate!).toFormat('hh:mm a');
};

export function getTimeAgo(
  dateStr: string,
  format = 'yyyy-LL-dd hh:mm a'
): string {
  const now = DateTime.now();
  const isValidInThisFormat = DateTime.fromFormat(dateStr, format).isValid;
  const isoDate = DateTime.fromFormat(dateStr, format).toISO();
  const inputDate = DateTime.fromISO(isValidInThisFormat ? isoDate! : dateStr);
  const diff = now.diff(inputDate, ['days', 'hours', 'minutes', 'seconds']);

  if (diff.days >= 1) {
    return diff.days === 1
      ? `1 ${i18n.t('day')} ${i18n.t('ago')}`
      : `${Math.floor(diff.days)} ${i18n.t('days')} ${i18n.t('ago')}`;
  } else if (diff.hours >= 1) {
    return diff.hours === 1
      ? `1 ${i18n.t('hr')} ${i18n.t('ago')}`
      : `${Math.floor(diff.hours)} ${i18n.t('hrs')} ${i18n.t('ago')}`;
  } else if (diff.minutes >= 1) {
    return diff.minutes === 1
      ? `1 ${i18n.t('min_singular')} ${i18n.t('ago')}`
      : `${Math.floor(diff.minutes)} ${i18n.t('mins')} ${i18n.t('ago')}`;
  } else {
    return diff.seconds <= 1
      ? `1 ${i18n.t('sec')} ${i18n.t('ago')}`
      : `${Math.floor(diff.seconds)} ${i18n.t('secs')} ${i18n.t('ago')}`;
  }
}
