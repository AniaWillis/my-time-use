export function formatTime(time: string): string {
  const [hour, minutes] = time.split(":").map(Number);
  const formattedMinutes = minutes <= 9 ? "0" + minutes : minutes;
  return hour > 12
    ? `${hour - 12}:${formattedMinutes} PM`
    : `${hour}:${formattedMinutes} AM`;
}

export function calculateTimeMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  const timeMinutes = hours * 60 + minutes;
  return timeMinutes;
}

export function calculateDurationInMinutes(
  startTime: string,
  endTime: string
): number {
  const [startHour, startMinutes] = startTime.split(":").map(Number);
  const [endHour, endMinutes] = endTime.split(":").map(Number);

  const totalStartMinutes = startHour * 60 + startMinutes;
  const totalEndMinutes = endHour * 60 + endMinutes;

  const totalDurationMins = totalEndMinutes - totalStartMinutes;
  return totalDurationMins;
}

export function formatDuration(totalDurationMins: number): string {
  const durationHrs = Math.floor(totalDurationMins / 60);
  const durationMins = totalDurationMins % 60;

  return durationHrs > 0
    ? `${durationHrs}h${
        durationMins > 0 ? ` ${Math.round(durationMins)}m` : ""
      }`
    : `${Math.round(durationMins)}m`;
}
