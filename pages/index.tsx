/*
 * @Author: tohsaka888
 * @Date: 2022-10-09 13:33:09
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:05:19
 * @Description: 请填写简介
 */
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Key, useState } from "react";
import { baseUrl } from "../config/baseUrl";
import { KnowledgeGraph } from "react-knowledge-graph";
import { Button, message } from "antd";

// const KnowledgeGraph = dynamic(
//   () => import("react-knowledge-graph").then((value) => value.KnowledgeGraph),
//   {
//     ssr: false,
//   }
// );

const Home: NextPage = () => {
  const getNode = async (id: Key, direction: "inside" | "outside") => {
    const res = await fetch(`${baseUrl}/api/${direction}/${id}`);
    const data = await res.json();
    return data;
  };

  const getEdge = async (id: Key) => {
    const res = await fetch(`${baseUrl}/api/edge/${id}`);
    const data = await res.json();
    return data;
  };

  const explore = async (id: Key) => {
    const inside = await getNode(id, "inside");
    const outside = await getNode(id, "outside");
    const edges = await getEdge(id);

    return {
      edges,
      inside,
      outside,
    };
  };

  const [width, setWidth] = useState<number>(1);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        border: "1px solid #cecece",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={() => {
          setWidth(width + 1);
        }}
      >
        Click
      </Button>
      <KnowledgeGraph
        explore={explore}
        basicDistence={30}
        position={{ x: 100, y: 100 }}
        node={{
          id: "node-0",
          type: "根节点",
          hasMore: true,
          direction: "root",
          name: "根节点",
        }}
        onExploreEnd={() => {
          message.info("已经到尾节点了!");
        }}
        edgeConfig={{
          hoveredColor: "#e27272",
          stroke: "#DEDEDE",
          strokeWidth: width,
        }}
        typeConfig={{
          根节点: {
            radius: 25,
            fill: "#747ba6",
            hoverStyle: {
              fill: "#3949a3",
            },
          },
          model: {
            radius: 20,
            fill: "#b4e5a2",
            typeSize: 11,
            nameSize: 11,
            hoverStyle: {
              fill: "#6be73e",
            },
          },
          data: {
            radius: 15,
            fill: "#ea52ea",
            typeSize: 8,
            nameSize: 8,
            hoverStyle: {
              fill: "#e5a2e5",
            },
          },
          test: {
            radius: 18,
            fill: "#89c4fb",
            typeSize: 12,
            nameSize: 12,
            hoverStyle: {
              fill: "#2f8fe8",
            },
          },
        }}
      />
    </div>
  );
};

export default Home;
