import { ReactNode } from "react";
import Spinner from "./spinner";

interface Props {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  size?: "sm" | "md";
  text?: "sm" | "md";
}
export default function ActionButton({
  label,
  icon,
  disabled,
  onClick,
  isLoading,
  size = "md",
  text = "md",
}: Props) {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={
        size === "sm"
          ? "h-full w-20 rounded bg-blue-600 px-2 font-medium text-slate-50 hover:bg-blue-500 disabled:bg-blue-700 disabled:text-slate-400 disabled:hover:bg-blue-700"
          : "h-full w-28  rounded bg-blue-600 px-2 font-medium text-slate-50 hover:bg-blue-500 disabled:bg-blue-700 disabled:text-slate-400 disabled:hover:bg-blue-700"
      }
    >
      {isLoading ? (
        <Spinner className="mx-auto h-5 w-5 animate-spin text-slate-200" />
      ) : (
        <p
          className={
            text === "sm"
              ? "mx-auto inline-flex truncate text-sm"
              : "mx-auto inline-flex truncate text-base"
          }
        >
          {label}
          {icon && icon}
        </p>
      )}
    </button>
  );
}
