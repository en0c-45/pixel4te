import { HiDownload } from "react-icons/hi";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";
import ActionButton from "../Common/action-button";

export default function Actions() {
  const { saveImage, fromImgRef, uploadToIpfs, isLoadingUploadButton } =
    useEditor();
  return (
    <div className="flex justify-center space-x-2 bg-green-200">
      <ActionButton
        label={textContent.app.editor.actions.buttons.download.label}
        icon={<HiDownload className="ml-1 h-5 w-5" />}
        disabled={!fromImgRef.current}
        onClick={saveImage}
      />
      <ActionButton
        label={textContent.app.editor.actions.buttons.ipfs.label}
        disabled={!fromImgRef.current}
        onClick={uploadToIpfs}
        isLoading={isLoadingUploadButton}
      />
    </div>
  );
}
