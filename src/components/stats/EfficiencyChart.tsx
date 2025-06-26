import { useMemo } from "react";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import CustomLegend from "./CustomLegend";
import NoDataInfo from "./NoDataInfo";

import { EfficiencyChartProps } from "../../types/stats";
import { areAllValuesZero } from "../../utils/statsHelpers";

function EfficiencyChart({ data }: EfficiencyChartProps) {
  const allZeros = useMemo(() => areAllValuesZero(data), [data]);

  return (
    <div className="flex flex-col sm:flex-row w-full h-fit sm:items:center">
      <div className="w-full sm:w-1/2 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {allZeros ? (
            <NoDataInfo />
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="w-full sm:w-1/2 py-4 flex items-center justify-center">
        {!allZeros && <CustomLegend data={data} />}
      </div>
    </div>
  );
}

export default EfficiencyChart;
