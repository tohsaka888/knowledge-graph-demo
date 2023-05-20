import type { NextApiRequest, NextApiResponse } from "next";
import nextCors from "next-cors";
import { EdgeProps } from "react-knowledge-graph";
import { connectDB } from "utils/server/connectDB";

/**
 * @swagger
 * /api/edge/{id}:
 *   get:
 *     tags: [Edges]
 *     description: 获取边数据
 *     parameters:
 *     - in: path
 *       name: id
 *       description: 父节点Id
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: 成功，返回数据
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   fromId:
 *                     type: string
 *                   toId:
 *                     type: string
 *                   description:
 *                     type: string
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EdgeProps[]>
) {
  try {
    await nextCors(req, res);
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Edges");
      const toEdges = await collection
        .find<EdgeProps>({ fromId: id })
        .toArray();
      const fromEdges = await collection
        .find<EdgeProps>({ toId: id })
        .toArray();
      res.status(200).send([...fromEdges, ...toEdges]);
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
