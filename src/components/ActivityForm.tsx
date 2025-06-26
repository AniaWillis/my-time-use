import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import { toast } from "react-toastify";

import Button from "./Button";
import styles from "./ActivityForm.module.css";

import useRecords from "../hooks/useRecords";

import { ActivityFormProps } from "../types/components";

import { supabase } from "../auth/supabase-client";

import { formatDate } from "../utils/dateUtils";
import {
  calculateDurationInMinutes,
  calculateTimeMinutes,
  formatTime,
} from "../utils/timeUtils";

const modalRoot = document.getElementById("modal");

function ActivityForm({
  isExisting,
  isOpen,
  buttonLabel,
  date,
  dateId,
  existingActivity,
  onClose,
}: ActivityFormProps): ReactElement | null {
  const { addActivity, updateActivity, categories, activities } = useRecords();

  const activityTimesByDate = useMemo(
    () =>
      activities
        .filter((a) => a.date === date)
        .map((a) => [a.startTime, a.endTime, a.id]),
    [activities, date]
  );

  const [isNewCategory, setIsNewCategory] = useState(false);
  const formattedDate = useMemo(() => formatDate(date), [date]);

  const initialFormData = useMemo(
    () => ({
      startTime: "",
      endTime: "",
      description: "",
      category: "",
      newCategory: "",
      focus: "",
      notes: "",
      multitasking: false,
      distracted: false,
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (existingActivity) {
      setFormData({
        startTime: existingActivity.startTime,
        endTime: existingActivity.endTime,
        description: existingActivity.description,
        category: existingActivity.category,
        newCategory: "",
        focus: existingActivity.focus,
        notes: existingActivity.notes,
        multitasking: existingActivity.multitasking ?? false,
        distracted: existingActivity.distracted ?? false,
      });
    }
  }, [existingActivity]);

  const handleCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setIsNewCategory(value === "newCategory");
      setFormData((prev) => ({ ...prev, category: value }));
    },
    []
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, type, value } = e.target;

      if (type === "checkbox") {
        const { checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  function handleClose() {
    if (!existingActivity) setFormData(initialFormData);
    onClose();
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { startTime, endTime } = formData;

      if (calculateTimeMinutes(startTime) >= calculateTimeMinutes(endTime)) {
        toast.warning(
          "Please ensure the end time is later than the start time. To keep daily activity logs clear, avoid recording activities that span across midnight. For reference, 12:00 AM marks the beginning of a new day, and 11:59 PM is the end of the day."
        );

        return;
      }

      for (const act of activityTimesByDate) {
        const startMinutes = calculateTimeMinutes(startTime);
        const endMinutes = calculateTimeMinutes(endTime);
        const currentId = existingActivity?.id;
        const actStart = calculateTimeMinutes(act[0]);
        const actEnd = calculateTimeMinutes(act[1]);
        const actId = act[2];

        if (
          currentId !== actId &&
          ((startMinutes >= actStart && startMinutes <= actEnd) ||
            (endMinutes >= actStart && endMinutes <= actEnd) ||
            (startMinutes <= actStart && endMinutes >= actEnd))
        ) {
          toast.warning(
            `Activities cannot overlap. A previously recorded activity's start time is ${formatTime(
              act[0]
            )} and end time is ${formatTime(act[1])}`
          );
          return;
        }
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("Unable to get user info.");
        return;
      }

      const activityData = {
        ...formData,
        category: isNewCategory ? formData.newCategory : formData.category,
        duration: calculateDurationInMinutes(startTime, endTime),
        user_id: user.id,
      };

      if (existingActivity) {
        updateActivity({ ...existingActivity, ...activityData });
      } else {
        addActivity({
          id: crypto.randomUUID(),
          dateId,
          date,
          rating: "",
          ...activityData,
        });
      }

      setFormData(initialFormData);
      onClose();
    },
    [
      dateId,
      date,
      existingActivity,
      initialFormData,
      formData,
      isNewCategory,
      onClose,
      updateActivity,
      addActivity,
      activityTimesByDate,
    ]
  );

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full m-auto h-full backdrop-blur-xs"
      style={{ overflow: "hidden" }}
    >
      <div className=" flex flex-col border border-cyan-600 p-4 sm:p-8 rounded-sm bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 w-fit gap-2 sm:gap-4 min-w-[300px] text-base sm:text-lg">
        <div className="self-end mb-1 sm:mb-2">
          <Button
            textSize="text-base sm:text-lg"
            label="Exit form"
            version="version1"
            onClick={handleClose}
          />
        </div>
        <h3 className="font-heading text-lg sm:text-xl text-cyan-600 font-semibold text-center">
          {isExisting
            ? `Edit an activity from ${formattedDate}`
            : `Add a new activity for ${formattedDate}`}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 pt-2 sm:pt-4"
        >
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
            <div className="flex gap-3">
              <label className={styles.label} htmlFor="startTime">
                Start time:{" "}
              </label>
              <input
                required
                className={styles.inputField}
                type="time"
                name="startTime"
                id="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <label className={styles.label} htmlFor="endTime">
                End time:
              </label>
              <input
                required
                className={styles.inputField}
                type="time"
                name="endTime"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className={styles.label}>
              Description:
            </label>
            <input
              required
              className={styles.inputField}
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
            <div className="flex gap-3">
              <label htmlFor="" className={styles.label}>
                Energy/Focus:
              </label>
              <select
                required
                name="focus"
                id="focus"
                className={styles.inputField}
                value={formData.focus}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex gap-3">
              <label htmlFor="category" className={styles.label}>
                Category:
              </label>
              <select
                required
                name="category"
                id="category"
                className={styles.inputField}
                value={formData.category}
                onChange={handleCategory}
              >
                <option value=""></option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
                <option value="newCategory">Add category</option>
              </select>
            </div>
          </div>
          {isNewCategory && (
            <div id="categoryInputContainer" className="flex gap-3">
              <label htmlFor="newCategory" className={styles.label}>
                New category:
              </label>
              <input
                className={styles.inputField}
                type="text"
                id="newCategory"
                name="newCategory"
                value={formData.newCategory}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="notes" className={styles.label}>
              Notes (optional):
            </label>
            <textarea
              name="notes"
              id="notes"
              className={styles.inputField}
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex gap-2 mt-1">
            <div>
              <label htmlFor="multitasking" className={styles.label}>
                Multitasking (optional):
              </label>
            </div>
            <div>
              <input
                className="self-center"
                type="checkbox"
                id="multitasking"
                name="multitasking"
                checked={formData.multitasking}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label htmlFor="distracted" className={styles.label}>
              Interrupted/Distracted (optional):
            </label>
            <input
              className="self-center"
              type="checkbox"
              id="distracted"
              name="distracted"
              checked={formData.distracted}
              onChange={handleChange}
            />
          </div>

          <div className="self-center pt-5">
            <Button
              textSize="text-base sm:text-lg"
              label={buttonLabel}
              version="version2"
            />
          </div>
        </form>
      </div>
    </dialog>,
    modalRoot
  );
}

export default React.memo(ActivityForm);
