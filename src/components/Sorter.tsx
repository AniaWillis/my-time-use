import { ArrowDown01, ArrowUp10 } from "lucide-react";

import Button from "./Button";

import { SorterProps } from "../types/components";

function Sorter({ sortBy, sortAsc, sortDesc }: SorterProps) {
  return (
    <div className="flex justify-end pt-2 text-sm sm:text-base items-center">
      <p className="font-body pr-3">Sort by {sortBy}:</p>
      <div className="flex gap-2">
        <Button version="version4" onClick={sortAsc}>
          <ArrowDown01 className="size-5 sm:size-6" />
        </Button>

        <Button version="version4" onClick={sortDesc}>
          <ArrowUp10 className="size-5 sm:size-6" />
        </Button>
      </div>
    </div>
  );
}

export default Sorter;
