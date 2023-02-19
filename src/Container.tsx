import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import ReactFlow, { Background, Controls, MiniMap, useReactFlow } from "reactflow";
import LayerNode from "./LayerNode";
import useStore from "./store";
import { ONNXMetadata } from "./types";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled";
import CustomEdge from "./CustomEdge";
import { toast } from "react-toastify";

function Container() {
  const reactFlowInstance = useReactFlow();

  const { nodes, edges, count, isLayoutDone, updateLayoutStatus, onNodesChange, onEdgesChange } = useStore();
  const nodeTypes = useMemo(() => ({ layerNode: LayerNode }), []);
  const edgeTypes = useMemo(() => ({ layerEdge: CustomEdge }), []);

  const { isLoading, error, data } = useQuery<ONNXMetadata>("onnx-data", () =>
    fetch("http://localhost:8081/").then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      onNodesChange(
        data.nodes.map((node) => ({
          item: {
            id: node.id,
            data: {
              label: node.op,
            },
            type: "layerNode",
            position: {
              x: window.innerWidth * 2,
              y: window.innerHeight * 2,
            },
          },
          type: "add",
        }))
      );

      onEdgesChange(
        data.edges.map((edge) => ({
          item: {
            id: edge[0] + "-" + edge[1],
            source: edge[0],
            target: edge[1],
            type: "layerEdge",
          },
          type: "add",
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (count > 0 && count == nodes.length) {
      const elk = new ELK();
      const graph: ElkNode = {
        id: "root",
        layoutOptions: { "elk.algorithm": "layered", "elk.direction": "DOWN" },
        children: nodes.map((node) => ({
          id: node.id,
          width: node.width!,
          height: node.height!,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };

      elk
        .layout(graph)
        .then((graph) => {
          if (graph && graph.children && graph.edges) {
            onNodesChange(
              graph.children.map((child) => ({
                id: child.id,
                type: "position",
                position: {
                  x: child.x!,
                  y: child.y!,
                },
              }))
            );

            onEdgesChange(
              graph.edges.map((edge) => ({
                type: "reset",
                item: {
                  id: edge.id,
                  source: edge.sources[0],
                  target: edge.targets[0],
                  data: edge.sections,
                  type: "layerEdge",
                  markerEnd: "triangle",
                },
              }))
            );
          }
          updateLayoutStatus(true);
        })
        .catch(console.error);
    }
  }, [count]);

  useEffect(() => {
    if (isLayoutDone) {
      reactFlowInstance.fitView();
      toast.dismiss();
    }
  }, [isLayoutDone, nodes]);

  return (
    <>
      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00" />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        maxZoom={1000}
        minZoom={0.00001}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </>
  );
}

export default Container;
