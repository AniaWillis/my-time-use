export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const dateToFormat = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateToFormat.toLocaleDateString(undefined, options);
  return formattedDate;
}

export function getWeekday(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const dateToFormat = new Date(year, month - 1, day);
  const weekday = dateToFormat.toLocaleDateString(undefined, {
    weekday: "long",
  });
  return weekday;
}
