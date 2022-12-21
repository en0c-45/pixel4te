import { NFTStorage } from "nft.storage";

export default async function upload(blob: Blob) {
  if (!process.env["NEXT_PUBLIC_NFT_STORAGE_API_KEY"])
    throw new Error("NFT Storage API Key not defined in .env file");
  const client = new NFTStorage({
    token: process.env["NEXT_PUBLIC_NFT_STORAGE_API_KEY"],
  });
  return await client.storeBlob(blob!);
}
