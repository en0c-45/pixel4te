import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { textContent } from "../../constants";
import { useEditor } from "../../context/editor";
import { getRgbaString } from "../../lib/helpers/get-rgba-string";

export default function Controls() {
  const {
    blocksize,
    handleChangeBlocksize,
    handleUpDownBlocksize,
    grayscale,
    handleGrayscale,
    onPalette,
    handleOnPalette,
    currentPalette,
    selectedPalette,
    handleChangeCurrentPalette,
    targetImageSize,
    handleChangeTargetImageSize,
  } = useEditor();
  return (
    <div className="w-full py-2">
      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-evenly space-y-3 py-2 dark:border-gray-700 sm:space-y-0">
        <Label htmlFor="blocksize">
          <div className="flex items-center space-x-2">
            <p className="inline">
              {textContent.editor.controls.blocksize.label}
            </p>
            <input
              type="range"
              id="blocksize"
              value={blocksize}
              min={1}
              max={36}
              onChange={handleChangeBlocksize}
            />
            <p className="pr-1">{blocksize}</p>
            <Button.Group pill>
              <Button onClick={() => handleUpDownBlocksize("down")} size="sm">
                {textContent.editor.controls.blocksize.buttons.down}
              </Button>
              <Button onClick={() => handleUpDownBlocksize("up")} size="sm">
                {textContent.editor.controls.blocksize.buttons.up}
              </Button>
            </Button.Group>
          </div>
        </Label>
        <Label htmlFor="grayscale">
          <p className="mr-2 inline">
            {textContent.editor.controls.grayscale.label}
          </p>
          <Checkbox
            checked={grayscale}
            onChange={handleGrayscale}
            id="grayscale"
          />
        </Label>
        <Label htmlFor="on-palette">
          <p className="mr-2 inline">
            {textContent.editor.controls.onPalette.label}
          </p>
          <Checkbox
            checked={onPalette}
            onChange={handleOnPalette}
            id="on-palette"
          />
        </Label>
      </div>
      <div className="mx-auto max-w-fit">
        <div className="flex items-center justify-center space-x-2 ">
          <Label htmlFor="width">
            <p className="mb-1 ml-1">
              {textContent.editor.controls.sizes.label.width}
            </p>
            <div className="flex items-center">
              <TextInput
                onChange={(e) =>
                  handleChangeTargetImageSize("width", e.target.valueAsNumber)
                }
                value={targetImageSize.width}
                type="number"
                min={8}
                max={3500}
                id="width"
                sizing="sm"
              />
              <p className="ml-1">
                {textContent.editor.controls.sizes.sizeUnit}
              </p>
            </div>
          </Label>
          <Label htmlFor="height">
            <p className="mb-1 ml-1">
              {textContent.editor.controls.sizes.label.height}
            </p>
            <div className="flex items-center">
              <TextInput
                onChange={(e) => {
                  handleChangeTargetImageSize("height", e.target.valueAsNumber);
                }}
                value={targetImageSize.height}
                type="number"
                min={8}
                max={3500}
                id="height"
                sizing="sm"
              />
              <p className="ml-1">
                {textContent.editor.controls.sizes.sizeUnit}
              </p>
            </div>
          </Label>
        </div>
        <p className="mt-1 text-[0.6rem] text-gray-500">
          {textContent.editor.controls.sizes.note}
        </p>
      </div>
      <div className="mt-3 flex flex-col items-center space-y-2 border-t border-slate-300 py-4 dark:border-gray-700">
        <Button.Group>
          <Button
            onClick={() => handleChangeCurrentPalette("normal")}
            disabled={!onPalette}
          >
            {textContent.editor.controls.palette.buttons.change.label}
          </Button>
          <Button
            onClick={() => handleChangeCurrentPalette("random")}
            disabled={!onPalette}
          >
            {textContent.editor.controls.palette.buttons.random.label}
          </Button>
        </Button.Group>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {textContent.editor.controls.palette.label} {currentPalette + 1}
          </p>
          <div className="flex items-center">
            {selectedPalette.map((palette, i) => (
              <div
                key={i}
                className="h-5 w-5 border border-gray-800 dark:border-slate-50 sm:h-7 sm:w-7"
                style={{
                  backgroundColor: getRgbaString(palette),
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
