import { HiX } from "react-icons/hi";

export default function Notification({
  message,
  handleOnClose,
}: {
  message: string;
  handleOnClose: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-10 mx-auto h-24 w-4/6 rounded border border-slate-400 bg-slate-50 dark:bg-slate-800">
      <div className="relative flex h-full w-full p-4">
        <HiX
          onClick={handleOnClose}
          className="absolute top-2 right-5 h-5 w-5"
        />
        <p className="m-auto">{message}</p>
      </div>
    </div>
  );
}
