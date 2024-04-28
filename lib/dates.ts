import { DateTime } from "luxon";

const units: Intl.RelativeTimeFormatUnit[] = [
  "year",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
];

export const getTimestamp = (date: Date) => {
  const dateTime = DateTime.fromJSDate(date);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) ?? "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};
