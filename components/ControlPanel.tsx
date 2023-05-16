import { Drawer, Form, Input, Select, Slider } from "antd";
import React, { startTransition, useContext, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { ConfigContext } from "./ConfigController";
import GenerateCode from "./GenerateCode";
import styles from "./index.module.css";
import TypeConfig from "./TypeConfig";

function ControlPanel() {
  const [open, setOpen] = useState<boolean>(false);
  const { config, dispatch } = useContext(ConfigContext)!;
  return (
    <>
      {!open && (
        <div
          className={styles["control-button"]}
          onClick={() => {
            setOpen(true);
          }}
        >
          <BsFillGearFill fontSize={38} color={"#fff"} />
        </div>
      )}
      <Drawer
        className={styles["drawer-container"]}
        title="知识图谱配置"
        placement={"left"}
        bodyStyle={{
          padding: "0px",
        }}
        closable={false}
        style={{ paddingTop: "0px" }}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <div className={styles["drawer-container"]}>
          <Form
            initialValues={config}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
          >
            <div className={styles["form-title"]}>通用配置:</div>
            <Form.Item label={"基础半径"} name={["basicDistence"]}>
              <Slider
                min={30}
                max={300}
                onChange={(value) => {
                  startTransition(() => {
                    dispatch({ type: "setBasicDistence", payload: +value });
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"根节点X坐标"} name={["position", "x"]}>
              <Input
                type={"number"}
                onChange={(e) => {
                  startTransition(() => {
                    dispatch({
                      type: "setPosition",
                      payload: { x: +e.target.value, y: config.position.y },
                    });
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"根节点Y坐标"} name={["position", "y"]}>
              <Input
                type={"number"}
                onChange={(e) => {
                  dispatch({
                    type: "setPosition",
                    payload: { y: +e.target.value, x: config.position.x },
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"边宽度"} name={["edgeConfig", "strokeWidth"]}>
              <Slider
                min={0.1}
                max={3}
                step={0.01}
                onChange={(value) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: {
                        ...config.edgeConfig,
                        strokeWidth: +value,
                      },
                    });
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"边颜色"} name={["edgeConfig", "stroke"]}>
              <Input
                type={"color"}
                onChange={(e) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: { ...config.edgeConfig, stroke: e.target.value },
                    });
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label={"描述字体大小"}
              name={["edgeConfig", "descriptionSize"]}
            >
              <Slider
                min={8}
                max={30}
                step={1}
                onChange={(value) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: {
                        ...config.edgeConfig,
                        descriptionSize: +value,
                      },
                    });
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"描述字体颜色"} name={["edgeConfig", "descriptionColor"]}>
              <Input
                type={"color"}
                onChange={(e) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: { ...config.edgeConfig, descriptionColor: e.target.value },
                    });
                  });
                }}
              />
            </Form.Item>
            <Form.Item label={"边高亮颜色"} name={["edgeConfig", "hoveredColor"]}>
              <Input
                type={"color"}
                onChange={(e) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: { ...config.edgeConfig, hoveredColor: e.target.value },
                    });
                  });
                }}
              />
            </Form.Item>
            {/* <Form.Item label={"优化方案"} name={"dragRenderOptimization"}>
              <Select
                options={[
                  {
                    value: "react",
                    key: "react",
                  },
                  {
                    value: "dom",
                    key: "dom",
                  },
                ]}
                onChange={(value) => {
                  startTransition(() => {
                    dispatch({
                      type: "setDragRenderOptimization",
                      payload: value,
                    });
                  });
                }}
              />
            </Form.Item> */}
            <Form.Item
              label={"飞线效果"}
              name={["edgeConfig", "flyLineEffect"]}
            >
              <Select
                options={[
                  {
                    value: "arrow",
                    key: "arrow",
                  },
                  {
                    value: "line",
                    key: "line",
                  },
                ]}
                onChange={(value) => {
                  startTransition(() => {
                    dispatch({
                      type: "setEdgeConfig",
                      payload: { ...config.edgeConfig, flyLineEffect: value },
                    });
                  });
                }}
              />
            </Form.Item>
            <TypeConfig />
            <GenerateCode />
          </Form>
        </div>
      </Drawer>
    </>
  );
}

export default ControlPanel;
