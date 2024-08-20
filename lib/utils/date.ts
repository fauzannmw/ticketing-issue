import { DateValue } from "@internationalized/date";

export const dateToIso = (dateValue: DateValue): string => {
  const { year, month, day } = dateValue;
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};
