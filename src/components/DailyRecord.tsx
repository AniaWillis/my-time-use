import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  FilePlus2,
  Folder,
  FolderOpen,
  SquarePen,
  Trash2,
  X,
} from "lucide-react";

import ActivityForm from "./ActivityForm";
import ActivityRecordsList from "./ActivityRecordsList";
import Button from "./Button";
import DateSelector from "./DateSelector";
import DeleteConfirmation from "./DeleteConfirmation";
import Spinner from "./Spinner";

import useRecords from "../hooks/useRecords";
import { DailyRecordProps } from "../types/records";
import { formatDate } from "../utils/dateUtils";

function DailyRecord({ record }: DailyRecordProps) {
  const { updateDate, existingDates, isLoading } = useRecords();

  const [activitiesOpen, setActivitiesOpen] = useState(() => {
    const stored = localStorage.getItem(`activitiesOpen-${record.date}`);
    return stored ? stored === "true" : false;
  });

  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [dateEditOpen, setDateEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = formatDate(record.date);

  useEffect(() => {
    localStorage.setItem(
      `activitiesOpen-${record.date}`,
      String(activitiesOpen)
    );
  }, [activitiesOpen, record.date]);

  function handleUpdateDate(date: string, id?: string) {
    if (!id) return;
    if (existingDates.includes(date)) {
      toast.warning("Date already exists");
      return;
    }
    updateDate(date, id);
    setDateEditOpen(false);
  }

  return (
    <div className=" relative border border-cyan-600 rounded-sm xs:p-4 p-2 flex flex-col gap-2 xs:gap-3 sm:gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-cyan-600 font-heading font-semibold text-base sm:text-lg">
          {formattedDate}
        </h4>
        <div className="flex gap-2">
          <div>{isLoading.activity && <Spinner size={24} />}</div>
          <div className="xs:flex grid grid-cols-2 gap-2">
            <Button
              version="version4"
              onClick={() => {
                setIsModalOpen(true);
                setActivitiesOpen(true);
              }}
            >
              <FilePlus2 className="size-5 sm:size-6 text-cyan-600" />
            </Button>
            {activitiesOpen && (
              <Button
                version="version4"
                onClick={() => setActivitiesOpen(false)}
              >
                <Folder className="size-5 sm:size-6 text-cyan-600" />
              </Button>
            )}
            {!activitiesOpen && (
              <Button
                version="version4"
                onClick={() => setActivitiesOpen(true)}
              >
                <FolderOpen className="size-5 sm:size-6 text-cyan-600" />
              </Button>
            )}
            <Button version="version4" onClick={() => setDateEditOpen(true)}>
              <SquarePen className="size-5 sm:size-6 text-cyan-600" />
            </Button>
            <Button version="version4" onClick={() => setDeleteBoxOpen(true)}>
              <Trash2 className="size-5 sm:size-6 text-cyan-600" />
            </Button>
          </div>
        </div>
      </div>
      {record.id && deleteBoxOpen && (
        <div className="absolute top-0 right-0 z-10">
          <DeleteConfirmation
            setDeleteBoxOpen={setDeleteBoxOpen}
            id={record.id}
            date={record.date}
            recordType="daily"
            label="the daily record"
          />
        </div>
      )}
      {dateEditOpen && (
        <div className="absolute top-0 right-0 z-30 bg-neutral-300 dark:bg-neutral-700 flex flex-col w-fit max-w-full p-2 sm:p-4 rounded-sm border-double border-4 self-end">
          <button
            className="cursor-pointer self-end"
            onClick={() => setDateEditOpen(false)}
          >
            <X className="size-5 sm:size-6" />
          </button>
          <DateSelector
            text="Select a new date to change it:"
            buttonLabel="Change date"
            dateId={record.id}
            onClick={handleUpdateDate}
          />
        </div>
      )}

      {activitiesOpen && (
        <ActivityRecordsList date={record.date} onModalOpen={setIsModalOpen} />
      )}

      {record.id && (
        <ActivityForm
          isOpen={isModalOpen}
          buttonLabel="Save activity"
          onClose={() => setIsModalOpen(false)}
          date={record.date}
          dateId={record.id}
        />
      )}
    </div>
  );
}

export default React.memo(DailyRecord);
