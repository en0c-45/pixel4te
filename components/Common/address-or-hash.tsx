import { HiClipboardCopy } from "react-icons/hi";
import Tooltip from "./tooltip";

interface Props {
  value: string;
  lengthSubString: number;
  copyIcon?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOnClickCopy?: (e: any) => void;
}
export default function AddressOrHash({
  value,
  lengthSubString,
  copyIcon,
  handleOnClickCopy,
}: Props) {
  return (
    <div className="flex justify-center">
      <p className="select-none text-sm font-medium underline dark:text-white">
        {`${value.substring(0, lengthSubString)}...${value.substring(
          value.length - lengthSubString
        )}`}
      </p>
      {copyIcon && (
        <Tooltip msg="copied!" triggerClick={true}>
          <HiClipboardCopy
            onClick={handleOnClickCopy}
            className="ml-2 h-5 w-5 text-gray-900 dark:text-slate-50"
          />
        </Tooltip>
      )}
    </div>
  );
}
