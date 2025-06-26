import useRecords from "../hooks/useRecords";

import { RatingProps } from "../types/components";

function Rating({ id, rating }: RatingProps) {
  const { rateActivity } = useRecords();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const value = e.target.value;
    rateActivity(id, value);
  }

  return (
    <select
      className="border rounded-sm text-sm sm:text-base bg-zinc-50 dark:bg-zinc-950 "
      onChange={handleChange}
      value={rating}
      id={`rating-select-${id}`}
    >
      <option id="rating-select-0" value=""></option>
      <option value="1" className="text-red-700 font-normal">
        1 - Very Inefficient
      </option>
      <option value="2" className="text-orange-600 font-normal">
        2 - Somewhat Inefficient
      </option>
      <option value="3" className="text-yellow-600 font-normal">
        3 - Average
      </option>
      <option value="4" className="text-lime-700 font-normal">
        4 - Somewhat Efficient
      </option>
      <option value="5" className="text-teal-600 font-normal">
        5 - Highly Efficient
      </option>
    </select>
  );
}

export default Rating;
