import { InsightsState, InsightsAction } from "../../types/insights_context";

export const initialInsightsState: InsightsState = {
  isLoadingInsights: false,
  userInsights: [],
};

export function insightsReducer(
  state: InsightsState,
  action: InsightsAction
): InsightsState {
  switch (action.type) {
    case "loading/insights":
      return { ...state, isLoadingInsights: true };
    case "insights/loaded":
      return {
        ...state,
        isLoadingInsights: false,
        userInsights: action.payload.userInsights,
      };
    case "insight/created":
      return {
        ...state,
        isLoadingInsights: false,
        userInsights: [...state.userInsights, action.payload],
      };
    case "insight/updated":
      return {
        ...state,
        isLoadingInsights: false,
        userInsights: state.userInsights.map((insight) =>
          insight.id === action.payload.id
            ? {
                ...insight,
                ...action.payload,
              }
            : insight
        ),
      };
    case "insight/deleted":
      return {
        ...state,
        isLoadingInsights: false,
        userInsights: state.userInsights.filter(
          (insight) => insight.id !== action.payload
        ),
      };

    default:
      throw new Error("Unknown insights action type");
  }
}
