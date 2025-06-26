export interface Activity {
  id: string;
  dateId: string;
  user_id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  description: string;
  category: string;
  focus: string;
  notes: string;
  rating: string;
  distracted: boolean;
  multitasking: boolean;
}

export interface DayRecord {
  id: string;
  date: string;
  user_id: string;
}

export interface DailyRecordProps {
  record: DayRecord;
}

export interface ActivityRecordProps {
  activity: Activity;
}

export interface ActivityRecordsListProps {
  date: string;
  onModalOpen: (val: boolean) => void;
}

export type RecordsData = {
  activities: Activity[];
  dailyRecords: DayRecord[];
};
