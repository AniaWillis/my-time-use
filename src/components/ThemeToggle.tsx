import { Moon, Laptop, Sun } from "lucide-react";
import Button from "./Button";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const { selectTheme } = useTheme();
  return (
    <div className="flex w-fit gap-2 py-4">
      <Button
        label={<Sun className="size-4 sm:size-5 " />}
        version="version3"
        onClick={() => selectTheme("light")}
      ></Button>
      <Button
        label={<Moon className="size-4 sm:size-5 " />}
        version="version3"
        onClick={() => selectTheme("dark")}
      ></Button>
      <Button
        label={<Laptop className="size-4 sm:size-5 " />}
        version="version3"
        onClick={() => selectTheme("system")}
      ></Button>
    </div>
  );
}

export default ThemeToggle;
