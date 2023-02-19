import { Handle, NodeProps, Position } from "reactflow";
import useMeasure from "react-use-measure";
import { useEffect } from "react";
import useStore from "./store";

function LayerNode(props: NodeProps) {
  const [ref, { height, width }] = useMeasure();
  const { updateDims } = useStore();

  useEffect(() => {
    if (height > 0 && width > 0) {
      updateDims([
        {
          id: props.id,
          type: "dimensions",
          dimensions: {
            height,
            width,
          },
        },
      ]);
    }
  }, [height, width]);

  return (
    <div ref={ref}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: "10px", border: "2px solid grey", borderRadius: "5px" }}>
        <label htmlFor="text">{props.data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default LayerNode;
