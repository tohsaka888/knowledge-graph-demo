import type { NextApiRequest, NextApiResponse } from "next";
import nextCors from "next-cors";
import { NodeProps } from "react-knowledge-graph";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NodeProps[]>
) {
  try {
    await nextCors(req, res);
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Inside-Nodes");
      const nodes = await collection
        .find<NodeProps>({ parentId: id })
        .toArray();
      res.status(200).send(nodes);
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
