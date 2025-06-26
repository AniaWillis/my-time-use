import React, { useMemo } from "react";

import useRecords from "../../hooks/useRecords";

import { TimeFrameSelectorProps } from "../../types/stats";
import { getWeekday } from "../../utils/dateUtils";

function TimeFrameSelector({
  checkedDates,
  daysToShow,
  onCheckboxChange,
  onDaysToShowChange,
}: TimeFrameSelectorProps) {
  const { dailyRecords } = useRecords();

  const allDates = useMemo(
    () =>
      dailyRecords
        .map((d) => [d.date, getWeekday(d.date)])
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()),
    [dailyRecords]
  );

  function handleDaysToShowChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onDaysToShowChange(value);
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if (checked) {
      onCheckboxChange([...checkedDates, value]);
    } else onCheckboxChange(checkedDates.filter((date) => date !== value));
  }

  return (
    <div className="font-body text-sm sm:text-base p-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2">Select days to adjust the charts</legend>
        <div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="all"
              name="dateSelection"
              value="all"
              checked={daysToShow === "all"}
              onChange={handleDaysToShowChange}
            />
            <label htmlFor="all">All days</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="weekdays"
              name="dateSelection"
              value="weekdays"
              checked={daysToShow === "weekdays"}
              onChange={handleDaysToShowChange}
            />
            <label htmlFor="weekdays">Weekdays only</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="weekends"
              name="dateSelection"
              value="weekends"
              checked={daysToShow === "weekends"}
              onChange={handleDaysToShowChange}
            />
            <label htmlFor="weekends">Saturdays and Sundays</label>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="select"
            name="dateSelection"
            value="select"
            checked={daysToShow === "select"}
            onChange={handleDaysToShowChange}
          />
          <label htmlFor="select">Select specific dates</label>
        </div>
      </fieldset>
      {daysToShow === "select" &&
        allDates.map((d) => (
          <div key={d[0]} className="flex gap-2 ml-5">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              value={d[0]}
              checked={checkedDates.includes(d[0])}
            />
            <label htmlFor="">
              {d[0]} ({d[1]})
            </label>
          </div>
        ))}
    </div>
  );
}

export default TimeFrameSelector;
