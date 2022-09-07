import { ReactNode, useState } from "react";

interface Props {
  msg: string;
  children?: ReactNode;
  triggerClick?: boolean;
}

export default function Tooltip({ msg, children, triggerClick }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const show = () => {
    if (triggerClick) return;
    setShowTooltip(true);
  };
  const hide = () => setTimeout(() => setShowTooltip(false), 800);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={() => setShowTooltip((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
    >
      {showTooltip && (
        <span
          className={`absolute top-6 z-30 rounded-xl bg-gray-700 p-2 text-center text-[0.65rem] font-normal text-white dark:bg-gray-300 dark:text-black`}
        >
          {msg}
        </span>
      )}
      {children}
    </div>
  );
}
