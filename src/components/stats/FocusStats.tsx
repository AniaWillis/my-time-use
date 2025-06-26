import { useMemo, useState } from "react";

import Button from "../Button";
import EfficiencyChart from "./EfficiencyChart";

import { FOCUS_COLORS } from "../../constants/dataColors";
import { FocusStatsProps } from "../../types/stats";
import {
  calculateFocusTime,
  calculateFocusPerActivity,
} from "../../utils/statsHelpers";

import { formatDuration } from "../../utils/timeUtils";

function FocusStats({ records, totalTime }: FocusStatsProps) {
  const [isTimeChart, setIsTimeChart] = useState(true);

  const focusTimeData = useMemo(
    () =>
      Object.entries(calculateFocusTime(records)).map(([name, value]) => ({
        name,
        value,
        color: FOCUS_COLORS[name],
        label: `${formatDuration(value)}${
          value > 0 ? ` (${((value / totalTime) * 100).toFixed(2)}%)` : ""
        }`,
      })),
    [records, totalTime]
  );
  const activityFocusData = useMemo(
    () =>
      Object.entries(calculateFocusPerActivity(records)).map(
        ([name, value]) => ({
          name,
          value,
          color: FOCUS_COLORS[name],
          label: `${value} ${value === 1 ? "activity" : "activities"}`,
        })
      ),
    [records]
  );
  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold mb-3">
        Focus / Energy Level{" "}
        {isTimeChart ? "by Time Duration" : "by Number of Activities"}
      </h2>
      <div className=" flex justify-end ">
        <Button
          textSize="text-sm sm:text-base"
          label={isTimeChart ? "Show activities" : "Show time"}
          version="version1"
          onClick={() => setIsTimeChart((prev) => !prev)}
        />
      </div>

      <div className="flex text-sm sm:text-base font-body">
        {isTimeChart && <EfficiencyChart data={focusTimeData} />}
        {!isTimeChart && <EfficiencyChart data={activityFocusData} />}
      </div>
    </div>
  );
}

export default FocusStats;
