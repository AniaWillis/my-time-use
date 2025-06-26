import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";

import DailyRecord from "./DailyRecord";
import DateSelector from "./DateSelector";
import Sorter from "./Sorter";
import Spinner from "./Spinner";

import useRecords from "../hooks/useRecords";
import { DayRecord } from "../types/records";
import { supabase } from "../auth/supabase-client";

function DailyRecordsList() {
  const { createDateRecord, dailyRecords, existingDates, isLoading } =
    useRecords();

  const [sortOrder, setSortOrder] = useState<string>(() => {
    const savedSortOrder = localStorage.getItem("sortOrder");
    return savedSortOrder || "asc";
  });

  const sortedRecords = useMemo(() => {
    return [...dailyRecords].sort((a: DayRecord, b: DayRecord) =>
      sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [dailyRecords, sortOrder]);

  const handleSortDateAsc = () => {
    setSortOrder("asc");
    localStorage.setItem("sortOrder", "asc");
  };

  const handleSortDateDesc = () => {
    setSortOrder("desc");
    localStorage.setItem("sortOrder", "desc");
  };

  async function handleAddDate(date: string) {
    if (existingDates.includes(date)) {
      toast.warning("Day already exists.");
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      toast.error("Could not get user info.");
      return;
    }

    const newDay = {
      date,
      id: crypto.randomUUID(),
      user_id: user.id,
    };

    createDateRecord(newDay);
  }

  return (
    <div className="flex flex-col gap-4 sm:p-6">
      {isLoading.daily && (
        <div className="flex h-fit justify-end items-center">
          <div className="w-fit h-fit mt-2 sm:mt-0">
            <Spinner size={50} />
          </div>
        </div>
      )}
      {dailyRecords.length >= 2 && (
        <Sorter
          sortBy="date"
          sortAsc={handleSortDateAsc}
          sortDesc={handleSortDateDesc}
        />
      )}

      {sortedRecords.map((record: DayRecord) => (
        <DailyRecord key={record.id} record={record} />
      ))}
      <div className="flex justify-center items-center mt-2 sm:mt-4">
        <DateSelector
          text="Select the date and add a day to your log:"
          buttonLabel="+ Add day"
          onClick={handleAddDate}
        />
      </div>
    </div>
  );
}

export default React.memo(DailyRecordsList);
