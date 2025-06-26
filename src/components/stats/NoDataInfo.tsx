function NoDataInfo() {
  return (
    <div className="flex border rounded-sm border-cyan-600 bg-neutral-300 dark:bg-neutral-700 text-zinc-950 dark:text-zinc-50 justify-center items-center p-2 sm:p-4 h-fit mt-4">
      <p className="font-body text-xs sm:text-sm ">
        No date was selected or no activities were recorded in the selected
        timeframe. Please select a different timeframe to show the chart.{" "}
      </p>
    </div>
  );
}

export default NoDataInfo;
