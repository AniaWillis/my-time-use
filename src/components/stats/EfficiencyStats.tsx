import { useMemo, useState } from "react";

import Button from "../Button";
import EfficiencyChart from "./EfficiencyChart";

import {
  calculateTimeEfficiency,
  calculateActivityEfficiency,
} from "../../utils/statsHelpers";
import { RATING_COLORS } from "../../constants/dataColors";

import { EfficiencyStatsProps } from "../../types/stats";
import { formatDuration } from "../../utils/timeUtils";

function EfficiencyStats({ records, totalTime }: EfficiencyStatsProps) {
  const [isTimeChart, setIsTimeChart] = useState(true);

  const timeEfficiencyData = useMemo(
    () =>
      Object.entries(calculateTimeEfficiency(records)).map(([name, value]) => ({
        name,
        value,
        color: RATING_COLORS[name],
        label: `${formatDuration(value)}${
          value > 0 ? ` (${((value / totalTime) * 100).toFixed(2)}%)` : ""
        }`,
      })),
    [records, totalTime]
  );

  const activityEfficiencyData = useMemo(
    () =>
      Object.entries(calculateActivityEfficiency(records)).map(
        ([name, value]) => ({
          name,
          value,
          color: RATING_COLORS[name],
          label: `${value} ${value === 1 ? "activity" : "activities"}`,
        })
      ),
    [records]
  );
  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold mb-3">
        Efficiency Rating{" "}
        {isTimeChart ? "by Time Duration" : "by Number of Activities"}
      </h2>
      <div className="font-body flex justify-end my-6">
        <Button
          textSize="text-sm sm:text-base"
          label={isTimeChart ? "Show activities" : "Show time"}
          version="version1"
          onClick={() => setIsTimeChart((prev) => !prev)}
        />
      </div>
      <div className="flex">
        {isTimeChart && <EfficiencyChart data={timeEfficiencyData} />}
        {!isTimeChart && <EfficiencyChart data={activityEfficiencyData} />}
      </div>
    </div>
  );
}

export default EfficiencyStats;
