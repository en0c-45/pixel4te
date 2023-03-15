/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { BigNumber } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchMetadata } from "../../lib/utils/fetch-metadata";
import Pixel4te from "../../lib/hardhat/artifacts/contracts/Pixel4te.sol/Pixel4te.json";
import readContract from "../../lib/utils/read-contract";
import { Metadata } from "../profile/[address]";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useCallback, useMemo, useState } from "react";
import Spinner from "../../components/Common/spinner";
import { useRouter } from "next/router";
import { useMarketplace } from "../../contexts/marketplace";
import Marketplace from "../../lib/hardhat/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { formatEther, parseEther } from "ethers/lib/utils.js";
import ActionButton from "../../components/Common/action-button";
import Account from "../../components/Layout/account";
import Error from "../../components/Common/error";
import Notification from "../../components/Common/notification";
import useError from "../../hooks/useError";
import useNotification from "../../hooks/useNotificacion";

export type Offer = {
  offerer: string;
  value: string;
};

const OfferList = ({
  list,
  isOwner,
  handleAcceptOffer,
  handleCancelOffer,
  isLoadingAcceptOffer,
  isLoadingCancelOffer,
  address,
}: {
  list?: Offer[];
  isOwner: boolean;
  handleAcceptOffer: (buyer: string) => Promise<void>;
  handleCancelOffer: () => Promise<void>;
  isLoadingAcceptOffer: boolean;
  isLoadingCancelOffer: boolean;
  address: `0x${string}` | undefined;
}) => {
  return (
    <div className="mt-4 p-2">
      <p className="text-sm font-medium dark:text-slate-50">Offers</p>
      <div className="flex h-48 w-full border py-2">
        {list && list.length > 0 ? (
          list.map((item, i) => (
            <div
              key={i}
              className="flex h-8 w-full items-center justify-between border-b border-slate-300 pb-1"
            >
              <Account address={item.offerer} />
              <p>{formatEther(item.value)}</p>
              {isOwner && (
                <ActionButton
                  label="Accept"
                  onClick={() => handleAcceptOffer(item.offerer)}
                  isLoading={isLoadingAcceptOffer}
                  size="sm"
                  text="sm"
                />
              )}
              {item.offerer === address && (
                <ActionButton
                  label="Cancel"
                  onClick={() => handleCancelOffer()}
                  isLoading={isLoadingCancelOffer}
                  size="sm"
                  text="sm"
                />
              )}
            </div>
          ))
        ) : (
          <p className="m-auto text-sm text-slate-400">No offers.</p>
        )}
      </div>
    </div>
  );
};

