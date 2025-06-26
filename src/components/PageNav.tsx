import { Link, NavLink } from "react-router";
import { User } from "lucide-react";

import Button from "./Button";
import Logo from "./Logo";

import useAuth from "../hooks/useAuth";

function PageNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const userName = user?.user_metadata?.first_name || "Guest";

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-auto flex justify-between items-center lg:shrink-0 mb-4 lg:mb-0">
        <Logo />

        <div className="lg:hidden">
          {isAuthenticated ? (
            <Button
              textSize="text-base sm:text-lg"
              label="Log out"
              version="version3"
              onClick={logout}
            />
          ) : (
            <Link to="/login">
              <Button
                textSize="text-base sm:text-lg"
                label={"Login"}
                version={"version3"}
              />
            </Link>
          )}
        </div>
      </div>

      <nav className="w-full lg:w-auto lg:grow lg:flex lg:justify-center text-base sm:text-lg">
        <ul className="flex flex-wrap justify-center gap-y-2 gap-x-8 lg:gap-8">
          <li className="hover:text-cyan-600">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="hover:text-cyan-600">
            <NavLink
              to="/how-it-works"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              How It Works
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="hover:text-cyan-600">
                <NavLink
                  to="/time-log"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  Time Log
                </NavLink>
              </li>
              <li className="hover:text-cyan-600">
                <NavLink
                  to="/stats"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  Stats
                </NavLink>
              </li>
              <li className="hover:text-cyan-600">
                <NavLink
                  to="/review"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  Review
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="hidden lg:flex items-center gap-6">
        {isAuthenticated && (
          <div className="flex gap-1 px-6 text-lg font-semibold">
            <User className="text-cyan-600" />
            <p>{userName}</p>
          </div>
        )}

        <div className="hidden lg:block">
          {isAuthenticated ? (
            <Button
              textSize="text-base sm:text-lg"
              label="Log out"
              version="version3"
              onClick={logout}
            />
          ) : (
            <Link to="/login">
              <Button
                textSize="text-base sm:text-lg"
                label={"Login"}
                version={"version3"}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageNav;
