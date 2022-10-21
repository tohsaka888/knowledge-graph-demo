import React, {
  createContext,
  CSSProperties,
  useDeferredValue,
  useReducer,
} from "react";
import { ConfigProps } from "react-knowledge-graph";

const initialState: Omit<ConfigProps, "onExploreEnd" | "explore"> = {
  basicDistence: 30,
  position: { x: 0, y: 0 },
  width: "100vw",
  height: "100vh",
  node: {
    id: "node-0",
    type: "根节点",
    hasMore: true,
    direction: "root",
    name: "根节点",
  },
  edgeConfig: {
    hoveredColor: "#e27272",
    stroke: "#DEDEDE",
    strokeWidth: 1,
  },
  typeConfig: {
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
  },
};

type ActionType =
  | { type: "setPosition"; payload: { x: number; y: number } }
  | { type: "setBasicDistence"; payload: number }
  | { type: "setStrokeWidth"; payload: number }
  | { type: "setStroke"; payload: string }
  | {
      type: "setTypeConfig";
      payload: {
        type: string;
        option: string;
        value: string | number | CSSProperties;
      };
    };

function reducer(
  state: typeof initialState,
  action: ActionType
): Omit<ConfigProps, "onExploreEnd" | "explore"> {
  switch (action.type) {
    case "setBasicDistence":
      return { ...state, basicDistence: action.payload };
    case "setPosition":
      return { ...state, position: action.payload };
    case "setStrokeWidth":
      return {
        ...state,
        edgeConfig: {
          stroke: state.edgeConfig?.stroke,
          strokeWidth: action.payload,
        },
      };
    case "setStroke":
      return {
        ...state,
        edgeConfig: {
          ...state.edgeConfig,
          stroke: action.payload,
        },
      };
    case "setTypeConfig":
      const { type, option, value } = action.payload;
      return {
        ...state,
        typeConfig: {
          ...state.typeConfig,
          [type]: {
            ...state.typeConfig![type],
            [option]: value,
          },
        },
      };
    default:
      return initialState;
  }
}

type ConfigContextProps = {
  config: Omit<ConfigProps, "onExploreEnd" | "explore">;
  dispatch: React.Dispatch<ActionType>;
};

export const ConfigContext = createContext<ConfigContextProps | null>(null);

function ConfigController({ children }: { children: React.ReactNode }) {
  const [config, dispatch] = useReducer(reducer, initialState);
  const deferredConfig = useDeferredValue(config);
  return (
    <ConfigContext.Provider value={{ config: deferredConfig, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigController;
