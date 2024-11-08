import { DateTime, DateTimeFormatOptions, Duration } from "luxon";
import { useMemo } from "react";

export const getFormattedDate = (date: string, formatOpts?: DateTimeFormatOptions) => DateTime.fromISO(date).toLocaleString(formatOpts || DateTime.DATETIME_MED);

export const isToday = (date: string) => {
    return DateTime.fromISO(date).hasSame(DateTime.local(), "day");
}

export const isYesterday = (date: string) => {
    return DateTime.fromISO(date).hasSame(DateTime.local().minus(Duration.fromObject({ day: 1 })), "day");
}

export function useDateDifference(date: string) {
    const parsedDate = DateTime.fromFormat(date, 'yyyy-MM-dd hh:mm a');
    const diff = parsedDate.diffNow();

    const { days, hours, minutes } = diff.shiftTo('days', 'hours', 'minutes').toObject();

    const dateColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = useMemo(() => {
        const completeMins = diff.shiftTo('minutes').minutes;
        return completeMins < 0 ? 'error' : (completeMins >= 1 && completeMins <= 20 ? 'warning' : 'success')
    }, [diff]);

    const prefix = `${dateColor === 'error' ? 'Due since' : 'Due in'}`;
    const daysValue = days! === 0 ? '' : `${Math.abs(days!)} days`;
    const hoursValue = hours! === 0 ? '' : `${Math.abs(hours!)} hours`;
    const minsValue = minutes! === 0 ? '' : `${Math.abs(Math.round(minutes!))} mins`;
    const parsedDateString = `${prefix} ${daysValue} ${hoursValue} ${minsValue}`;

    return {
        parsedDateString,
        dateColor,
        prefix,
        daysValue,
        hoursValue,
        minsValue
    };
}

export const getTime = (date: string, format = 'yyyy-LL-dd hh:mm a') => {
    const isoDate = DateTime.fromFormat(date, format).toISO();
    return DateTime.fromISO(isoDate!).toFormat('hh:mm a');
}