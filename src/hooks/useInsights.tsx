import { useContext } from "react";

import { InsightsContext } from "../contexts/insights/InsightsContext";

import { InsightsContextType } from "../types/insights_context";

function useInsights(): InsightsContextType {
  const context = useContext(InsightsContext);
  if (!context)
    throw new Error("useInsights must be used within the InsightsProvider");
  return context;
}
export default useInsights;
