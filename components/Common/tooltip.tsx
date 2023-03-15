import { Float } from "@headlessui-float/react";
import { ReactElement, useRef, useState } from "react";

type Props = {
  container: ReactElement;
  // eslint-disable-next-line no-unused-vars
  onClickContainer?: (e?: any) => void;
  disabledButton?: boolean;
  containerClassname: string;
  content: string;
  trigger?: "hover" | "click";
};

export default function Tooltip({
  container,
  containerClassname,
  onClickContainer,
  disabledButton = false,
  content,
  trigger = "hover",
}: Props) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnClickContainer = () => {
    if (trigger === "click") {
      open();
    }
    onClickContainer?.();
  };

  const open = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setShow(true);
  };

  const delayClose = () => {
    timer.current = setTimeout(() => {
      setShow(false);
    }, 700);
  };

  return (
    <Float show={show} placement="bottom" offset={12} arrow>
      <button
        onMouseEnter={trigger === "hover" ? open : undefined}
        onMouseLeave={delayClose}
        onClick={handleOnClickContainer}
        disabled={disabledButton}
      >
        {container}
      </button>
      <div
        className={containerClassname}
        onMouseEnter={open}
        onMouseLeave={delayClose}
      >
        <Float.Arrow className="absolute h-4 w-4 rotate-45 bg-inherit" />
        <div className="relative overflow-hidden rounded-md p-2">
          <p className="text-center text-xs">{content}</p>
        </div>
      </div>
    </Float>
  );
}
