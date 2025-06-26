import { SquareCheckBigIcon, SquarePen, Trash2 } from "lucide-react";

import useInsights from "../../hooks/useInsights";
import { ListItemProps } from "../../types/insights";

function ListItem({
  content,
  currentUpdateId,
  onInputUpdate,
  onUpdate,
  onUpdateId,
}: ListItemProps) {
  const { deleteListItem } = useInsights();

  function handleDeleteListItem() {
    deleteListItem(content.id);
  }

  function handleUpdateItem() {
    onInputUpdate(content.text);
    onUpdate(true);
    onUpdateId(content.id);
  }

  return (
    <div className="flex font-body justify-between w-full border-b border-b-cyan-600 p-1 sm:p-2 text-sm sm:text-base">
      <div className="flex gap-2 items-center">
        <SquareCheckBigIcon className="size-4 text-cyan-600 shrink-0" />
        <p
          className={`grow whitespace-normal break-words italic ${
            currentUpdateId === content.id
              ? "text-neutral-400 dark:text-neutral-600"
              : ""
          }`}
        >
          {content.text}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          className="cursor-pointer hover:scale-105"
          onClick={handleUpdateItem}
        >
          <SquarePen className="size-5 sm:size-6" />
        </button>
        <button
          className="cursor-pointer hover:scale-105"
          onClick={handleDeleteListItem}
          disabled={currentUpdateId === content.id}
        >
          <Trash2 className="size-5 sm:size-6" />
        </button>
      </div>
    </div>
  );
}

export default ListItem;
