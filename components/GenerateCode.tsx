import { Button, message } from "antd";
import React, { useContext, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ConfigContext } from "./ConfigController";

function GenerateCode() {
  const { config } = useContext(ConfigContext)!;
  const knowledgeGraphCode = useMemo(() => {
    return `
      <KnowledgeGraph
        width={"100vw"}
        height={"100vh"}
        showFilter={false}
        showHelper={false}
        explore={async (id) => {
          const getNode = async (
            id: string,
            direction: "inside" | "outside"
          ) => {
            const res = await fetch(
              \`https://knowledge-graph-demo.tohsaka888.asia/api/\${direction}/\${id}\`
            );
            const data = await res.json();
            return data;
          };
          const getEdge = async (id: string) => {
            const res = await fetch(
              \`https://knowledge-graph-demo.tohsaka888.asia/api/edge/\${id}\`
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
        basicDistence={${config.basicDistence}}
        position={{
          x: ${config.position.x},
          y: ${config.position.y}
        }}
        node={{
          id: "node-0",
          type: "根节点",
          hasMore: true,
          direction: "root",
          name: "根节点",
        }}
        edgeConfig={{
          stroke: "${config.edgeConfig?.stroke || ""}",
          strokeWidth: ${config.edgeConfig?.strokeWidth || 1},
          flyLineEffect: "${config.edgeConfig?.flyLineEffect}",
          descriptionSize: ${config.edgeConfig?.descriptionSize},
          descriptionColor: "${config.edgeConfig?.descriptionColor}",
          hoveredColor: "${config.edgeConfig?.hoveredColor}",
        }}
        typeConfig={{
          根节点: {
            radius: ${config.typeConfig!["根节点"].radius},
            fill: "${config.typeConfig!["根节点"].fill}",
            typeSize: ${config.typeConfig!["根节点"].typeSize},
            nameSize: ${config.typeConfig!["根节点"].nameSize},
            hoverStyle: {
              fill: "${config.typeConfig!["根节点"].hoverStyle?.fill}"
            }
          },
          model: {
            radius: ${config.typeConfig!["model"].radius},
            fill: "${config.typeConfig!["model"].fill}",
            typeSize: ${config.typeConfig!["model"].typeSize},
            nameSize: ${config.typeConfig!["model"].nameSize},
            hoverStyle: {
              fill: "${config.typeConfig!["model"].hoverStyle?.fill}"
            }
          },
          data: {
            radius: ${config.typeConfig!["data"].radius},
            fill: "${config.typeConfig!["data"].fill}",
            typeSize: ${config.typeConfig!["data"].typeSize},
            nameSize: ${config.typeConfig!["data"].nameSize},
            hoverStyle: {
              fill: "${config.typeConfig!["data"].hoverStyle?.fill}"
            }
          },
          test: {
            radius: ${config.typeConfig!["test"].radius},
            fill: "${config.typeConfig!["test"].fill}",
            typeSize: ${config.typeConfig!["test"].typeSize},
            nameSize: ${config.typeConfig!["test"].nameSize},
            hoverStyle: {
              fill: "${config.typeConfig!["test"].hoverStyle?.fill}"
            }
          }
        }}
      />
    `;
  }, [config]);
  return (
    <CopyToClipboard
      text={knowledgeGraphCode}
      onCopy={() => {
        message.success({
          content: "复制成功!",
          key: "copy_success",
        });
      }}
    >
      <Button type={"primary"} style={{ width: "100%" }}>
        生成代码
      </Button>
    </CopyToClipboard>
  );
}

export default GenerateCode;
