import React, { useCallback, useEffect, useMemo, useState } from "react";

import ActivityRecord from "./ActivityRecord";
import Button from "./Button";
import Sorter from "./Sorter";

import useRecords from "../hooks/useRecords";
import { Activity, ActivityRecordsListProps } from "../types/records";
import { calculateTimeMinutes } from "../utils/timeUtils";

function ActivityRecordsList({ date, onModalOpen }: ActivityRecordsListProps) {
  const { activities } = useRecords();

  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem(`sortActivityOrder-${date}`) || "asc";
  });

  const sortedDailyActivities = useMemo(() => {
    return Object.values(activities)
      .filter((activity) => activity.date === date)
      .sort((a, b) => {
        const timeA = calculateTimeMinutes(a.startTime);
        const timeB = calculateTimeMinutes(b.startTime);
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
  }, [activities, date, sortOrder]);

  useEffect(() => {
    localStorage.setItem(`sortActivityOrder-${date}`, sortOrder);
  }, [sortOrder, date]);

  const handleSortActivityAsc = useCallback(() => {
    setSortOrder("asc");
  }, []);

  const handleSortActivityDesc = useCallback(() => {
    setSortOrder("desc");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:gap-4">
        {sortedDailyActivities.length > 1 && (
          <Sorter
            sortBy="activity time"
            sortAsc={handleSortActivityAsc}
            sortDesc={handleSortActivityDesc}
          />
        )}
        {sortedDailyActivities.map((activity: Activity) => (
          <ActivityRecord key={activity.id} activity={activity} />
        ))}
      </div>
      <div>
        <Button
          textSize="text-sm sm:text-base"
          label="+ Add activity"
          version="version1"
          onClick={() => onModalOpen(true)}
        />
      </div>
    </div>
  );
}

export default React.memo(ActivityRecordsList);
