import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { BsFileEarmarkExcel } from "react-icons/bs";
import { getPost, PostProps } from "../../lib/api/item";

export default function Post({ ipfsCid, width, height }: PostProps) {
  return (
    <div className="flex w-full items-center justify-center py-2">
      {!ipfsCid || !width || !height ? (
        <p className="inline-flex items-center text-2xl font-bold dark:text-white">
          <BsFileEarmarkExcel className="mr-2 h-8 w-8 text-red-500" />
          POST NOT FOUND
        </p>
      ) : (
        <Image
          src={`https://ipfs.io/ipfs/${ipfsCid}`}
          alt=""
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getPost(context.params?.["pathUrl"] as string);
  return {
    props: {
      ipfsCid: result?.ipfsCid ? result.ipfsCid : null,
      width: result?.width ? result.width : null,
      height: result?.height ? result.height : null,
    },
  };
};
