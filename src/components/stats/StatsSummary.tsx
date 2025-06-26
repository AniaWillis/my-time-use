import useRecords from "../../hooks/useRecords";
import { formatDuration } from "../../utils/timeUtils";

function StatsSummary() {
  const { stats } = useRecords();
  const activitiesTime = stats.summary?.recordedActivitiesTime as number;

  if (!stats.summary) return null;

  return (
    <div className="mt-10 mb-6 sm:mb-12 p-4 sm:p-6 border rounded-sm border-cyan-600 w-full max-w-[800px] sm:w-3/4 mx-auto">
      <h2 className="font-heading text-cyan-600 font-semibold text-lg sm:text-xl text-center mb-4 sm:mb-6">
        Time Log Summary:
      </h2>
      <div className="flex flex-col items-center gap-2 sm:gap-3 font-body text-sm sm:text-base">
        <div className="text-center">
          <div className="font-medium text-cyan-600 mb-1">Number of days</div>
          <div>{stats.summary.totalDays}</div>
        </div>

        <div className="text-center">
          <div className="font-medium text-cyan-600 mb-1">
            Total number of recorded activities
          </div>
          <div>{stats.summary.recordedActivitiesNumber}</div>
        </div>

        <div className="text-center">
          <div className="font-medium text-cyan-600 mb-1">
            Average number of activities per day
          </div>
          <div>{stats.summary.avgActPerDay}</div>
        </div>

        <div className="text-center">
          <div className="font-medium text-cyan-600 mb-1">
            Total time accounted for
          </div>
          <div>
            {formatDuration(activitiesTime)} of {stats.summary.totalHours} hours
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSummary;
