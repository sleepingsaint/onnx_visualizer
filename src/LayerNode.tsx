import { Handle, NodeProps, Position } from "reactflow";
import useMeasure from "react-use-measure";
import { useEffect } from "react";
import useStore from "./store";
import { Initializer, ONNXNode } from "./types";

function LayerNode(props: NodeProps<ONNXNode>) {
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
    <div ref={ref} onClick={() => console.log(props.data)}>
      <Handle type="target" position={Position.Top} />
      <div style={{ border: "2px solid grey", borderRadius: "5px" }}>
        <div style={{background: "grey", color: "white", padding: "5px"}}>{props.data.op}</div>

        {props.data.initializers && props.data.initializers.length > 0 && (
          <div style={{padding: "5px"}}>
            {props.data.initializers.map((init, idx) => (
              <p key={`${init.name}-${idx}`}>
                <strong>{init.name}</strong>
                {init.data != null ? `=${init.data}` : `<${init.dims.join("x")}>`}
              </p>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default LayerNode;
