import { useCallback, useEffect, useMemo, useReducer } from "react";

import { toast } from "react-toastify";

import { INIT_CATEGORIES } from "../../constants/initCategories";

import {
  addActivityApi,
  createDateRecordApi,
  deleteActivityApi,
  deleteAllRecordsApi,
  deleteDailyRecordApi,
  fetchAllRecords,
  rateActivityApi,
  updateActivityApi,
  updateDateApi,
} from "../../services/recordsApi";

import { RecordsContext } from "./RecordsContext";
import { calculateSummary } from "../../utils/statsHelpers";

import { Activity, DayRecord } from "../../types/records";
import { RecordsProviderProps } from "../../types/records_context";

import { initialState, reducer } from "./recordsReducer";

function RecordsProvider({
  children,
  isAuthenticated,
  authLoading,
}: RecordsProviderProps) {
  const [{ activities, dailyRecords, stats, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...INIT_CATEGORIES,
          ...activities.map((activity: Activity) => activity.category),
        ])
      ),
    [activities]
  );

  const existingDates = useMemo(
    () => dailyRecords.map((record) => record.date),
    [dailyRecords]
  );

  useEffect(
    function () {
      async function loadData() {
        dispatch({ type: "loading/fetch" });
        try {
          const { dailyRecords, activities } = await fetchAllRecords();
          dispatch({
            type: "records/loaded",
            payload: { dailyRecords, activities },
          });
        } catch {
          toast.error("There was an error loading data");
        }
      }

      if (isAuthenticated && !authLoading) {
        loadData();
      }
    },
    [isAuthenticated, authLoading]
  );

  const createDateRecord = useCallback(async (newDay: DayRecord) => {
    dispatch({ type: "loading/daily" });
    try {
      const data = await createDateRecordApi(newDay);
      dispatch({ type: "day/created", payload: data });
      toast.success("New date record created.");
    } catch {
      toast.error("Failed to create a new date record.");
    }
  }, []);

  const updateDate = useCallback(async (date: string, id: string) => {
    dispatch({ type: "loading/daily" });
    try {
      const updatedDay = await updateDateApi(date, id);
      dispatch({
        type: "day/updated",
        payload: updatedDay,
      });
      toast.success("Date successfully updated.");
    } catch {
      toast.error("Failed to update the date.");
    }
  }, []);

  const deleteDailyRecord = useCallback(async (id: string) => {
    dispatch({ type: "loading/daily" });
    try {
      await deleteDailyRecordApi(id);
      dispatch({ type: "day/deleted", payload: id });
      toast.success("Date and associated activities were deleted.");
    } catch {
      toast.error(
        "There was an error deleting the daily record or associated activities."
      );
    }
  }, []);

  const addActivity = useCallback(async (newActivity: Activity) => {
    dispatch({ type: "loading/activity" });
    try {
      const data = await addActivityApi(newActivity);
      dispatch({ type: "activity/created", payload: data });
      toast.success("New activity added.");
    } catch {
      toast.error("Failed to add a new activity.");
    }
  }, []);

  const rateActivity = useCallback(
    async (activityId: string, rating: string) => {
      dispatch({ type: "loading/activityRating" });
      try {
        await rateActivityApi(activityId, rating);
        dispatch({
          type: "activity/rated",
          payload: { activityId, rating },
        });
        toast.success("Activity rating updated.");
      } catch {
        toast.error("Failed to update the activity rating.");
      }
    },
    []
  );

  const updateActivity = useCallback(async (updatedActivity: Activity) => {
    dispatch({ type: "loading/activityRating" });
    try {
      const data = await updateActivityApi(updatedActivity);
      dispatch({
        type: "activity/updated",
        payload: data,
      });
      toast.success("Activity updated.");
    } catch {
      toast.error("Failed to update the activity.");
    }
  }, []);

  const deleteActivity = useCallback(async (id: string) => {
    dispatch({ type: "loading/activity" });
    try {
      await deleteActivityApi(id);
      dispatch({ type: "activity/deleted", payload: id });
      toast.success("Activity deleted.");
    } catch {
      toast.error("Failed to delete the activity.");
    }
  }, []);

  const deleteAllRecords = useCallback(async () => {
    dispatch({ type: "loading/fetch" });
    try {
      await deleteAllRecordsApi();
      dispatch({ type: "all/deleted" });
      toast.success("All records deleted.");
    } catch {
      toast.error("Failed to delete all records.");
    }
  }, []);

  const calculateStats = useCallback(async () => {
    try {
      const summary = calculateSummary(dailyRecords, activities);
      dispatch({ type: "stats/loaded", payload: summary });
    } catch {
      toast.error("Stats could not be calculated.");
    }
  }, [dailyRecords, activities]);

  return (
    <RecordsContext.Provider
      value={{
        dailyRecords,
        activities,
        isLoading,
        stats,
        categories,
        existingDates,
        dispatch,
        createDateRecord,
        updateDate,
        deleteDailyRecord,
        addActivity,
        rateActivity,
        updateActivity,
        deleteActivity,
        deleteAllRecords,
        calculateStats,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export { RecordsProvider };
