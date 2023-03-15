import { useState, useEffect } from "react";
import useControls from "./useControls";

// eslint-disable-next-line no-unused-vars
const useError = () => {
  const [error, setError] = useState<string | null>(null);
  const { open, close, show, delayClose } = useControls();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
        close();
      }, 5000); // Mostramos la notificación por 3 segundos
    }

    return () => clearTimeout(timeoutId);
  }, [close, error]);

  const dispatchError = (message: string) => {
    open();
    setError(message);
  };

  return { error, dispatchError, show, delayClose };
};

export default useError;
