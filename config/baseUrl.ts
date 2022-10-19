/*
 * @Author: tohsaka888
 * @Date: 2022-10-09 13:39:03
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 13:39:04
 * @Description: 请填写简介
 */

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://knowledge-graph-demo.netlify.com";
