import { HiOutlineUserCircle } from "react-icons/hi";

interface Props {
  address: string;
  ensName?: string | null;
  handleShowUserMenu?: () => void;
  userIcon?: boolean;
}

export default function Account({
  address,
  ensName,
  handleShowUserMenu,
  userIcon = false,
}: Props) {
  return (
    <div className="flex items-center gap-1">
      {userIcon && (
        <HiOutlineUserCircle
          className="h-8 w-8 text-slate-50 hover:cursor-pointer"
          onClick={handleShowUserMenu}
        />
      )}
      <button
        className="select-none font-semibold hover:cursor-pointer dark:text-slate-50"
        onClick={handleShowUserMenu}
      >
        <p>
          {" "}
          {ensName
            ? ensName
            : `${address.substring(0, 6)}...${address.substring(
                address.length - 4
              )}`}
        </p>
      </button>
    </div>
  );
}
