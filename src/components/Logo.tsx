import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/">
      <div className="flex gap-2 p-2 items-center">
        <img
          src="/iconmonstr-calendar-9-240.png"
          alt="Calendar and clock icon"
          className="h-6"
        />
        <p className="font-heading font-semibold text-cyan-600 text-lg sm:text-xl">
          my timeUse
        </p>
      </div>
    </Link>
  );
}

export default Logo;
