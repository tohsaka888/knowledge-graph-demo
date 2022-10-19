import { baseUrl } from "config/baseUrl";
import React, { useContext, useEffect } from "react";
import { KnowledgeGraph } from "react-knowledge-graph";
import { message } from "antd";
import { ConfigContext } from "./ConfigController";

function KnowledgeGraphCanvas() {
  const getNode = async (id: string, direction: "inside" | "outside") => {
    const res = await fetch(`${baseUrl}/api/${direction}/${id}`);
    const data = await res.json();
    return data;
  };

  const getEdge = async (id: string) => {
    const res = await fetch(`${baseUrl}/api/edge/${id}`);
    const data = await res.json();
    return data;
  };

  const explore = async (id: string) => {
    const inside = await getNode(id, "inside");
    const outside = await getNode(id, "outside");
    const edges = await getEdge(id);

    return {
      edges,
      inside,
      outside,
    };
  };

  const { dispatch, config } = useContext(ConfigContext)!;

  useEffect(() => {
    const bounds = document.body.getBoundingClientRect();
    dispatch({
      type: "setPosition",
      payload: { x: bounds.width / 2, y: bounds.height / 2 },
    });
  }, [dispatch]);

  return (
    <div style={{ height: "100%" }}>
      <KnowledgeGraph
        explore={explore}
        onExploreEnd={() => {
          message.info("已经到尾节点了!");
        }}
        {...config}
      />
    </div>
  );
}

export default KnowledgeGraphCanvas;
