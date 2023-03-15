import { BigNumber } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import readContract from "../../lib/utils/read-contract";
import { fetchMetadata } from "../../lib/utils/fetch-metadata";
import Pixel4te from "../../lib/hardhat/artifacts/contracts/Pixel4te.sol/Pixel4te.json";
import Item from "../../components/NFT/Item";
import Spinner from "../../components/Common/spinner";
import { useRouter } from "next/router";
import Marketplace from "../../lib/hardhat/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { formatEther } from "ethers/lib/utils.js";
import { Offer } from "../marketplace/[tokenId]";

export interface Metadata {
  name: string;
  description: string;
  properties: any;
  image: string;
  tokenId: string;
  owner: string;
  price: string;
  pendingOffers?: Offer[];
}

export default function Profile({ list }: { list: Metadata[] }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner className="h-7 w-7 animate-spin text-slate-400" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-1 py-8">
        {list && list.length > 0 ? (
          list.map((item, i) => <Item item={item} key={i} />)
        ) : (
          <p>No items for this account.</p>
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Devolvemos un array vacío para indicar que la página solo se puede acceder mediante una ruta dinámica generada en tiempo de ejecución
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const collectionContractAddress =
    process.env["NEXT_PUBLIC_COLECCION_ADDRESS"]!;
  const marketplaceContractAddress =
    process.env["NEXT_PUBLIC_MARKETPLACE_ADDRESS"]!;
  const result = await readContract(
    collectionContractAddress,
    Pixel4te.abi,
    "itemsOf",
    [params?.["address"]]
  );

  if (!(result.length > 0)) {
    return {
      props: { list: [] },
    };
  }
  const promisesTokenURIs = result.map((tokedId: BigNumber) =>
    readContract(
      collectionContractAddress,
      Pixel4te.abi,
      "tokenURI",
      [tokedId],
      (args: any, uri: any) => {
        return {
          uri,
          tokedId: args[0],
        };
      }
    )
  );

  const uris = await Promise.all(promisesTokenURIs);
  const promisesMetadata = uris.map((result) =>
    fetchMetadata(result.uri, result.tokedId)
  );
  const itemsMetadata = await Promise.all(promisesMetadata);
  const promisesPrices = itemsMetadata.map((item) =>
    readContract(marketplaceContractAddress, Marketplace.abi, "getNFTPrice", [
      item.tokenId,
    ])
  );
  const itemsPrices = await Promise.all(promisesPrices);
  const list = itemsMetadata.map((item, i) => ({
    ...item,
    price: formatEther(itemsPrices[i]),
  }));
  return {
    props: { list },
  };
};
