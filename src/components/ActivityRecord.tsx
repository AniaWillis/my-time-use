import React, { useState, useMemo } from "react";

import {
  CircleDashed,
  Frown,
  Meh,
  Smile,
  SquarePen,
  Trash2,
} from "lucide-react";

import ActivityForm from "./ActivityForm";
import Button from "./Button";
import DeleteConfirmation from "./DeleteConfirmation";
import Rating from "./Rating";
import Spinner from "./Spinner";

import useRecords from "../hooks/useRecords";

import { ActivityRecordProps } from "../types/records";

import { formatTime, formatDuration } from "../utils/timeUtils";

function ActivityRecord({ activity }: ActivityRecordProps) {
  const { isLoading } = useRecords();
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExistingActivity, setIsExistingActivity] = useState(false);

  const formattedStartTime = formatTime(activity.startTime);
  const formattedEndTime = formatTime(activity.endTime);
  const formattedDuration = formatDuration(activity.duration);

  const borderColor = useMemo(() => {
    switch (activity.rating) {
      case "1":
        return "border-red-700 border-2";
      case "2":
        return "border-orange-600 border-2";
      case "3":
        return "border-yellow-600 border-2";
      case "4":
        return "border-lime-700 border-2";
      case "5":
        return "border-teal-600 border-2";
      default:
        return "border-zinc-950 dark:border-zinc-50";
    }
  }, [activity.rating]);

  const focusLevel = useMemo(() => {
    switch (activity.focus) {
      case "Low":
        return <Frown className="text-blue-600 inline size-4 sm:size-5" />;
      case "Medium":
        return <Meh className="text-green-700 inline size-4 sm:size-5" />;
      case "High":
        return <Smile className="text-fuchsia-600 inline size-4 sm:size-5" />;
      default:
        return (
          <CircleDashed className="text-zinc-950 dark:text-zinc-50 inline  sm:size-5" />
        );
    }
  }, [activity.focus]);

  return (
    <div
      className={`relative border rounded-sm p-2 sm:p-4 text-sm sm:text-base leading-5 sm:leading-6 ${borderColor}`}
    >
      {isLoading.activityRating && (
        <div className="absolute top-4 right-4">
          <Spinner size={24} />
        </div>
      )}
      <p className="font-semibold">
        {formattedStartTime} - {formattedEndTime} ({formattedDuration})
      </p>
      <p>
        <span className="italic font-light">{activity.description}</span> /{" "}
        <span className="font-medium">{activity.category} </span>
      </p>
      <p>
        <span className="font-medium"> Energy/Focus:</span> {focusLevel} (
        {activity.focus})
      </p>
      {activity.notes && (
        <p>
          <span className="font-medium">Notes: </span>{" "}
          <span className="italic font-light">{activity.notes}</span>
        </p>
      )}
      {activity.multitasking && <p className="underline">Multitasking</p>}
      {activity.distracted && (
        <p className="underline">Interrupted/Distracted</p>
      )}
      <div className="flex flex-col xs:flex-row justify-between flex-wrap">
        <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 mb-2 xs:mb-0">
          <p className="font-medium">Time use rating:</p>
          <Rating id={activity.id} rating={activity.rating} />
        </div>
        <div className="flex gap-2 place-self-end">
          <Button
            version="version4"
            onClick={() => {
              setIsExistingActivity(true);
              setIsEditModalOpen(true);
            }}
          >
            <SquarePen className="size-5 xs:size-6" />
          </Button>
          <Button version="version4" onClick={() => setDeleteBoxOpen(true)}>
            <Trash2 className="size-5 xs:size-6" />
          </Button>
        </div>
      </div>
      {deleteBoxOpen && (
        <div className="absolute top-0 right-0 z-10">
          <DeleteConfirmation
            setDeleteBoxOpen={setDeleteBoxOpen}
            id={activity.id}
            date={activity.date}
            recordType="activity"
            label="the activity record"
          />
        </div>
      )}
      <ActivityForm
        isOpen={isEditModalOpen}
        buttonLabel="Save changes"
        isExisting={isExistingActivity}
        onClose={() => {
          setIsEditModalOpen(false);
          setIsExistingActivity(false);
        }}
        date={activity.date}
        dateId={activity.id}
        existingActivity={activity}
      />
    </div>
  );
}

export default React.memo(ActivityRecord);
