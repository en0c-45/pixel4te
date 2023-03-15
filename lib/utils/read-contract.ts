/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

type ContractFunction = (...args: any[]) => Promise<any>;

export default async function readContract(
  address: string,
  abi: any[],
  functionName: string,
  args: any[],
  cb?: (args: any, uri: any) => any
) {
  // Establecer el proveedor para conectarse a la red Ethereum
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/8xYVGALXojuerzv1a9KbZXsIfWo3I3QN"
  );

  // Crear una instancia del contrato
  const contract = new ethers.Contract(address, abi, provider);

  // Llamar al método del contrato especificado en functionName con los argumentos especificados en args
  const contractFunction = contract[functionName] as ContractFunction;
  const result = await contractFunction(...args);
  if (cb) {
    return cb({ ...args }, result);
  }
  return result;
}
