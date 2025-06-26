import { createContext } from "react";

import { RecordsContextType } from "../../types/records_context";

export const RecordsContext = createContext<RecordsContextType | undefined>(
  undefined
);
