import { useConnect } from "wagmi";
import { metamaskConnector } from "../../lib/utils/wagmi-client";
import ActionButton from "../Common/action-button";

type Props = {
  callback?: () => void;
};
export default function Connect({ callback }: Props) {
  const { connect, isLoading } = useConnect({
    connector: metamaskConnector,
  });
  const handleConnect = async (cb?: () => void) => {
    connect({ chainId: 11155111 });
    cb?.();
  };

  return (
    <div className="h-10 w-fit">
      <ActionButton
        label="Connect"
        onClick={() => handleConnect(callback)}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
