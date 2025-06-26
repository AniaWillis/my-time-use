import clsx from "clsx";
import { ButtonProps } from "../types/components";

function Button({ children, label, textSize, version, onClick }: ButtonProps) {
  const buttonStyles: { [key in ButtonProps["version"]]: string } = {
    version1:
      "py-1 px-3 sm:px-4 border-2 rounded-sm border-cyan-600 hover:shadow-cyan-600/25",
    version2:
      "py-1 px-3 sm:px-4 border-2 rounded-sm bg-cyan-600 text-white border-cyan-600 hover:shadow-cyan-600/25",
    version3:
      "py-1 px-3 sm:px-4 border-2 rounded-sm bg-zinc-950 dark:bg-zinc-50 border-zinc-950 dark:border-zinc-50 text-zinc-50 dark:text-zinc-950 dark:hover:shadow-zinc-500/25",
    version4: " hover:scale-105",
  };

  return (
    <button
      className={clsx(
        textSize,
        buttonStyles[version],
        "font-heading cursor-pointer font-medium hover:shadow-lg active:translate-0.5 transition-all duration-200 ease-in"
      )}
      style={{ backfaceVisibility: "hidden" }}
      onClick={onClick}
    >
      {label} {children}
    </button>
  );
}

export default Button;
