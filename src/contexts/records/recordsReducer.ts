import { RecordsState, RecordsAction } from "../../types/records_context";

export const initialState: RecordsState = {
  dailyRecords: [],
  activities: [],
  isLoading: {
    fetch: false,
    daily: false,
    activity: false,
    activityRating: false,
  },
  stats: {
    summary: null,
    isLoadingStats: false,
    statsError: null,
  },
};

export function reducer(
  state: RecordsState,
  action: RecordsAction
): RecordsState {
  switch (action.type) {
    case "loading/fetch":
      return { ...state, isLoading: { ...state.isLoading, fetch: true } };
    case "loading/daily":
      return { ...state, isLoading: { ...state.isLoading, daily: true } };
    case "loading/activity":
      return { ...state, isLoading: { ...state.isLoading, activity: true } };
    case "loading/activityRating":
      return {
        ...state,
        isLoading: { ...state.isLoading, activityRating: true },
      };
    case "records/loaded":
      return {
        ...state,
        isLoading: { ...state.isLoading, fetch: false },
        dailyRecords: action.payload.dailyRecords,
        activities: action.payload.activities,
      };
    case "stats/loaded":
      return {
        ...state,
        stats: {
          ...state.stats,
          summary: action.payload,
        },
      };

    case "day/created":
      return {
        ...state,
        isLoading: { ...state.isLoading, daily: false },
        dailyRecords: [...state.dailyRecords, action.payload],
      };

    case "day/updated":
      return {
        ...state,
        isLoading: { ...state.isLoading, daily: false },
        dailyRecords: state.dailyRecords.map((day) =>
          day.id === action.payload.id
            ? { ...day, date: action.payload.date }
            : day
        ),
        activities: state.activities.map((activity) =>
          activity.dateId === action.payload.id
            ? { ...activity, date: action.payload.date }
            : activity
        ),
      };

    case "day/deleted":
      return {
        ...state,
        isLoading: { ...state.isLoading, daily: false },
        dailyRecords: state.dailyRecords.filter(
          (record) => record.id !== action.payload
        ),
        activities: state.activities.filter(
          (activity) => activity.dateId !== action.payload
        ),
      };

    case "activity/created":
      return {
        ...state,
        isLoading: { ...state.isLoading, activity: false },
        activities: [...state.activities, action.payload],
      };

    case "activity/rated":
      return {
        ...state,
        isLoading: { ...state.isLoading, activityRating: false },
        activities: state.activities.map((activity) =>
          activity.id === action.payload.activityId
            ? {
                ...activity,
                rating: action.payload.rating,
              }
            : activity
        ),
      };

    case "activity/updated":
      return {
        ...state,
        isLoading: { ...state.isLoading, activityRating: false },
        activities: state.activities.map((activity) =>
          activity.id === action.payload.id
            ? {
                ...activity,
                ...action.payload,
              }
            : activity
        ),
      };

    case "activity/deleted":
      return {
        ...state,
        isLoading: { ...state.isLoading, activity: false },
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
      };
    case "all/deleted":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}
