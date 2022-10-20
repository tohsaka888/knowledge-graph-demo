import { Form, Input, Select, Slider } from "antd";
import React, { useContext, useState, useTransition } from "react";
import { ConfigContext } from "./ConfigController";
import styles from "./index.module.css";

function TypeConfig() {
  const [selectedValue, setSelectedValue] = useState<string>("根节点");
  const { dispatch } = useContext(ConfigContext)!;
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Select
        style={{ width: "100px", marginBottom: "8px" }}
        value={selectedValue}
        options={[
          {
            value: "根节点",
          },
          {
            value: "model",
          },
          {
            value: "data",
          },
          {
            value: "test",
          },
        ]}
        labelInValue
        onSelect={(option: any) => {
          setSelectedValue(option.value);
        }}
      />
      <span className={styles["form-title"]} style={{ marginLeft: "8px" }}>
        配置:
      </span>
      <Form.Item
        name={["typeConfig", selectedValue, "radius"]}
        label={"节点半径"}
      >
        <Slider
          min={10}
          max={50}
          onChange={(value) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: { type: selectedValue, option: "radius", value },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "typeSize"]}
        label={"类型文字大小"}
      >
        <Slider
          min={1}
          max={36}
          onChange={(value) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: { type: selectedValue, option: "typeSize", value },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "nameSize"]}
        label={"名称文字大小"}
      >
        <Slider
          min={1}
          max={36}
          onChange={(value) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: { type: selectedValue, option: "nameSize", value },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "fill"]}
        label={"节点颜色"}
      >
        <Input
          type={"color"}
          onChange={(e) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: {
                  type: selectedValue,
                  option: "fill",
                  value: e.target.value,
                },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "hoverStyle", "fill"]}
        label={"节点高亮颜色"}
      >
        <Input
          type={"color"}
          onChange={(e) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: {
                  type: selectedValue,
                  option: "hoverStyle",
                  value: {
                    fill: e.target.value,
                  },
                },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "typeColor"]}
        label={"类型文字颜色"}
      >
        <Input
          type={"color"}
          onChange={(e) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: {
                  type: selectedValue,
                  option: "typeColor",
                  value: e.target.value,
                },
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name={["typeConfig", selectedValue, "nameColor"]}
        label={"名称文字颜色"}
      >
        <Input
          type={"color"}
          onChange={(e) => {
            startTransition(() => {
              dispatch({
                type: "setTypeConfig",
                payload: {
                  type: selectedValue,
                  option: "nameColor",
                  value: e.target.value,
                },
              });
            });
          }}
        />
      </Form.Item>
    </>
  );
}

export default TypeConfig;
