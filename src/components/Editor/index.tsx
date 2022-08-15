import { FileInput } from "flowbite-react";
import { textContent } from "../../constants";
import { useEditor } from "../../context/editor";
import Actions from "./actions";
import Controls from "./controls";

export default function Editor() {
  const { handleChangeInputFile, canvasRef, ipfsHash } = useEditor();
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
        <canvas ref={canvasRef} id="pixel4te-canvas" />
      </div>
      <Actions />
      <div className="mt-3">
        {ipfsHash !== "" && (
          <a href="#  ">
            <p className="text-sm font-medium underline hover:text-blue-600 dark:text-slate-50 dark:hover:text-blue-500">{`ipfs://${ipfsHash}`}</p>
          </a>
        )}
      </div>
    </div>
  );
}
