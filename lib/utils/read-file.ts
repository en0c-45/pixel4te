// eslint-disable-next-line no-unused-vars
export default function readFileAsDataURL(file: File, cb: (v: string) => void) {
  const reader = new FileReader();
  reader.onload = (ev) => cb(ev.target?.result as string);
  reader.readAsDataURL(file);
}
