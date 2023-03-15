import { NFTStorage } from "nft.storage";

function createNFTStorageClient() {
  const storageApiKey = process.env["NEXT_PUBLIC_NFT_STORAGE_API_KEY"];
  if (!storageApiKey) {
    throw new Error("NEXT_PUBLIC_NFT_STORAGE_API_KEY undefined in .env.local");
  }
  return new NFTStorage({ token: storageApiKey });
}

export const NFTStorageClient = createNFTStorageClient();
