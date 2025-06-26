import { useEffect, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";

import Button from "../Button";
import ListItem from "./ListItem";

import useInsights from "../../hooks/useInsights";
import { InsightsListProps } from "../../types/insights";
import { supabase } from "../../auth/supabase-client";

function InsightsList({
  listItems,
  title,
  listCategory,
  explanation,
}: InsightsListProps) {
  const [isListOpen, setIsListOpen] = useState(() => {
    const stored = localStorage.getItem(`isListOpen-${listCategory}`);
    return stored ? stored === "true" : false;
  });
  const [inputValue, setInputValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState("");

  const { createListItem, updateListItem } = useInsights();

  const numberOfItems = listItems.length;

  useEffect(() => {
    localStorage.setItem(`isListOpen-${listCategory}`, String(isListOpen));
  }, [isListOpen, listCategory]);

  async function handleAddItem() {
    if (inputValue === "") return;
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      toast.error("Could not get user info.");
      return;
    }
    const newItem = {
      id: crypto.randomUUID(),
      text: inputValue,
      user_id: user.id,
      listCategory,
    };
    createListItem(newItem);
    setInputValue("");
  }

  async function handleUpdateItem() {
    if (!currentUpdateId) return;
    if (inputValue === "") return;
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      toast.error("Could not get user info.");
      return;
    }
    const updatedItem = {
      id: currentUpdateId,
      text: inputValue,
      user_id: user.id,
      listCategory,
    };
    updateListItem(updatedItem);
    setInputValue("");
    setIsUpdate(false);
    setCurrentUpdateId("");
  }

  return (
    <div className="max-w-[800px] w-full flex flex-col gap-2 border border-cyan-600  h-fit rounded-sm">
      <div className="flex flex-col bg-cyan-600/75 dark:bg-cyan-600 px-2">
        <div className="flex justify-between py-1 ">
          <h2 className="font-heading text-zinc-950 dark:text-zinc-50 text-lg sm:text-xl font-medium">
            {title}
          </h2>

          <Button
            onClick={() => setIsListOpen((prev) => !prev)}
            version="version4"
          >
            {isListOpen ? (
              <ChevronUp
                size={24}
                className=" text-zinc-950 dark:text-zinc-50 -translate-x-0.5"
              />
            ) : (
              <ChevronDown
                size={24}
                className=" text-zinc-950 dark:text-zinc-50 -translate-x-0.5"
              />
            )}
          </Button>
        </div>
        <div className="flex justify-between items-center pb-1 font-body font-light text-sm sm:text-base">
          <p>{explanation}</p>
          <span className="border rounded-full size-7 flex justify-center items-center shrink-0">
            {numberOfItems}
          </span>
        </div>
      </div>

      {isListOpen && (
        <div className="flex flex-col gap-4 px-2 sm:px-4 pb-2 sm:pb-4 ">
          <ul>
            {listItems.map((item) => (
              <ListItem
                key={item.id}
                content={item}
                onInputUpdate={setInputValue}
                onUpdate={setIsUpdate}
                onUpdateId={setCurrentUpdateId}
                isUpdate={isUpdate}
                currentUpdateId={currentUpdateId}
              />
            ))}
          </ul>
          <div className="flex flex-col xs:flex-row gap-1 xs:gap-2 xs:items-center text-sm sm:text-base font-body">
            <label htmlFor="newItem">
              {isUpdate ? "Update item:" : "New item:"}
            </label>
            <div className="flex gap-2 items-center text-sm sm:text-base font-body grow">
              <input
                type="text"
                value={inputValue}
                id="newItem"
                name="newItem"
                className="border rounded-sm bg-zinc-50 dark:bg-zinc-950 grow px-1 sm:px-2 py-0.5 sm:py-1"
                onChange={(e) => setInputValue(e.target.value)}
              />

              {isUpdate ? (
                <Button
                  textSize="text-sm sm:text-base"
                  label="Update"
                  version="version1"
                  onClick={handleUpdateItem}
                />
              ) : (
                <Button
                  textSize="text-sm sm:text-base"
                  label="Add"
                  version="version1"
                  onClick={handleAddItem}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsightsList;
