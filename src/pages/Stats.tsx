import { useEffect, useMemo, useState } from "react";

import { WEEKDAYS, WEEKENDS } from "../constants/dayArrays";

import Spinner from "../components/Spinner";

import CategoriesChart from "../components/stats/CategoriesChart";
import EfficiencyStats from "../components/stats/EfficiencyStats";
import FocusStats from "../components/stats/FocusStats";
import StatsSummary from "../components/stats/StatsSummary";
import TimeAccounted from "../components/stats/TimeAccounted";
import TimeFrameSelector from "../components/stats/TimeFrameSelector";
import TimeframeSummary from "../components/stats/TimeframeSummary";

import useRecords from "../hooks/useRecords";

import {
  calculateDistractedNumber,
  calculateMultitaskingNumber,
  getLongestDuration,
  getShortestDuration,
} from "../utils/statsHelpers";

import { getWeekday } from "../utils/dateUtils";

function Stats() {
  const { stats, calculateStats, activities, existingDates } = useRecords();
  const [daysToShow, setDaysToShow] = useState(() => {
    const storedDateRange = localStorage.getItem("daysToShow") || "all";
    return storedDateRange;
  });

  const [checkedDates, setCheckedDates] = useState<string[]>(() => {
    const stored = localStorage.getItem("checkedDates");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(
    function () {
      calculateStats();
    },
    [calculateStats]
  );

  useEffect(() => {
    localStorage.setItem("daysToShow", daysToShow);

    if (daysToShow !== "select") {
      setCheckedDates([]);
      localStorage.removeItem("checkedDates");
    }
  }, [daysToShow]);

  useEffect(() => {
    if (daysToShow === "select") {
      localStorage.setItem("checkedDates", JSON.stringify(checkedDates));
    }
  }, [checkedDates, daysToShow]);

  const recordsToShow = useMemo(() => {
    if (daysToShow === "all") return activities;
    if (daysToShow === "weekdays") {
      return activities.filter((activity) =>
        WEEKDAYS.includes(getWeekday(activity.date))
      );
    }
    if (daysToShow === "weekends") {
      return activities.filter((activity) =>
        WEEKENDS.includes(getWeekday(activity.date))
      );
    }
    if (daysToShow === "select") {
      return activities.filter((activity) =>
        checkedDates.includes(activity.date)
      );
    }
    return activities;
  }, [daysToShow, activities, checkedDates]);

  const accountedTime = useMemo(
    () =>
      recordsToShow.reduce((total, activity) => total + activity.duration, 0),
    [recordsToShow]
  );

  const numberOfDays = useMemo(() => {
    if (daysToShow === "all") return existingDates.length;
    if (daysToShow === "weekdays") {
      return existingDates.filter((date) => WEEKDAYS.includes(getWeekday(date)))
        .length;
    }
    if (daysToShow === "weekends") {
      return existingDates.filter((date) => WEEKENDS.includes(getWeekday(date)))
        .length;
    }
    if (daysToShow === "select") return checkedDates.length;
    return 0;
  }, [daysToShow, existingDates, checkedDates]);

  const multitaskingNumber = useMemo(
    () => calculateMultitaskingNumber(recordsToShow),
    [recordsToShow]
  );

  const distractedNumber = useMemo(
    () => calculateDistractedNumber(recordsToShow),
    [recordsToShow]
  );

  const shortestDuration = useMemo(
    () => getShortestDuration(recordsToShow),
    [recordsToShow]
  );

  const longestDuration = useMemo(
    () => getLongestDuration(recordsToShow),
    [recordsToShow]
  );

  function handleCheckboxChange(dates: string[]) {
    setCheckedDates(dates);
  }

  return (
    <div className="px-4 sm:px-6">
      {stats.isLoadingStats && (
        <div className="flex mt-10">
          <Spinner size={125} />
        </div>
      )}
      <StatsSummary />
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row sm:mb-6">
          <div className=" min-w-fit sm:border-r-2">
            <TimeFrameSelector
              daysToShow={daysToShow}
              onDaysToShowChange={setDaysToShow}
              onCheckboxChange={handleCheckboxChange}
              checkedDates={checkedDates}
            />
          </div>
          <div className="flex flex-col gap-8 sm:gap-12 p-4 sm:px-6">
            <TimeAccounted
              accountedTime={accountedTime}
              numberOfDays={numberOfDays}
            />

            <TimeframeSummary
              accountedTime={accountedTime}
              numberOfActivities={recordsToShow.length}
              numberOfDays={numberOfDays}
              multitaskingNumber={multitaskingNumber}
              shortestDuration={shortestDuration}
              longestDuration={longestDuration}
              distractedNumber={distractedNumber}
            />
          </div>
        </div>
        <div className="flex flex-col grow p-4 gap-12 mb-10">
          <CategoriesChart records={recordsToShow} time={accountedTime} />
          <FocusStats records={recordsToShow} totalTime={accountedTime} />
          <EfficiencyStats records={recordsToShow} totalTime={accountedTime} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