export default function Item({ item }: { item: Metadata }) {
  const { address, isConnected } = useAccount();
  const {
    notification,
    dispatchNotification,
    show: showNotification,
    delayClose: delayCloseNotificacion,
  } = useNotification();
  const {
    error,
    dispatchError,
    show: showError,
    delayClose: delayCloseError,
  } = useError();
  const isOwner = useMemo(
    () => (item ? item.owner === address : false),
    [address, item]
  );
  const {
    listNFT,
    isLoadingListNFT,
    removeNFT,
    isLoadingRemoveNFT,
    updateNFTPrice,
    isLoadingUpdateNFTPrice,
    buyNFT,
    isLoadingBuyNFT,
    makeOffer,
    isLoadingMakeOffer,
    acceptOffer,
    isLoadingAcceptOffer,
    cancelOffer,
    isLoadingCancelOffer,
    setApprovalForAll,
    isLoadingApprovalForAll,
    isApprovedForAll,
    marketplaceContractAddress,
  } = useMarketplace();

  const [price, setPrice] = useState<string>(item ? item.price : "0");
  const router = useRouter();

  const handleList = async () => {
    try {
      const approved = await isApprovedForAll([
        address,
        marketplaceContractAddress,
      ]);

      if (!approved) {
        await setApprovalForAll([marketplaceContractAddress, true]);
      }
      await listNFT([item?.tokenId, parseEther(price)]);
      dispatchNotification("Item was listed succesfully!");
    } catch (error) {
      dispatchError("Error on mint action");
      console.log(JSON.stringify(error));
    }
  };

  const handleDelist = async () => {
    try {
      await removeNFT([item?.tokenId]);
      dispatchNotification("Item was deslited succesfully!");
    } catch (error) {
      dispatchError("Error on deslist action");
      console.log(JSON.stringify(error));
    }
  };

  const handlePriceChange = async () => {
    try {
      await updateNFTPrice([item?.tokenId, parseEther(price)]);
      dispatchNotification("Item price was updated succesfully!");
    } catch (error) {
      dispatchError("Error on update price action");
      console.log(JSON.stringify(error));
    }
  };

  const handleBuy = async () => {
    try {
      await buyNFT([item?.tokenId], { value: parseEther(price) });
      dispatchNotification("Buy of Item succesfully!");
    } catch (error) {
      dispatchError("Error on buy action");
      console.log(JSON.stringify(error));
    }
  };

  const handleMakeOffer = useCallback(async () => {
    try {
      await makeOffer([item?.tokenId], { value: parseEther(price) });
      dispatchNotification("Offer was created succesfully!");
    } catch (error) {
      dispatchError("Error on makeoffer action");
      console.log(JSON.stringify(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, price]);

  const handleAcceptOffer = useCallback(
    async (buyer: string) => {
      try {
        await acceptOffer([item?.tokenId, buyer]);
        dispatchNotification("Offer was accepted succesfully. Item sold!");
      } catch (error) {
        dispatchError("Error on accept offer action");
        console.log(JSON.stringify(error));
      }
    },
    [item]
  );

  const handleCancelOffer = useCallback(async () => {
    try {
      await cancelOffer([item?.tokenId]);
      dispatchNotification("Offer was cancelled succesfully!");
    } catch (error) {
      dispatchError("Error on cancel offer action");
      console.log(JSON.stringify(error));
    }
  }, [item]);

  if (router.isFallback) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner className="h-7 w-7 animate-spin text-slate-400" />
      </div>
    );
  }
  return (
    <div className="w-full py-4">
      <div className="mx-auto flex h-fit w-3/4 gap-1 border">
        {item && (
          <div className="w-2/3">
            <Image
              height={448}
              width={448}
              alt=""
              src={item.image}
              className="mx-auto"
            />
          </div>
        )}
        <div className="flex w-1/3 flex-col gap-2 border-l py-2 px-4">
          <p className="text-xl font-bold text-cyan-400">{`#${item?.tokenId}`}</p>
          <div className="flex justify-between">
            <p className="text-xl dark:text-slate-50">{item?.name}</p>
            {item && parseEther(item.price).gt(0) && (
              <p className="text-lg font-semibold">{item.price}</p>
            )}
          </div>
          {isOwner ? (
            item && parseEther(item.price).gt(0) ? (
              <div className="space-y-1">
                {isConnected && (
                  <div className="space-y-1">
                    <div className="flex h-10 justify-end">
                      <ActionButton
                        label="Deslist"
                        onClick={() => handleDelist()}
                        size="sm"
                        isLoading={isLoadingRemoveNFT}
                      />
                    </div>
                    <div className="flex justify-between gap-2">
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="w-20 rounded border border-slate-200 dark:bg-slate-700 dark:text-slate-50"
                      />
                      <div className="h-10">
                        <ActionButton
                          label="Edit Price"
                          onClick={() => handlePriceChange()}
                          disabled={
                            parseEther(price).isZero() ||
                            isLoadingUpdateNFTPrice
                          }
                          isLoading={isLoadingUpdateNFTPrice}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <OfferList
                  list={item.pendingOffers}
                  isOwner={isOwner}
                  handleAcceptOffer={handleAcceptOffer}
                  handleCancelOffer={handleCancelOffer}
                  isLoadingAcceptOffer={isLoadingAcceptOffer}
                  isLoadingCancelOffer={isLoadingCancelOffer}
                  address={address}
                />
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => {
                    if (e.target.value === undefined) {
                      setPrice("");
                      return;
                    }
                    const regex = /^0?\d*\.?\d*$/;
                    const newValue = e.target.value;

                    if (regex.test(newValue)) {
                      setPrice(newValue);
                    }
                  }}
                  className="w-20 rounded border border-slate-200 dark:bg-slate-700 dark:text-slate-50"
                />
                <div className="h-10">
                  <ActionButton
                    label="List"
                    onClick={() => handleList()}
                    size="sm"
                    disabled={
                      parseEther(price).isZero() ||
                      isLoadingListNFT ||
                      isLoadingApprovalForAll
                    }
                    isLoading={isLoadingListNFT || isLoadingApprovalForAll}
                  />
                </div>
              </div>
            )
          ) : item && parseEther(item.price).gt(0) ? (
            <div>
              {isConnected && (
                <div className="space-y-1">
                  <div className="flex h-10 justify-end">
                    <ActionButton
                      label="Buy"
                      onClick={() => handleBuy()}
                      isLoading={isLoadingBuyNFT}
                      size="sm"
                    />
                  </div>
                  <div className="flex justify-between gap-2">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => {
                        if (e.target.value === undefined) {
                          setPrice("");
                          return;
                        }
                        const regex = /^0?\d*\.?\d*$/;
                        const newValue = e.target.value;

                        if (regex.test(newValue)) {
                          setPrice(newValue);
                        }
                      }}
                      className="w-20 rounded border border-slate-200 dark:bg-slate-700 dark:text-slate-50"
                    />
                    <div className="h-10">
                      <ActionButton
                        label="Make Offer"
                        onClick={() => handleMakeOffer()}
                        disabled={
                          parseEther(price !== "" ? price : "0").isZero() ||
                          isLoadingMakeOffer
                        }
                        isLoading={isLoadingMakeOffer}
                      />
                    </div>
                  </div>
                </div>
              )}
              <OfferList
                list={item.pendingOffers}
                isOwner={isOwner}
                handleAcceptOffer={handleAcceptOffer}
                handleCancelOffer={handleCancelOffer}
                isLoadingAcceptOffer={isLoadingAcceptOffer}
                isLoadingCancelOffer={isLoadingCancelOffer}
                address={address}
              />
            </div>
          ) : (
            <OfferList
              list={item.pendingOffers}
              isOwner={isOwner}
              handleAcceptOffer={handleAcceptOffer}
              handleCancelOffer={handleCancelOffer}
              isLoadingAcceptOffer={isLoadingAcceptOffer}
              isLoadingCancelOffer={isLoadingCancelOffer}
              address={address}
            />
          )}
        </div>
      </div>
      {showNotification && notification && (
        <Notification
          message={notification}
          handleOnClose={() => delayCloseNotificacion(1000)}
        />
      )}
      {showError && error && (
        <Error message={error} handleOnClose={() => delayCloseError(1000)} />
      )}
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

  const tokenId = BigNumber.from(params?.["tokenId"]);
  const tokenURI = await readContract(
    collectionContractAddress,
    Pixel4te.abi,
    "tokenURI",
    [tokenId]
  );
  const owner = await readContract(
    collectionContractAddress,
    Pixel4te.abi,
    "ownerOf",
    [tokenId]
  );
  const price = await readContract(
    marketplaceContractAddress,
    Marketplace.abi,
    "getNFTPrice",
    [tokenId]
  );
  const pendingOffers = await readContract(
    marketplaceContractAddress,
    Marketplace.abi,
    "getPendingOffers",
    [tokenId]
  );
  const pendingOffersSerialized =
    pendingOffers.length > 0
      ? pendingOffers.map((offer: { offerer: string; value: BigNumber }) => {
          return {
            offerer: offer.offerer,
            value: offer.value.toString(),
          };
        })
      : [];
  const itemMetadata = await fetchMetadata(tokenURI, tokenId);
  return {
    props: {
      item: {
        ...itemMetadata,
        owner,
        price: formatEther(price),
        pendingOffers: pendingOffersSerialized,
      },
    },
  };
};
