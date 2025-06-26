import { useRef } from "react";

import Button from "./Button";

import { DateSelectorProps } from "../types/components";

function DateSelector({
  buttonLabel,
  dateId,
  text,
  onClick,
}: DateSelectorProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    const dateValue = dateInputRef.current?.value;
    if (!dateValue) return;
    onClick(dateValue, dateId);
    if (dateInputRef.current) {
      dateInputRef.current.value = "";
    }
  }

  return (
    <div className="w-full flex flex-col justify-between items-center flex-wrap gap-2 sm:gap-4 ">
      <label htmlFor="date" className="font-body text-sm sm:text-base">
        {text}
      </label>

      <div className="flex gap-6">
        <input
          type="date"
          id="date"
          ref={dateInputRef}
          className="border p-1 sm:p-1.5 rounded-sm bg-neutral-300 dark:bg-neutral-700 text-zinc-950 dark:text-zinc-50"
        />
        <Button
          textSize="sm:text-lg text-base"
          label={buttonLabel}
          version="version1"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default DateSelector;
