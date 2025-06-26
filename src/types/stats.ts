import { Activity } from "./records";

export interface CategoriesChartProps {
  records: Activity[];
  time: number;
}

export interface EfficiencyChartProps {
  data: { name: string; value: number; color: string; label: string }[];
}

export interface LegendItem {
  color: string;
  label: string;
  name: string;
  value: number;
}

export interface CustomLegendProps {
  data: LegendItem[];
}

export interface EfficiencyStatsProps {
  records: Activity[];
  totalTime: number;
}

export interface FocusStatsProps {
  records: Activity[];
  totalTime: number;
}

export interface TimeAccountedProps {
  accountedTime: number;
  numberOfDays: number;
}

export interface TimeFrameSelectorProps {
  daysToShow: string;
  checkedDates: string[];
  onCheckboxChange: (dates: string[]) => void;
  onDaysToShowChange: (val: string) => void;
}

export interface TimeframeSummaryProps {
  accountedTime: number;
  distractedNumber: number;
  longestDuration: number;
  multitaskingNumber: number;
  numberOfActivities: number;
  numberOfDays: number;
  shortestDuration: number;
}
