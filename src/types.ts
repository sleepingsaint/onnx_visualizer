export interface ONNXNode{
    id: string;
    name: string;
    op: string;
}

export interface ONNXMetadata {
   nodes: ONNXNode[],
   edges: [string, string][] 
}