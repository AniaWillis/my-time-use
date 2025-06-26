import Button from "./Button";

import { DeleteConfirmationProps } from "../types/components";

import useRecords from "../hooks/useRecords";

function DeleteConfirmation({
  id,
  label,
  recordType,
  setDeleteBoxOpen,
}: DeleteConfirmationProps) {
  const { deleteDailyRecord, deleteActivity, deleteAllRecords } = useRecords();

  function handleDeleteRecord(id: string, recordType: string) {
    if (recordType === "daily") deleteDailyRecord(id);
    if (recordType === "activity") deleteActivity(id);
    if (recordType === "all") deleteAllRecords();
    setDeleteBoxOpen(false);
  }

  return (
    <div className="flex flex-col w-fit max-w-full gap-2 sm:gap-3 p-2 sm:p-4 rounded-sm border-double border-4 bg-neutral-300 dark:bg-neutral-700 z-10">
      <p className="font-body text-sm sm:text-base text-center">
        Are you sure you want to delete {label}?
      </p>
      <div className="flex justify-around">
        <Button
          textSize="text-sm sm:text-base"
          label="Cancel"
          version="version1"
          onClick={() => setDeleteBoxOpen(false)}
        />
        <Button
          textSize="text-sm sm:text-base"
          label="Delete"
          version="version2"
          onClick={() => handleDeleteRecord(id, recordType)}
        />
      </div>
    </div>
  );
}

export default DeleteConfirmation;
