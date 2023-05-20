import type { NextApiRequest, NextApiResponse } from "next";
import nextCors from "next-cors";
import { createNodeFakeData } from "utils/client/createNodeFakeData";
import { connectDB } from "utils/server/connectDB";

/**
 * @swagger
 * /api/node/generate/{id}:
 *   get:
 *     tags: [Generate]
 *     description: 生成节点数据
 *     parameters:
 *     - in: path
 *       name: id
 *       description: 父节点Id
 *       required: true
 *       schema:
 *         type: string
 *     - in: query
 *       name: insideLength
 *       description: 入边节点长度
 *       required: true
 *       schema:
 *         type: integer
*     - in: query
 *       name: outsideLength
 *       description: 出边节点长度
 *       required: true
 *       schema:
 *         type: integer
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
  res: NextApiResponse
) {
  try {
    await nextCors(req, res);
    const db = await connectDB();
    // collection.insertMany([...insdieEdgeFakeData, ...outsideEdgeFakeData])
    if (db) {
      const id = req.query.id as string;
      const insideLength = req.query.insideLength as string;
      const outsideLength = req.query.outsideLength as string;

      const insideCollection = await db.collection("Inside-Nodes");
      const outsideCollection = await db.collection("Outside-Nodes");
      const insideNodes = createNodeFakeData({
        direction: "inside",
        length: +insideLength,
        rootId: id,
      });
      const outsideNodes = createNodeFakeData({
        direction: "outside",
        length: +outsideLength,
        rootId: id,
      });
      if (insideLength) {
        insideCollection.insertMany([...insideNodes]);
      }
      if (outsideLength) {
        outsideCollection.insertMany([...outsideNodes]);
      }
      res.status(200).send({ insideNodes, outsideNodes });
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
