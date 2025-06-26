import { RATING_LABELS } from "../constants/ratingLabels";
import { Activity, DayRecord } from "../types/records";

export function calculateSummary(
  dailyRecords: DayRecord[],
  activities: Activity[]
) {
  const daysNumber = dailyRecords.length;
  const totalHours = daysNumber * 24;
  const totalRecordedTime = activities
    .map((a) => a.duration)
    .reduce((acc, dur) => acc + dur, 0);
  const activitiesNumber = activities.length;
  const avgActPerDay =
    daysNumber === 0 || activitiesNumber === 0
      ? 0
      : Number(
          (activitiesNumber / daysNumber).toFixed(2).replace(/\.?0+$/, "")
        );

  return {
    totalDays: daysNumber,
    totalHours: totalHours,
    recordedActivitiesTime: totalRecordedTime,
    recordedActivitiesNumber: activitiesNumber,
    avgActPerDay: avgActPerDay,
  };
}

export function calculateDurationPerCategory(activities: Activity[]) {
  const categoryDuration: { [key: string]: number } = {};

  activities.forEach((activity) => {
    const category = activity.category;
    if (category) {
      categoryDuration[category] =
        (categoryDuration[category] || 0) + activity.duration;
    }
  });
  return categoryDuration;
}

export function calculateTimeEfficiency(activities: Activity[]) {
  const timeEfficiencyRating: { [key: string]: number } = {};

  // Initialize all possible keys to 0
  for (const key in RATING_LABELS) {
    timeEfficiencyRating[RATING_LABELS[key]] = 0;
  }

  activities.forEach((activity) => {
    const rating = activity.rating || "Unrated";
    const label = RATING_LABELS[rating] || "Unrated";
    timeEfficiencyRating[label] += activity.duration;
  });

  return timeEfficiencyRating;
}

export function calculateActivityEfficiency(activities: Activity[]) {
  const activityEfficiencyRating: { [key: string]: number } = {};

  for (const key in RATING_LABELS) {
    activityEfficiencyRating[RATING_LABELS[key]] = 0;
  }

  activities.forEach((activity) => {
    const rating = activity.rating || "Unrated";
    const label = RATING_LABELS[rating] || "Unrated";
    activityEfficiencyRating[label]++;
  });

  return activityEfficiencyRating;
}

export function calculateFocusTime(activities: Activity[]) {
  const focusTime: { [key: string]: number } = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  activities.forEach((activity) => {
    const focus = activity.focus;

    focusTime[focus] += activity.duration;
  });
  return focusTime;
}

export function calculateFocusPerActivity(activities: Activity[]) {
  const focusPerActivity: { [key: string]: number } = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  activities.forEach((activity) => {
    const focus = activity.focus;

    focusPerActivity[focus]++;
  });
  return focusPerActivity;
}

export function calculateMultitaskingNumber(activities: Activity[]) {
  let multitaskingNumber = 0;

  activities.forEach((activity) => {
    if (activity.multitasking) multitaskingNumber++;
  });
  return multitaskingNumber;
}

export function calculateDistractedNumber(activities: Activity[]) {
  let distractedNumber = 0;

  activities.forEach((activity) => {
    if (activity.distracted) distractedNumber++;
  });
  return distractedNumber;
}

export function getShortestDuration(activities: Activity[]): number {
  if (activities.length === 0) return 0;
  return Math.min(...activities.map((a) => a.duration));
}

export function getLongestDuration(activities: Activity[]): number {
  if (activities.length === 0) return 0;
  return Math.max(...activities.map((a) => a.duration));
}

export function areAllValuesZero(
  data: {
    name: string;
    value: number;
    color?: string;
    label?: string;
  }[]
): boolean {
  return data.every((item) => item.value === 0);
}
