import { readContract } from "@wagmi/core";
import { useState } from "react";

type Props = {
  contractAddress: string;
  abi: any;
  functionName: string;
};

export default function useContractFunctionRead({
  contractAddress,
  abi,
  functionName,
}: Props) {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const read = async (params: any[]) => {
    setLoading(true);
    try {
      const result = await readContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: functionName,
        args: [...params],
      });
      console.log("result", result);
      setLoading(false);
      return result;
    } catch (error: any) {
      console.log("error", error);
      setError(error);
      setLoading(false);
      throw new Error(JSON.stringify(error));
    }
  };

  return { read, loading, error };
}
