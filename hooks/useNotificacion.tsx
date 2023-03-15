import { useState, useEffect } from "react";
import useControls from "./useControls";

// eslint-disable-next-line no-unused-vars
const useNotification = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const { open, close, show, delayClose } = useControls();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (notification) {
      timeoutId = setTimeout(() => {
        setNotification(null);
        close();
      }, 5000); // Mostramos la notificación por 3 segundos
    }

    return () => clearTimeout(timeoutId);
  }, [close, notification]);

  const dispatchNotification = (message: string) => {
    open();
    setNotification(message);
  };

  return { notification, dispatchNotification, show, delayClose };
};

export default useNotification;
