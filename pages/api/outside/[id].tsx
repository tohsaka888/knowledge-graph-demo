import type { NextApiRequest, NextApiResponse } from "next";
import { NodeProps } from "react-knowledge-graph";
import { connectDB } from "utils/server/connectDB";
import nextCors from "next-cors";
import { Nodes } from 'models/nodes'

/**
 * @swagger
 * /api/outside/{id}:
 *   get: 
 *     tags: [Nodes]
 *     description: 获取出边节点数据
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
 *                   type:
 *                     type: string
 *                   direction:
 *                     type: string
 *                   name:
 *                     type: string
 *                   parentId:
 *                     type: string
 *                   hasMore:
 *                     type: boolean
 */

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
