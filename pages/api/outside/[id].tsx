import type { NextApiRequest, NextApiResponse } from "next";
import { NodeProps } from "react-knowledge-graph";
import { connectDB } from "utils/server/connectDB";
import nextCors from "next-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NodeProps[]>
) {
  await nextCors(req, res);
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Outside-Nodes");
      const nodes = await collection
        .find<NodeProps>({ parentId: id })
        .toArray();
      res.status(200).send(nodes);
    }
  } catch (error) {
    console.log(error);
    res.status(200).send([]);
  }
}
