/*
 * @Author: tohsaka888
 * @Date: 2022-10-09 13:33:09
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:05:19
 * @Description: 请填写简介
 */
import type { NextPage } from "next";
import KnowledgeGraphCanvas from "components/KnowledgeGraphCanvas";
import ControlPanel from "components/ControlPanel";
import ConfigController from "components/ConfigController";

const Home: NextPage = () => {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        border: "1px solid #cecece",
        overflow: "hidden",
      }}
    >
      <ConfigController>
        <ControlPanel />
        <KnowledgeGraphCanvas />
      </ConfigController>
    </main>
  );
};

export default Home;