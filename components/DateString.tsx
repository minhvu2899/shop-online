import React from "react";
import { parseISO, format } from "date-fns";
const DateString = () => {
  const dateString = new Date().toISOString();
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default DateString;
