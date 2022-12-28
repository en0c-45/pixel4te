import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

export type PostProps = { ipfsCid: string; width: number; height: number };

export async function getPost(pathUrl: string): Promise<PostProps | null> {
  const client = await clientPromise;
  const collection = client.db("pixel4te").collection("posts");
  const results = await collection.findOne(
    new ObjectId(pathUrl.length != 24 ? 0 : pathUrl)
  );
  if (results) {
    return {
      ipfsCid: results["ipfsCid"] as string,
      width: results["width"] as number,
      height: results["height"] as number,
    };
  } else {
    return null;
  }
}

export async function savePost(post: PostProps) {
  const client = await clientPromise;
  const collection = client.db("pixel4te").collection("posts");
  return await collection.insertOne({ ...post });
}
