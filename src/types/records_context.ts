import { ReactNode } from "react";
import { DayRecord, Activity } from "./records";

export interface RecordsProviderProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  authLoading?: boolean;
}

export interface StatsSummary {
  totalDays: number;
  totalHours: number;
  recordedActivitiesTime: number;
  recordedActivitiesNumber: number;
  avgActPerDay: number;
}

export interface StatsState {
  summary: StatsSummary | null;
  isLoadingStats: boolean;
  statsError: string | null;
}

export interface RecordsState {
  dailyRecords: DayRecord[];
  activities: Activity[];
  isLoading: {
    fetch: boolean;
    daily: boolean;
    activity: boolean;
    activityRating: boolean;
  };
  stats: StatsState;
}

export type RecordsAction =
  | { type: "loading/fetch" }
  | { type: "loading/daily" }
  | { type: "loading/activity" }
  | { type: "loading/activityRating" }
  | {
      type: "records/loaded";
      payload: { dailyRecords: DayRecord[]; activities: Activity[] };
    }
  | { type: "stats/loaded"; payload: StatsSummary }
  | { type: "day/created"; payload: DayRecord }
  | { type: "day/updated"; payload: DayRecord }
  | { type: "day/deleted"; payload: string }
  | { type: "activity/created"; payload: Activity }
  | {
      type: "activity/rated";
      payload: { activityId: string; rating: string };
    }
  | { type: "activity/updated"; payload: Activity }
  | { type: "activity/deleted"; payload: string }
  | { type: "all/deleted" };

export interface RecordsContextType extends RecordsState {
  categories: string[];
  existingDates: string[];
  dispatch: React.Dispatch<RecordsAction>;
  createDateRecord: (newRecord: DayRecord) => void;
  updateDate: (newDate: string, id: string) => void;
  deleteDailyRecord: (id: string) => void;
  addActivity: (newActivity: Activity) => void;
  rateActivity: (activityId: string, rating: string) => void;
  updateActivity: (updatedActivity: Activity) => void;
  deleteActivity: (id: string) => void;
  deleteAllRecords: () => void;
  calculateStats: () => void;
}
