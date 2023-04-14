export interface Initializer{
    name: string;
    dims: number[];
    datatype: string;
    data?: any
}

export interface ONNXNode{
    id: string;
    name: string;
    op: string;
    initializers?: Initializer[],
    hasVariableParameter: boolean
}

export interface ONNXMetadata {
   nodes: ONNXNode[],
   edges: [string, string][] 
}