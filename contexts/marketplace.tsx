/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useContext } from "react";
import useContractFunctionWrite from "../hooks/useContractFunctionWrite";
import Pixel4te from "../lib/hardhat/artifacts/contracts/Pixel4te.sol/Pixel4te.json";
import Marketplace from "../lib/hardhat/artifacts/contracts/Marketplace.sol/Marketplace.json";
import useContractFunctionRead from "../hooks/useContractFunctionRead";

interface MarketplaceInterface {
  mintItem: (params: any[], overrides?: any) => Promise<void>;
  isLoadingMintItem: boolean;
  setURI: (params: any[], overrides?: any) => Promise<void>;
  isLoadingSetURI: boolean;
  mintFeeUpdate: (params: any[], overrides?: any) => Promise<void>;
  isLoadingMintFeeUpdate: boolean;
  setRoyaltiesPercent: (params: any[], overrides?: any) => Promise<void>;
  isLoadingSetRoyaltiesPercent: boolean;
  listNFT: (params: any[], overrides?: any) => Promise<void>;
  isLoadingListNFT: boolean;
  removeNFT: (params: any[], overrides?: any) => Promise<void>;
  isLoadingRemoveNFT: boolean;
  updateNFTPrice: (params: any[], overrides?: any) => Promise<void>;
  isLoadingUpdateNFTPrice: boolean;
  makeOffer: (params: any[], overrides?: any) => Promise<void>;
  isLoadingMakeOffer: boolean;
  acceptOffer: (params: any[], overrides?: any) => Promise<void>;
  isLoadingAcceptOffer: boolean;
  cancelOffer: (params: any[], overrides?: any) => Promise<void>;
  isLoadingCancelOffer: boolean;
  buyNFT: (params: any[], overrides?: any) => Promise<void>;
  isLoadingBuyNFT: boolean;
  getNFTsByOwner: (params: any[]) => Promise<any>;
  getURI: (params: any[]) => Promise<any>;
  isNFTListed: (params: any[]) => Promise<any>;
  getNFTPrice: (params: any[]) => Promise<any>;
  setApprovalForAll: (params: any[], overrides?: any) => Promise<void>;
  isLoadingApprovalForAll: boolean;
  isApprovedForAll: (params: any[]) => Promise<any>;
  collectionContractAddress: string;
  marketplaceContractAddress: string;
}

// const config = {
//   apiKey: process.env['NEXT_PUBLIC_ALCHEMY_API_KEY'], // Replace with your Alchemy API key.
//   network: Network.MATIC_MAINNET, // Replace with your network.
// };
// const alchemy = new Alchemy(config);

const MarketplaceContext = createContext<MarketplaceInterface | null>(null);
const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  // Configuración del contrato
  const collectionContractAddress = process.env['NEXT_PUBLIC_COLECCION_ADDRESS']!;
  const marketplaceContractAddress = process.env['NEXT_PUBLIC_MARKETPLACE_ADDRESS']!;
  //const { address } = useAccount();
  const collectionABI = Pixel4te.abi;
  const marketplaceABI = Marketplace.abi;

  // // ALchemy sdk funcionts
  // const getAllNFTs = async () => {
  //   const response = await alchemy.nft.getNftsForContract(collectionContractAddress);
  //   return response
  // }
  // ALchemy sdk funcionts
  // const getNFTsByOwner = async (owner: string) => {
  //   const response = await alchemy.nft.getNftsForOwner(owner);
  //   return response
  // }
  const { read: getNFTsByOwner } = useContractFunctionRead({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "itemsOf",
  });

  const { read: getURI } = useContractFunctionRead({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "tokenURI",
  });

  const { read: isApprovedForAll } = useContractFunctionRead({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "isApprovedForAll",
  });
  const { write: setApprovalForAll, loading: isLoadingApprovalForAll } = useContractFunctionWrite({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "setApprovalForAll",
  });

  const { read: isNFTListed } = useContractFunctionRead({
    contractAddress: marketplaceContractAddress,
    abi: marketplaceABI,
    functionName: "isNFTListed",
  });

  const { read: getNFTPrice } = useContractFunctionRead({
    contractAddress: marketplaceContractAddress,
    abi: marketplaceABI,
    functionName: "getNFTPrice",
  });

  // Preparar la función de escritura "mintItem" para su uso con el hook personalizado
  const { write: mintItem, loading: isLoadingMintItem } = useContractFunctionWrite({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "mintItem",
  });

  // Preparar la función de escritura "setURI"de para su uso con el hook personalizado
  const { write: setURI, loading: isLoadingSetURI } = useContractFunctionWrite({
    contractAddress: collectionContractAddress,
    abi: collectionABI,
    functionName: "setURI"
  });

  // Preparar la función de escritura "mintFeeUpdate" para su uso con el hook personalizado
  const { write: mintFeeUpdate, loading: isLoadingMintFeeUpdate } =
    useContractFunctionWrite({
      contractAddress: collectionContractAddress,
      abi: collectionABI,
      functionName: "mintFeeUpdate",

    });

  // Preparar la función de escritura "setRoyaltiesPercent" para su uso con el hook personalizado
  const { write: setRoyaltiesPercent, loading: isLoadingSetRoyaltiesPercent } =
    useContractFunctionWrite({
      contractAddress: collectionContractAddress,
      abi: collectionABI,
      functionName: "setRoyaltiesPercent",

    });

  const { write: listNFT, loading: isLoadingListNFT } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "listNFT",
    });

  const { write: removeNFT, loading: isLoadingRemoveNFT } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "removeNFT",
    });

  const { write: updateNFTPrice, loading: isLoadingUpdateNFTPrice } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "updateNFTPrice",
    });


  const { write: makeOffer, loading: isLoadingMakeOffer } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "makeOffer",
    });


  const { write: acceptOffer, loading: isLoadingAcceptOffer } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "acceptOffer",
    });


  const { write: cancelOffer, loading: isLoadingCancelOffer } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "cancelOffer",
    });


  const { write: buyNFT, loading: isLoadingBuyNFT } =
    useContractFunctionWrite({
      contractAddress: marketplaceContractAddress,
      abi: marketplaceABI,
      functionName: "buyNFT"
    });

  return (
    <MarketplaceContext.Provider value={{
      mintItem,
      isLoadingMintItem,
      setURI,
      isLoadingSetURI,
      mintFeeUpdate,
      isLoadingMintFeeUpdate,
      setRoyaltiesPercent,
      isLoadingSetRoyaltiesPercent,
      listNFT,
      isLoadingListNFT,
      removeNFT,
      isLoadingRemoveNFT,
      updateNFTPrice,
      isLoadingUpdateNFTPrice,
      makeOffer,
      isLoadingMakeOffer,
      acceptOffer,
      isLoadingAcceptOffer,
      cancelOffer,
      isLoadingCancelOffer,
      buyNFT,
      isLoadingBuyNFT,
      getNFTsByOwner,
      getURI,
      isNFTListed,
      getNFTPrice,
      setApprovalForAll,
      isLoadingApprovalForAll,
      isApprovedForAll,
      collectionContractAddress,
      marketplaceContractAddress,
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

const useMarketplace = () => useContext(MarketplaceContext)!;
export { useMarketplace, MarketplaceProvider };
