import { useState } from "react";

export default function useControls(initialState: boolean = false) {
  const [show, setShow] = useState(initialState);

  const open = (cb?: () => any) => {
    setShow(true);
    cb?.();
  };
  const close = (cb?: () => any) => {
    setShow(false);
    cb?.();
  };
  const delayClose = (ms: number) => {
    setTimeout(() => setShow(false), ms);
  };
  const toggle = () => setShow((prev) => !prev);

  return {
    show,
    open,
    close,
    delayClose,
    toggle,
  };
}
