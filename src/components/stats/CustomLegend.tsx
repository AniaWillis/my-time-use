import { CustomLegendProps } from "../../types/stats";

function CustomLegend({ data }: CustomLegendProps) {
  return (
    <div className="flex flex-col gap-1 font-body font-medium text-xs sm:text-sm md:text-base">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <div>
            <p style={{ color: item.color }}>
              {item.name}:{" "}
              <span className="text-zinc-950 dark:text-zinc-50">
                {item.label}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomLegend;
