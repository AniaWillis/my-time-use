import { useContext } from "react";

import { RecordsContext } from "../contexts/records/RecordsContext";

import { RecordsContextType } from "../types/records_context";

function useRecords(): RecordsContextType {
  const context = useContext(RecordsContext);
  if (!context)
    throw new Error("useRecords must be used within the RecordsProvider");
  return context;
}

export default useRecords;
