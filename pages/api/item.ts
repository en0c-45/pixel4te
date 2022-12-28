import { NextApiRequest, NextApiResponse } from "next";
import { savePost } from "../../lib/api/item";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (!req.body.ipfsCid || !req.body.width || !req.body.height) {
        throw new Error("missing ipfsCid or ipfsCid");
      }
      const result = await savePost({ ...req.body });
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
