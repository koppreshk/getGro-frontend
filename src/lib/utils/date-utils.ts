import { DateTime, DateTimeFormatOptions, Duration } from "luxon";

export const getFormattedDate = (date: string, formatOpts?: DateTimeFormatOptions) => DateTime.fromISO(date).toLocaleString(formatOpts || DateTime.DATETIME_MED);

export const isToday = (date: string) => {
    return DateTime.fromISO(date).hasSame(DateTime.local(), "day");
}

export const isYesterday = (date: string) => {
    return DateTime.fromISO(date).hasSame(DateTime.local().minus(Duration.fromObject({ day: 1 })), "day");
}