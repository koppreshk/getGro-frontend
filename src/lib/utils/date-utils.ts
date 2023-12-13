import { DateTime } from "luxon";

export const getFormattedDate = (date: string) => DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
