export default function getRgbaString(currentPalette: number[]): string {
  let numbersColorString = currentPalette.map((number) => number.toString());
  let numbersColorParsed = numbersColorString.reduce((a, b) =>
    a.concat(`, ${b}`)
  );
  return `rgba(${numbersColorParsed})`;
}
