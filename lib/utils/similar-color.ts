import { paletteList } from "../../constants";

type Color = number[];
function colorSim(rgbColor: Color, compareColor: Color) {
  let d = 0;
  for (let i = 0; i < rgbColor.length; i++) {
    d += (rgbColor[i]! - compareColor[i]!) * (rgbColor[i]! - compareColor[i]!);
  }
  return Math.sqrt(d);
}

export default function similarColor(
  actualColor: Color,
  currentPalette: number
) {
  let selectedColor: Color = [0, 0, 0];
  let currentSim = colorSim(actualColor, paletteList[currentPalette]![0]!);
  paletteList[currentPalette]?.forEach((color) => {
    if (colorSim(actualColor, color) <= currentSim) {
      selectedColor = color;
      currentSim = colorSim(actualColor, color);
    }
  });
  return selectedColor;
}
