import { baseUrl } from "config/baseUrl";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  EdgeProps,
  KnowledgeGraph,
  NodeFrontProps,
  NodeProps,
} from "react-knowledge-graph";
import { Drawer, Form, message } from "antd";
import { ConfigContext } from "./ConfigController";

// eslint-disable-next-line react/display-name
const KnowledgeGraphCanvas = React.memo(
  ({ onClickInfo }: { onClickInfo: (node: NodeFrontProps) => void }) => {
    const { config } = useContext(ConfigContext)!;
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

    return (
      <KnowledgeGraph
        explore={explore}
        onExploreEnd={() => {
          message.info("已经到尾节点了!");
        }}
        onClickAddon={(node) => {
          message.success({
            key: node.id,
            content: `当前节点${node.id}加入知识应用1成功!`,
          });
        }}
        onClickInfo={onClickInfo}
        {...config}
      />
    );
  }
);

function KnowledgeGraphContainer() {
  const { dispatch } = useContext(ConfigContext)!;

  useEffect(() => {
    const bounds = document.body.getBoundingClientRect();
    dispatch({
      type: "setPosition",
      payload: { x: bounds.width / 2, y: bounds.height / 2 },
    });
  }, [dispatch]);

  const onClickInfo = useCallback((node: NodeFrontProps) => {
    setDrawerProps({
      visible: true,
      node: node,
    });
  }, []);

  const [drawerProps, setDrawerProps] = useState<{
    visible: boolean;
    node: NodeFrontProps;
  }>(null!);

  return (
    <>
      <div style={{ height: "100%" }}>
        <KnowledgeGraphCanvas onClickInfo={onClickInfo} />
      </div>
      {drawerProps && (
        <Drawer
          title={"知识卡片"}
          open={drawerProps.visible}
          onClose={() => {
            setDrawerProps((props) => ({ ...props, visible: false }));
          }}
        >
          <Form>
            <Form.Item label={"节点Id"}>{drawerProps.node.id}</Form.Item>
            <Form.Item label={"节点类型"}>{drawerProps.node.type}</Form.Item>
            <Form.Item label={"节点名称"}>{drawerProps.node.name}</Form.Item>
            <Form.Item label={"节点当前坐标"}>
              ({drawerProps.node.position.x.toFixed(0)},{" "}
              {drawerProps.node.position.y.toFixed(0)})
            </Form.Item>
            <Form.Item label={"节点方向"}>
              {drawerProps.node.direction}
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </>
  );
}

export default KnowledgeGraphContainer;
