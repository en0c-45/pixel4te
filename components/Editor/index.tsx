import { FileInput } from "flowbite-react";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";
import AddressOrHash from "../Common/address-or-hash";
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
    <div className="space-y-4 rounded-xl bg-slate-100 px-2 py-8 shadow-md dark:bg-gray-800 sm:px-4">
      <div className="mx-auto w-full sm:w-1/2 lg:w-1/3">
        <FileInput
          accept={textContent.app.editor.fileInput.supportedFormats}
          id="editor-input-file"
          onChange={handleChangeInputFile}
          color="green"
        />
        <p className="mt-1 text-center text-[0.6rem] font-normal text-gray-500">
          {textContent.app.editor.fileInput.note}
        </p>
      </div>
      <Controls />
      <div className="flex justify-center rounded-xl bg-slate-200 dark:bg-gray-700">
        <canvas
          ref={canvasRef}
          id="pixel4te-canvas"
          onClick={drawPoint}
          className="cursor-pointer"
          onMouseMove={(e) => {
            if (e.ctrlKey) drawPoint(e);
          }}
        />
      </div>
      <Actions />
      {ipfsHash !== "" && (
        <AddressOrHash
          value={ipfsHash}
          lengthSubString={18}
          copyIcon={true}
          handleOnClickCopy={copyIpfsHash}
        />
      )}
    </div>
  );
}
