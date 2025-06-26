import { createContext } from "react";

import { InsightsContextType } from "../../types/insights_context";

export const InsightsContext = createContext<InsightsContextType | undefined>(
  undefined
);
