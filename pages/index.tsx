import type { NextPage } from "next";
import KnowledgeGraphCanvas from "components/KnowledgeGraphCanvas";
import ControlPanel from "components/ControlPanel";
import ConfigController from "components/ConfigController";
import "react-knowledge-graph/KnowledgeGraph/index.css";

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
