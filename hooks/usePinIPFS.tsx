import { useCallback, useState } from "react";
import { useNFTStorage } from "../pages/_app";

export interface MetadataNFT {
  name: string;
  description: string;
  image: File;
  properties: { [key: string]: any };
}

interface Props {
  name?: string;
  description?: string;
  image?: File;
  properties?: { [key: string]: any };
}

export default function usePinIPFS({ name, description, image }: Props) {
  const { client: NFTStorageClient } = useNFTStorage();
  const [uri, setUri] = useState<string>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const pin = useCallback(
    async (properties?: { [key: string]: any }) => {
      setLoading(true);
      try {
        if (!name || !description || !image)
          throw new Error("metadata undefined");
        const metadataUri = await NFTStorageClient.store({
          name,
          description,
          image,
          properties: { ...properties },
        });
        setUri(metadataUri.url);
        setLoading(false);
        return metadataUri.url;
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setError(error);
        throw new Error(JSON.stringify(error));
      }
    },
    [name, description, image, NFTStorageClient]
  );

  const pinFile = async (file: File) => {
    setLoading(true);
    try {
      if (!file) throw new Error("file undefined");
      const cid = await NFTStorageClient.storeBlob(file);
      const formattedUri = `ipfs://${cid}`;
      setUri(formattedUri);
      setLoading(false);
      return formattedUri;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError(error);
      throw new Error(JSON.stringify(error));
    }
  };
  return { pin, pinFile, uri, error, loading };
}
