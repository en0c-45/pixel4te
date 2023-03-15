export default function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0]?.match(/:(.*?);/)![1];
  const buffer = Buffer.from(arr[1]!, "base64");
  return new File([buffer], filename, { type: mime });
}
