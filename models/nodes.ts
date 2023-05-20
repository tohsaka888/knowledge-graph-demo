/**
 * @swagger
 * components:
 *  schemas:
 *    Nodes:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        type:
 *          type: string
 *        hasMore:
 *          type: boolean
 *        direction:
 *          type: string
 *        parentId:
 *          type: string
 */

export interface Nodes {
  id: string;
  name: string;
  type: string;
  hasMore: boolean;
  direction: string;
  parentId: string;
};
