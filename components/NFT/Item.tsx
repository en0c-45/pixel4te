import { Metadata } from "../../pages/profile/[address]";
import Image from "next/image";
import Link from "next/link";
import { parseEther } from "ethers/lib/utils.js";
function Item({ item }: { item: Metadata }) {
  const { tokenId, name, image, price } = item;
  return (
    <Link href={`/marketplace/${tokenId}`}>
      <div className="flex h-48 w-48 flex-col border border-slate-400 py-2">
        {parseEther(price).gt(0) && (
          <div className="flex gap-1">
            <p className="rounded bg-green-700 px-1.5 font-semibold text-slate-50">
              Listed
            </p>
            <p className="rounded bg-blue-700 px-1.5 font-semibold text-slate-50">
              {price}
            </p>
          </div>
        )}
        <div className="relative mx-auto h-3/4 w-36">
          <Image src={image} fill alt="" className="mx-auto" />
        </div>
        <p className="mx-auto w-fit font-medium dark:text-slate-50">{`#${tokenId} ${name}`}</p>
      </div>
    </Link>
  );
}

export default Item;
