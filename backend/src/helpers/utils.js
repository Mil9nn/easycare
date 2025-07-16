export const formatDateTime = (
  dateString,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  };

  const dateDayOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timeZone,
  };

  const dateOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: timeZone,
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  };

  const formattedDateTime = new Date(dateString).toLocaleString("en-US", dateTimeOptions);
  const formattedDateDay = new Date(dateString).toLocaleString("en-US", dateDayOptions);
  const formattedDate = new Date(dateString).toLocaleString("en-US", dateOptions);
  const formattedTime = new Date(dateString).toLocaleString("en-US", timeOptions);

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
