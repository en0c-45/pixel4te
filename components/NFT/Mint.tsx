/* eslint-disable no-unused-vars */
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { HiOutlineCamera } from "react-icons/hi";
import { useAccount } from "wagmi";
// import { useEditor } from "../../contexts/editor";
import { useMarketplace } from "../../contexts/marketplace";
// import useControls from "../../hooks/useControls";
import usePinIPFS from "../../hooks/usePinIPFS";
import dataURLtoFile from "../../lib/utils/dataurl-file";
import ActionButton from "../Common/action-button";
//import readFileAsDataURL from "../../lib/utils/read-file";
//import Spinner from "../Common/spinner";
import Connect from "../Layout/connect";

export default function Mint({ dataUrl }: { dataUrl: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("5");

  const { address, isConnected } = useAccount();
  const [image, setImage] = useState<File | undefined>();
  //const [dataUrl, setDataUrl] = useState<string | undefined>(_dataUrl);
  const { mintItem, isLoadingMintItem } = useMarketplace();

  useEffect(() => {
    setImage(dataURLtoFile(dataUrl, "image.png"));
  }, [dataUrl]);

  const router = useRouter();
  const { pin, loading: loadingPin } = usePinIPFS({ name, description, image });

  const isLoading = useMemo(
    () => isLoadingMintItem || loadingPin,
    [isLoadingMintItem, loadingPin]
  );
  // const {
  //   show: showUploadIcon,
  //   open: openUploadIcon,
  //   close: closeUploadIcon,
  // } = useControls(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetFields = () => {
    setName("");
    setDescription("");
    //setDataUrl(undefined);
    router.push(`/profile/${address}`);
    //openUploadIcon();
  };

  const handleOnMint = useCallback(() => {
    if (!image || !address) throw new Error("missing params in handleOnMint");
    pin().then(async (uri) => {
      console.log("uri", uri);
      await mintItem([address, BigNumber.from(royalties), uri], {
        value: parseEther("0.1"),
      });
      resetFields();
    });
  }, [image, address, pin, mintItem, royalties, resetFields]);

  // const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     readFileAsDataURL(file, setDataUrl);
  //     setImage(file);
  //   }
  // };

  return (
    <div className="flex h-[31rem] w-96 flex-col gap-4 overflow-hidden border p-6 dark:border-slate-50">
      <p className="text-center font-medium uppercase dark:text-slate-50">
        Generate a NFT
      </p>
      <div className="flex justify-start gap-4">
        <p className="mr-2 text-sm uppercase dark:text-slate-50">image</p>
        <div
          className="relative mx-auto flex h-40 w-40 items-center justify-center overflow-hidden border bg-slate-800 dark:border-slate-50"
          //onMouseEnter={() => openUploadIcon()}
          // onMouseLeave={() => dataUrl && closeUploadIcon()}
        >
          {/* {showUploadIcon && (
            <label
              htmlFor="upload"
              className="sticky inset-0 z-10 flex h-full cursor-pointer dark:text-slate-50"
            >
              <HiOutlineCamera className="m-auto h-7 w-7" />
            </label>
          )} */}
          {dataUrl && <Image fill alt="" src={dataUrl} />}
          {/* <input
            id="upload"
            type="file"
            className="absolute -z-10"
            multiple={false}
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleOnChangeFile}
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="mr-2 text-sm uppercase dark:text-slate-50">Name</p>
        <input
          className="h-9 w-[13.8rem] border-slate-400 bg-transparent text-sm placeholder:text-xs focus:border-slate-50 focus:ring-0 dark:border-slate-50 dark:text-slate-50"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-4">
        <p className="mr-2 text-sm uppercase dark:text-slate-50">Description</p>
        <textarea
          className="h-20 w-[14rem] resize-none overflow-hidden border-slate-400 bg-transparent text-sm placeholder:text-xs focus:border-slate-50 focus:ring-0 dark:border-slate-50 dark:text-slate-50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-4">
        <p className="mr-2 text-sm uppercase dark:text-slate-50">Royalties</p>
        <div className="flex items-center gap-0.5">
          <input
            className="h-9 w-[13rem] border-slate-400 bg-transparent text-sm placeholder:text-xs focus:border-slate-50 focus:ring-0 dark:border-slate-50 dark:text-slate-50"
            type="text"
            value={royalties}
            onChange={(e) => {
              if (!e.target.value) {
                setRoyalties("");
                return;
              }
              const regex = /^([1-9]|10)$/; // Expresión regular para permitir solo números del 1 al 10
              const inputText = e.target.value;

              if (regex.test(inputText)) {
                setRoyalties(inputText);
              }
            }}
          />
          <p>%</p>
        </div>
      </div>
      {isConnected ? (
        <div className="flex h-10 w-full justify-center">
          <ActionButton
            label="Mint"
            onClick={handleOnMint}
            disabled={
              isLoading ||
              name === "" ||
              description === "" ||
              !dataUrl ||
              !image
            }
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Connect />
        </div>
      )}
    </div>
  );
}
