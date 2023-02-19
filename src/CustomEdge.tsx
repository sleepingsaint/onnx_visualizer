import { ElkEdgeSection } from "elkjs";
import { useEffect, useState } from "react";
import { EdgeProps } from "reactflow";

function CustomEdge(props: EdgeProps<ElkEdgeSection[]>) {
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    let _path = "";
    if (props.data && props.data && props.data.length > 0) {
      for (let s = 0; s < props.data.length; s++) {
        let section = props.data[s];

        _path += `M ${section.startPoint.x} ${section.startPoint.y} `;
        if (section.bendPoints) {
          for (let i = 0; i < section.bendPoints.length; i++) {
            let bendpoint = section.bendPoints[i];
            _path += `L ${bendpoint.x} ${bendpoint.y} `;
          }
        }
        _path += `L ${section.endPoint.x} ${section.endPoint.y - 7.5}`;
      }
    }
    setPath(_path);
  }, [props.data]);

  return (
    <>
      <path
        id={props.id}
        style={props.style}
        markerEnd={props.markerEnd}
        className={"react-flow__edge-path"}
        d={path}
        fill="none"
        strokeWidth={5}
      />
    </>
  );
}

export default CustomEdge;
