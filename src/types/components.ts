import { ReactNode } from "react";
import { Activity } from "./records";

export interface LayoutProps {
  children: ReactNode;
}

export interface ButtonProps {
  children?: ReactNode;
  label?: string | ReactNode;
  textSize?: string;
  version: "version1" | "version2" | "version3" | "version4";
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => void;
}

export interface SpinnerProps {
  size: number;
}

export interface ActivityFormProps {
  existingActivity?: Activity;
  isExisting?: boolean;
  isOpen: boolean;
  buttonLabel: string;
  date: string;
  dateId: string;
  onClose: () => void;
}

export interface DateSelectorProps {
  buttonLabel: string;
  dateId?: string;
  text: string;
  onClick: (date: string, id?: string) => void;
}

export interface DeleteConfirmationProps {
  date?: string;
  id: string;
  label: string;
  recordType: string;
  setDeleteBoxOpen: (val: boolean) => void;
}

export interface RatingProps {
  id: string;
  rating: string;
}

export interface SorterProps {
  sortBy: string;
  sortAsc: () => void;
  sortDesc: () => void;
}
