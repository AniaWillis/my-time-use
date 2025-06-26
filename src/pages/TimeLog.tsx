import { useState } from "react";
import { Trash2 } from "lucide-react";

import Button from "../components/Button";
import DailyRecordsList from "../components/DailyRecordsList";
import DeleteConfirmation from "../components/DeleteConfirmation";
import Spinner from "../components/Spinner";

import useRecords from "../hooks/useRecords";

function TimeLog() {
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);

  const { isLoading, existingDates } = useRecords();
  const btnLabel = (
    <>
      <span className="flex items-center gap-1">
        <Trash2 className="text-red-600 size-4 sm:size-5" /> Delete all records
      </span>
    </>
  );

  return (
    <div className="relative pb-24 md:pb-20">
      {isLoading.fetch && (
        <div className="flex mt-24">
          <Spinner size={125} />
        </div>
      )}
      <DailyRecordsList />
      {existingDates.length > 1 && (
        <div className="flex justify-center my-6 absolute bottom-0.5 right-0 sm:right-6">
          <Button
            textSize="sm:text-lg text-base"
            label={btnLabel}
            version="version3"
            onClick={() => setDeleteBoxOpen(true)}
          />
        </div>
      )}

      {deleteBoxOpen && (
        <div className="absolute bottom-2 right-2 sm:right-6 z-10">
          <DeleteConfirmation
            setDeleteBoxOpen={setDeleteBoxOpen}
            id="all"
            date="all"
            recordType="all"
            label="all the records"
          />
        </div>
      )}
    </div>
  );
}

export default TimeLog;
