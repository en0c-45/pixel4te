import { Button, Spinner } from "flowbite-react";
import { HiDownload } from "react-icons/hi";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";

export default function Actions() {
  const { saveImage, fromImgRef, uploadToIpfs, isLoadingUploadButton } =
    useEditor();
  return (
    <div className="my-6 flex items-center space-x-2">
      <Button onClick={saveImage} disabled={!fromImgRef.current}>
        <HiDownload className="mr-1 h-5 w-5" />
        {textContent.app.editor.actions.buttons.download.label}
      </Button>
      <Button
        onClick={uploadToIpfs}
        disabled={!fromImgRef.current || isLoadingUploadButton}
      >
        {isLoadingUploadButton ? (
          <div className="px-4">
            <Spinner size="sm" light={true} />
          </div>
        ) : (
          <p>{textContent.app.editor.actions.buttons.ipfs.label}</p>
        )}
      </Button>
    </div>
  );
}
