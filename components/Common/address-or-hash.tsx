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
    <div className="flex items-center gap-1">
      <p className="select-none font-medium underline dark:text-white">
        {`${value.substring(0, lengthSubString)}...${value.substring(
          value.length - lengthSubString
        )}`}
      </p>
      {copyIcon && (
        <Tooltip
          key="copy-hash-address"
          containerClassname="w-20 bg-slate-200 rounded-md h-full"
          container={
            <HiClipboardCopy className="h-5 w-5 text-slate-200 hover:cursor-pointer" />
          }
          onClickContainer={handleOnClickCopy}
          content="Copied!"
          trigger="click"
        />
      )}
    </div>
  );
}
