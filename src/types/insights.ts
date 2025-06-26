import { Insight } from "./insights_context";

export interface InsightsListProps {
  listItems: Insight[];
  title: string;
  listCategory: string;
  explanation: string;
}

export interface ListItemProps {
  isUpdate: boolean;
  content: Insight;
  currentUpdateId: string;
  onInputUpdate: (val: string) => void;
  onUpdate: (val: boolean) => void;
  onUpdateId: (val: string) => void;
}
