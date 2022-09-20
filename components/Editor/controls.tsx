import { Button, Checkbox, Label, TextInput, Tooltip } from "flowbite-react";
import { textContent } from "../../constants";
import { useEditor } from "../../contexts/editor";
import getRgbaString from "../../utils/get-rgba-string";

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
    currentPointColor,
    setCurrentPointColor,
    onPixelToPixel,
    handleOnPixelToPixel,
  } = useEditor();
  return (
    <div className="mx-auto w-full space-y-4 sm:w-1/2 lg:w-1/3">
      <div className="mx-auto w-fit">
        <Label htmlFor="blocksize">
          <div className="flex items-center space-x-2">
            <p className="inline align-middle">
              {textContent.app.editor.controls.blocksize.label}
            </p>
            <input
              type="range"
              id="blocksize"
              value={blocksize}
              min={1}
              max={36}
              onChange={handleChangeBlocksize}
            />
            <p className="pr-1 align-middle">{blocksize}</p>
            <Button.Group pill>
              <Button onClick={() => handleUpDownBlocksize("down")} size="sm">
                {textContent.app.editor.controls.blocksize.buttons.down}
              </Button>
              <Button onClick={() => handleUpDownBlocksize("up")} size="sm">
                {textContent.app.editor.controls.blocksize.buttons.up}
              </Button>
            </Button.Group>
          </div>
        </Label>
      </div>
      <div className="flex justify-evenly">
        <Label htmlFor="grayscale">
          <p className="mr-2 inline align-middle">
            {textContent.app.editor.controls.grayscale.label}
          </p>
          <Checkbox
            checked={grayscale}
            onChange={handleGrayscale}
            id="grayscale"
          />
        </Label>
        <Label htmlFor="on-palette">
          <p className="mr-2 inline align-middle">
            {textContent.app.editor.controls.onPalette.label}
          </p>
          <Checkbox
            checked={onPalette}
            onChange={handleOnPalette}
            id="on-palette"
          />
        </Label>
        <Label htmlFor="pixel-to-pixel">
          <Tooltip
            content={
              <div className="w-32">
                <p className="text-center text-[0.7rem]">
                  {textContent.app.editor.controls.pixelToPixel.tooltip}
                </p>
              </div>
            }
          >
            <p className="mr-2 inline align-middle">
              {textContent.app.editor.controls.pixelToPixel.label}
            </p>
            <Checkbox
              checked={onPixelToPixel}
              onChange={handleOnPixelToPixel}
              id="pixel-to-pixel"
            />
          </Tooltip>
        </Label>
      </div>
      <div>
        <div className="flex justify-evenly">
          <Label htmlFor="width">
            <div className="flex items-center space-x-1">
              <p>{textContent.app.editor.controls.sizes.label.width}</p>
              <div className="w-16">
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
              </div>
              <p>{textContent.app.editor.controls.sizes.sizeUnit}</p>
            </div>
          </Label>
          <Label htmlFor="height">
            <div className="flex items-center space-x-1">
              <p>{textContent.app.editor.controls.sizes.label.height}</p>
              <div className="w-16">
                <TextInput
                  onChange={(e) => {
                    handleChangeTargetImageSize(
                      "height",
                      e.target.valueAsNumber
                    );
                  }}
                  value={targetImageSize.height}
                  type="number"
                  min={8}
                  max={3500}
                  id="height"
                  sizing="sm"
                />
              </div>
              <p>{textContent.app.editor.controls.sizes.sizeUnit}</p>
            </div>
          </Label>
        </div>
        <p className="mt-1 text-center text-[0.6rem] text-gray-500">
          {textContent.app.editor.controls.sizes.note}
        </p>
      </div>
      <div className="mx-auto w-fit">
        <Button.Group>
          <Button
            onClick={() => handleChangeCurrentPalette("normal")}
            disabled={!onPalette}
          >
            {textContent.app.editor.controls.palette.buttons.change.label}
          </Button>
          <Button
            onClick={() => handleChangeCurrentPalette("random")}
            disabled={!onPalette}
          >
            {textContent.app.editor.controls.palette.buttons.random.label}
          </Button>
        </Button.Group>
      </div>
      <div className="flex items-center justify-evenly">
        <p className="flex-none align-middle font-medium text-gray-900 dark:text-gray-300">
          {currentPalette + 1}
        </p>
        <div className="flex h-10 w-40 flex-none flex-wrap items-center sm:h-14 sm:w-60">
          {selectedPalette.map((palette, i) => (
            <div
              key={i}
              className="h-5 w-5 border border-gray-800 dark:border-slate-50 sm:h-7 sm:w-7"
              style={{
                backgroundColor: getRgbaString(palette),
              }}
              onClick={() => setCurrentPointColor(getRgbaString(palette))}
              role="button"
              tabIndex={0}
              onKeyPress={() => undefined}
            ></div>
          ))}
        </div>
        <div className="ml-4 flex items-center">
          <p className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            point color:
          </p>
          <div
            className="h-4 w-4 border border-gray-800 dark:border-slate-50 sm:h-5 sm:w-5"
            style={{
              backgroundColor: currentPointColor,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
