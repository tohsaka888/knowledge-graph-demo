import type { NextApiRequest, NextApiResponse } from "next";
import nextCors from "next-cors";
import { createEdgeFakeData } from "utils/client/createEdgeFakeData";
import { connectDB } from "utils/server/connectDB";

/**
 * @swagger
 * /api/edge/generate/{id}:
 *   get:
 *     tags: [Generate]
 *     description: 生成边数据
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
 *                   fromId:
 *                     type: string
 *                   toId:
 *                     type: string
 *                   description:
 *                     type: string
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await nextCors(req, res);
    const db = await connectDB();
    const id = req.query.id as string;
    const insideLength = req.query.insideLength as string;
    const outsideLength = req.query.outsideLength as string;

    const collection = await db.collection("Edges");
    const lastData = await collection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const lastEdgeId = +lastData[0].id.split("-")[1];
    const insdieEdgeFakeData = createEdgeFakeData({
      rootId: id,
      direction: "inside",
      length: +insideLength,
      edgeLastId: lastEdgeId,
    });
    const outsideEdgeFakeData = createEdgeFakeData({
      rootId: id,
      direction: "outside",
      length: +outsideLength,
      edgeLastId: lastEdgeId + +insideLength,
    });
    collection.insertMany([...insdieEdgeFakeData, ...outsideEdgeFakeData]);
    if (db) {
      res.status(200).send({
        insideEdges: insdieEdgeFakeData,
        outsideEdges: outsideEdgeFakeData,
      });
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
