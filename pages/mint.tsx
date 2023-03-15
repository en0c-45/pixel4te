import Link from "next/link";
import ActionButton from "../components/Common/action-button";
import Mint from "../components/NFT/Mint";
import { useEditor } from "../contexts/editor";

export default function MintPage() {
  const { dataUrl } = useEditor();
  if (!dataUrl) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center gap-2 dark:text-slate-50">
        <p>You must previously generate an image in the Editor.</p>
        <Link href="/editor">
          <div className="h-9">
            <ActionButton label="Go to Editor" onClick={() => {}} />
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex justify-center py-8">
        {dataUrl && <Mint dataUrl={dataUrl} />}
      </div>
    </div>
  );
}
