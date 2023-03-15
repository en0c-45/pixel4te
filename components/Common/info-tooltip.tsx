import { FiInfo } from "react-icons/fi";
import Tooltip from "./tooltip";

interface Props {
  msg: string;
}
export default function InfoTooltip({ msg }: Props) {
  return (
    <Tooltip
      key="music-brainz-id"
      containerClassname="w-40 bg-slate-800 rounded-md"
      container={
        <FiInfo className="h-4 w-4 text-slate-300 hover:cursor-pointer" />
      }
      content={msg}
    />
  );
}
