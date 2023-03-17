/* eslint-disable no-unused-vars */
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import Spinner from "../../components/Common/spinner";
// import { alchemyClient } from "../../lib/utils/alchemy-client";

export default function Marketplace() {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner className="h-7 w-7 animate-spin text-slate-400" />
      </div>
    );
  }
  return (
    <div className="h-full w-full py-8 px-12">
      <p className="text-3xl font-semibold dark:text-slate-50">All NFTs</p>
      <div className="flex h-4/6 flex-wrap items-center justify-center gap-1 py-8">
        <div>
          <p className="text-slate-800 dark:text-slate-50">
            building, coming soon...
          </p>
        </div>
        {/* {list && list.length > 0 ? (
          list.map((item, i) => <Item item={item} key={i} />)
        ) : (
          <p>No items for this account.</p>
        )} */}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const collectionContractAddress =
  //   process.env["NEXT_PUBLIC_COLECCION_ADDRESS"]!;

  // const result = await alchemyClient.nft.getNftsForContract(
  //   collectionContractAddress,
  //   {}
  // );
  // console.log(result);

  // if (!(result.length > 0)) {
  //   return {
  //     props: { list: [] },
  //   };
  // }
  // const promisesTokenURIs = result.map((tokedId: BigNumber) =>
  //   readContract(
  //     collectionContractAddress,
  //     Pixel4te.abi,
  //     "tokenURI",
  //     [tokedId],
  //     (args: any, uri: any) => {
  //       return {
  //         uri,
  //         tokedId: args[0],
  //       };
  //     }
  //   )
  // );

  // const uris = await Promise.all(promisesTokenURIs);
  // const promisesMetadata = uris.map((result) =>
  //   fetchMetadata(result.uri, result.tokedId)
  // );
  // const itemsMetadata = await Promise.all(promisesMetadata);
  // const promisesPrices = itemsMetadata.map((item) =>
  //   readContract(marketplaceContractAddress, Marketplace.abi, "getNFTPrice", [
  //     item.tokenId,
  //   ])
  // );
  // const itemsPrices = await Promise.all(promisesPrices);
  // const list = itemsMetadata.map((item, i) => ({
  //   ...item,
  //   price: formatEther(itemsPrices[i]),
  // }));
  return {
    props: { list: [] },
  };
};
