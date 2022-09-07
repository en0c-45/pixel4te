import { FileInput } from "flowbite-react";
import { HiClipboardCopy } from "react-icons/hi";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";
import Tooltip from "../Common/tooltip";
import Actions from "./actions";
import Controls from "./controls";

export default function Editor() {
  const {
    handleChangeInputFile,
    canvasRef,
    ipfsHash,
    drawPoint,
    copyIpfsHash,
  } = useEditor();
  return (
    <div className="m-4 flex flex-col items-center rounded-xl bg-slate-100 px-2 py-6 shadow-md dark:bg-gray-800 sm:mx-10 sm:px-6 lg:mx-20">
      <FileInput
        accept={textContent.app.editor.fileInput.supportedFormats}
        id="editor-input-file"
        onChange={handleChangeInputFile}
        helperText={
          <span className="ml-2 text-[0.6rem] font-normal text-gray-500">
            {textContent.app.editor.fileInput.note}
          </span>
        }
        color="green"
      />
      <Controls />
      <div className="flex w-full items-center justify-center bg-slate-200 dark:bg-gray-700">
        <canvas ref={canvasRef} id="pixel4te-canvas" onClick={drawPoint} />
      </div>
      <Actions />
      {ipfsHash !== "" && (
        <div className="flex items-center">
          <p className="select-none text-sm font-medium underline dark:text-slate-50">
            {`ipfs://${ipfsHash.substring(0, 18)}...${ipfsHash.substring(
              ipfsHash.length - 18
            )}`}
          </p>
          <Tooltip msg="copied!" triggerClick={true}>
            <HiClipboardCopy
              onClick={copyIpfsHash}
              className="ml-2 h-5 w-5 text-gray-900 dark:text-slate-50"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
