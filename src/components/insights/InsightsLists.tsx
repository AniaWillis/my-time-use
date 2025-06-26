import { useMemo } from "react";

import { INSIGHTS_LISTS } from "../../constants/insightsLists";

import InsightsList from "./InsightsList";
import Spinner from "../Spinner";

import useInsights from "../../hooks/useInsights";

function InsightsLists() {
  const { isLoadingInsights, userInsights } = useInsights();

  const renderedInsightLists = useMemo(() => {
    return INSIGHTS_LISTS.map((list) => {
      const matchingItems = userInsights.filter(
        (insight) => insight.listCategory === list.listCategory
      );
      return (
        <InsightsList
          key={list.listCategory}
          listItems={matchingItems}
          title={list.title}
          listCategory={list.listCategory}
          explanation={list.explanation}
        />
      );
    });
  }, [userInsights]);
  return (
    <>
      <div className="flex">
        {" "}
        <div className="flex flex-col gap-4 sm:gap-6 items-center relative grow sm:-mr-6">
          <h2 className=" w-full font-heading text-cyan-600 font-semibold text-xl sm:text-2xl text-center my-1 sm:my-2">
            Priorities, Insights and Goals - User's Lists
          </h2>{" "}
          {renderedInsightLists}
        </div>
        <div className="sticky top-6 w-9 h-fit shrink-0">
          {isLoadingInsights && <Spinner size={36} />}
        </div>
      </div>
    </>
  );
}

export default InsightsLists;
