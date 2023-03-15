import { BigNumber } from "ethers";

export const fetchMetadata = async (uri: string, tokenId: BigNumber) => {
  const cid = uri.split("://")[1];
  const gatewayURL = process.env["NEXT_PUBLIC_IPFS_GATEWAY"]!;
  const dataRaw = await fetch(`${gatewayURL}/${cid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await dataRaw.json();
  return {
    ...data,
    image: `${gatewayURL}/${data.image.split("://")[1]}`,
    tokenId: tokenId.toString(),
  };
};
