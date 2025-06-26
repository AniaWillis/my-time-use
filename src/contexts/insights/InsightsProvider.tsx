import { useCallback, useEffect, useReducer } from "react";

import { toast } from "react-toastify";

import { InsightsContext } from "./InsightsContext";
import { insightsReducer, initialInsightsState } from "./insightsReducer";

import {
  createListItemApi,
  deleteListItemApi,
  fetchInsightsDataApi,
  updateListItemApi,
} from "../../services/insightsApi";

import { Insight, InsightsProviderProps } from "../../types/insights_context";

function InsightsProvider({
  children,
  isAuthenticated,
  authLoading,
}: InsightsProviderProps) {
  const [{ isLoadingInsights, userInsights }, dispatch] = useReducer(
    insightsReducer,
    initialInsightsState
  );

  useEffect(
    function () {
      async function loadInsightsData() {
        dispatch({ type: "loading/insights" });
        try {
          const { userInsights } = await fetchInsightsDataApi();
          dispatch({
            type: "insights/loaded",
            payload: {
              userInsights,
            },
          });
        } catch {
          toast.error("There was an error loading user's lists.");
        }
      }
      if (isAuthenticated && !authLoading) {
        loadInsightsData();
      }
    },
    [isAuthenticated, authLoading]
  );

  const createListItem = useCallback(async (newItem: Insight) => {
    dispatch({ type: "loading/insights" });
    try {
      const data = await createListItemApi(newItem);
      dispatch({
        type: `insight/created`,
        payload: data,
      });
    } catch {
      toast.error("Failed to create a new list item.");
    }
  }, []);

  const updateListItem = useCallback(async (updatedItem: Insight) => {
    dispatch({ type: "loading/insights" });
    try {
      const data = await updateListItemApi(updatedItem);
      dispatch({
        type: `insight/updated`,
        payload: data,
      });
    } catch {
      toast.error("Failed to update the list item.");
    }
  }, []);

  const deleteListItem = useCallback(async (id: string) => {
    dispatch({ type: "loading/insights" });
    try {
      await deleteListItemApi(id);
      dispatch({
        type: "insight/deleted",
        payload: id,
      });
    } catch {
      toast.error("Failed to delete the list item.");
    }
  }, []);

  return (
    <InsightsContext.Provider
      value={{
        isLoadingInsights,
        userInsights,
        dispatch,
        createListItem,
        deleteListItem,
        updateListItem,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
}

export { InsightsProvider };
