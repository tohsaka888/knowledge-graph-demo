import { Drawer, Form, Input, Slider } from "antd";
import React, { useContext, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { ConfigContext } from "./ConfigController";
import styles from "./index.module.css";

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
        title="知识图谱配置"
        placement={"left"}
        closable={false}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Form
          initialValues={config}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
        >
          <Form.Item label={"基础半径"} name={["basicDistence"]}>
            <Slider
              min={10}
              max={100}
              onChange={(value) => {
                dispatch({ type: "setBasicDistence", payload: +value });
              }}
            />
          </Form.Item>
          <Form.Item label={"根节点X坐标"} name={["position", "x"]}>
            <Input
              type={"number"}
              onChange={(e) => {
                dispatch({
                  type: "setPosition",
                  payload: { x: +e.target.value, y: config.position.y },
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
                dispatch({ type: "setStrokeWidth", payload: +value });
              }}
            />
          </Form.Item>
          <Form.Item label={"边颜色"} name={["edgeConfig", "stroke"]}>
            <Input
              type={"color"}
              onChange={(e) => {
                dispatch({ type: "setStroke", payload: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default ControlPanel;
