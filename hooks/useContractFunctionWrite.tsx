import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { useState } from "react";

type Props = {
  contractAddress: string;
  abi: any;
  functionName: string;
};

export default function useContractFunctionWrite({
  contractAddress,
  abi,
  functionName,
}: Props) {
  const [hash, setHash] = useState<string>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const write = async (params: any[], overrides?: any) => {
    setLoading(true);
    try {
      const config = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: functionName,
        args: [...params],
        overrides: {
          gasLimit: 400_000,
          ...overrides,
        },
      });
      const tx = await writeContract(config);
      const result = await waitForTransaction({ hash: tx.hash, confirmations: 1 });
      console.log('result', result)
      setHash(tx.hash);
      setLoading(false);
      console.log(tx);
      console.log(tx.hash);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
      setLoading(false);
    }
  };

  return { write, loading, hash, error };
}
