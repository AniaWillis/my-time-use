import { TimeframeSummaryProps } from "../../types/stats";
import { formatDuration } from "../../utils/timeUtils";

function TimeframeSummary({
  accountedTime,
  distractedNumber,
  longestDuration,
  multitaskingNumber,
  numberOfActivities,
  numberOfDays,
  shortestDuration,
}: TimeframeSummaryProps) {
  const avgActDuration =
    accountedTime === 0 || numberOfActivities === 0
      ? "0m"
      : formatDuration(accountedTime / numberOfActivities);

  const avgActPerDay =
    numberOfActivities === 0 || numberOfDays === 0
      ? "0"
      : (numberOfActivities / numberOfDays).toFixed(2).replace(/\.?0+$/, "");

  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold mb-4">
        Summary of Selected Timeframe
      </h2>
      <div className="font-body text-sm sm:text-base">
        <p>
          Time accounted for:{" "}
          <span className="text-cyan-600 px-2">
            {formatDuration(accountedTime)}
          </span>
        </p>
        <p>
          Number of days:{" "}
          <span className="text-cyan-600 px-2">{numberOfDays}</span>
        </p>
        <p>
          Number of activities:{" "}
          <span className="text-cyan-600 px-2">{numberOfActivities}</span>
        </p>
        <p>
          Average number of activities per day:{" "}
          <span className="text-cyan-600 px-2">{avgActPerDay}</span>
        </p>
        <p>
          Average activity duration:{" "}
          <span className="text-cyan-600 px-2">{avgActDuration}</span>
        </p>
        <p>
          Shortest activity duration:{" "}
          <span className="text-cyan-600 px-2">
            {formatDuration(shortestDuration)}
          </span>
        </p>
        <p>
          Longest activity duration:{" "}
          <span className="text-cyan-600 px-2">
            {formatDuration(longestDuration)}
          </span>
        </p>
        <p>
          Number of activities marked as multitasking:{" "}
          <span className="text-cyan-600 px-2">{multitaskingNumber}</span>
        </p>
        <p>
          Number of activities with distractions or interruptions:{" "}
          <span className="text-cyan-600 px-2">{distractedNumber}</span>
        </p>
      </div>
    </div>
  );
}

export default TimeframeSummary;
