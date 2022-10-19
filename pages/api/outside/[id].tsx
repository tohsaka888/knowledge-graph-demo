/*
 * @Author: tohsaka888
 * @Date: 2022-10-09 13:38:47
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:15:04
 * @Description: 请填写简介
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { NodeProps } from "react-knowledge-graph";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NodeProps[]>
) {
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
