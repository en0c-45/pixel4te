import { Metadata } from "../../pages/profile/[address]";
import Image from "next/image";
import Link from "next/link";
import { parseEther } from "ethers/lib/utils.js";
function Item({ item }: { item: Metadata }) {
  const { tokenId, name, image, price } = item;
  return (
    <div className="flex h-48 w-48 flex-col justify-evenly border border-slate-400 py-2">
      <div className="relative mx-auto h-3/4 w-36">
        <Image src={image} fill alt="" className="mx-auto" />
        {parseEther(price).gt(0) && (
          <p className="dart:text-slate-100 absolute font-semibold">{price}</p>
        )}
      </div>
      <Link href={`/marketplace/${tokenId}`}>
        <p className="mx-auto w-fit font-medium dark:text-slate-50">{`#${tokenId} ${name}`}</p>
      </Link>
    </div>
  );
}

export default Item;
