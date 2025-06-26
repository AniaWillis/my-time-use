import { useMemo } from "react";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { CATEGORY_COLORS } from "../../constants/dataColors";
import { CategoriesChartProps } from "../../types/stats";
import { calculateDurationPerCategory } from "../../utils/statsHelpers";
import { formatDuration } from "../../utils/timeUtils";

import NoDataInfo from "./NoDataInfo";

function CategoriesChart({ records, time }: CategoriesChartProps) {
  // records have to be converted to Recharts format data:
  const data = useMemo(
    () =>
      Object.entries(calculateDurationPerCategory(records)).map(
        ([name, value]) => ({
          name,
          value,
          labelX: `${name}: ${formatDuration(value)} (${Math.round(
            (value / time) * 100
          )}%)`,
          labelY: `${value / 60} `,
        })
      ),
    [records, time]
  );

  const chartHeight = useMemo(
    () => (data.length > 4 ? data.length * 46 : data.length * 50 + 30),
    [data]
  );

  return (
    <div className="w-full min-h-[80px] mb-8">
      <div style={{ width: "100%", height: chartHeight }} className="mb-6">
        <h2 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold mb-3">
          Activity Categories
        </h2>
        <ResponsiveContainer>
          {data.length === 0 ? (
            <NoDataInfo />
          ) : (
            <BarChart
              className="text-zinc-950 dark:text-zinc-50"
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 0, left: -50, bottom: 0 }}
            >
              <XAxis type="number" className="font-body text-xs sm:text-sm" />
              <YAxis
                className="text-xs sm:text-sm font-body"
                type="category"
                dataKey="labelX"
                width={250}
                tick={{
                  fill: "#6B7280",
                }}
              />
              {data.length > 0 && <Legend />}

              <Bar dataKey="labelY" name="Duration (hours)" barSize={20}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoriesChart;
