import { Button, Checkbox, Label, TextInput, Tooltip } from "flowbite-react";
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
    currentPointColor,
    setCurrentPointColor,
    onPixelToPixel,
    handleOnPixelToPixel,
  } = useEditor();
  return (
    <div className="w-full space-y-1 py-2">
      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-evenly space-y-3 py-2 dark:border-gray-700 sm:space-y-0">
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
      </div>
      <div className="mx-auto max-w-fit">
        <div className="flex items-center justify-center space-x-10">
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
      <div className="mt-3 flex flex-col items-center space-y-2 border-t border-slate-300 py-4 dark:border-gray-700">
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
        <div className="flex w-full flex-col items-center space-y-2 border-b border-slate-300 pb-4 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {textContent.app.editor.controls.palette.label} {currentPalette + 1}
          </p>
          <div className="flex items-center">
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
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <Label htmlFor="pixel-to-pixel">
            <Tooltip
              content={
                <div className="w-32">
                  <p className="text-[0.7rem]">
                    Check this if you want to draw pixel by pixel. Point color
                    is chosen by clicking on the colors in the palette.
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
          <p className="pl-3 text-sm font-medium text-gray-900 dark:text-gray-300">
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
