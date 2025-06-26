import { ReactNode } from "react";

export interface Insight {
  id: string;
  text: string;
  user_id: string;
  listCategory: string;
}

export interface InsightsContextType extends InsightsState {
  dispatch: React.Dispatch<InsightsAction>;
  createListItem: (newItem: Insight) => void;
  deleteListItem: (id: string) => void;
  updateListItem: (updatedItem: Insight) => void;
}

export interface InsightsState {
  isLoadingInsights: boolean;
  userInsights: Insight[];
}

export interface InsightsProviderProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  authLoading?: boolean;
}

export type InsightsAction =
  | { type: "loading/insights" }
  | { type: "insights/loaded"; payload: { userInsights: Insight[] } }
  | { type: "insight/created"; payload: Insight }
  | { type: "insight/updated"; payload: Insight }
  | { type: "insight/deleted"; payload: string };
