import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { TimeAccountedProps } from "../../types/stats";
import { formatDuration } from "../../utils/timeUtils";

function TimeAccounted({ accountedTime, numberOfDays }: TimeAccountedProps) {
  const unaccountedTime = numberOfDays * 24 * 60 - accountedTime;

  const data = [
    {
      accounted: accountedTime / 60,
      unaccounted: unaccountedTime / 60,
    },
  ];
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold mb-3">
        Accounted vs. Unaccounted Time in the Selected Timeframe
      </h2>
      <div
        style={{ width: "100%", height: 125 }}
        className="font-body text-sm sm:text-base mb-1"
      >
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />

            <Legend />
            <Bar
              dataKey="accounted"
              stackId="a"
              fill="#0891B2"
              name={`Accounted Time: ${formatDuration(data[0].accounted * 60)}`}
            />
            <Bar
              dataKey="unaccounted"
              stackId="a"
              fill="#737373"
              name={`Unaccounted Time: ${formatDuration(
                data[0].unaccounted * 60
              )}`}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="font-body text-sm sm:text-base">
        The charts that follow show the breakdown of time that was accounted for
        in the selected timeframe.
      </p>
    </div>
  );
}

export default TimeAccounted;
