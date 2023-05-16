import React from "react";
import { KnowledgeGraph } from "react-knowledge-graph";
import "react-knowledge-graph/KnowledgeGraph/index.css";

function Demo() {
  return (
    <KnowledgeGraph
      width={"100vw"}
      height={"100vh"}
      explore={async (id) => {
        const getNode = async (id: string, direction: "inside" | "outside") => {
          const res = await fetch(
            `https://knowledge-graph-demo.tohsaka888.asia/api/${direction}/${id}`
          );
          const data = await res.json();
          return data;
        };
        const getEdge = async (id: string) => {
          const res = await fetch(
            `https://knowledge-graph-demo.tohsaka888.asia/api/edge/${id}`
          );
          const data = await res.json();
          return data;
        };
        const data = await Promise.all([
          getNode(id, "inside"),
          getNode(id, "outside"),
          getEdge(id),
        ]);
        return {
          inside: data[0],
          outside: data[1],
          edges: data[2],
        };
      }}
      onExploreEnd={() => {
        alert("over!!");
      }}
      basicDistence={100}
      position={{
        x: 768,
        y: 384,
      }}
      node={{
        id: "node-0",
        type: "根节点",
        hasMore: true,
        direction: "root",
        name: "根节点",
      }}
      edgeConfig={{
        stroke: "#DEDEDE",
        strokeWidth: 1,
        flyLineEffect: "arrow",
        descriptionSize: 10,
        descriptionColor: "#DEDEDE",
        hoveredColor: "#e27272",
      }}
      typeConfig={{
        根节点: {
          radius: 25,
          fill: "#747ba6",
          typeSize: 12,
          nameSize: 12,
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
  );
}

export default Demo;
