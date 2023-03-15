import { useRouter } from "next/router";
import { BsFileBinary } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";
import ActionButton from "../Common/action-button";
import AddressOrHash from "../Common/address-or-hash";

export default function Actions() {
  const {
    saveImage,
    fromImgRef,
    uploadToIpfs,
    isLoadingUploadButton,
    shareUrl,
    ipfsHash,
    copyIpfsHash,
    generateDataURL,
  } = useEditor();
  const router = useRouter();
  return (
    <div className="space-y-2">
      <div className="flex justify-center space-x-2">
        <div className="h-10">
          <ActionButton
            label={textContent.app.editor.actions.buttons.download.label}
            icon={<HiDownload className="ml-1 h-5 w-5" />}
            disabled={!fromImgRef.current}
            onClick={saveImage}
            text="sm"
          />
        </div>
        <div className="h-10">
          <ActionButton
            label={textContent.app.editor.actions.buttons.ipfs.label}
            disabled={!fromImgRef.current}
            onClick={uploadToIpfs}
            text="sm"
            isLoading={isLoadingUploadButton}
          />
        </div>
        <div className="h-10">
          <ActionButton
            label="Mint"
            disabled={!fromImgRef.current}
            icon={<BsFileBinary className="ml-1 h-5 w-5" />}
            onClick={() => {
              generateDataURL();
              router.push("/mint");
            }}
            size="sm"
          />
        </div>
      </div>
      {ipfsHash !== "" && (
        <div className="flex justify-center gap-1">
          <p className="h-full text-slate-50">IPFS Hash:</p>
          <AddressOrHash
            value={ipfsHash}
            lengthSubString={9}
            copyIcon={true}
            handleOnClickCopy={copyIpfsHash}
          />
        </div>
      )}
      {shareUrl && (
        <div className="flex justify-center space-x-2 ">
          <TwitterShareButton url={`${shareUrl}`}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      )}
    </div>
  );
}
