import { HiX } from "react-icons/hi";

export default function Error({
  message,
  handleOnClose,
}: {
  message: string;
  handleOnClose: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-10 h-24 w-4/6 rounded border border-red-500 bg-red-200 dark:bg-red-500">
      <div className="relative flex h-full w-full p-4">
        <HiX onClick={handleOnClose} className="absolute top-0 right-0" />
        <p className="m-auto">{message}</p>
      </div>
    </div>
  );
}
