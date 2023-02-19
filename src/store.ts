import { create } from 'zustand';
import {
    Node,
    Edge,
    OnNodesChange,
    NodeChange,
    applyNodeChanges,
    OnEdgesChange,
    EdgeChange,
    applyEdgeChanges
} from 'reactflow';

interface StoreInterface {
    nodes: Node[],
    edges: Edge[],
    count: number,
    isLayoutDone: boolean,
    updateDims: OnNodesChange,
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    updateLayoutStatus: (change: boolean) => void
}

const useStore = create<StoreInterface>()((set, get) => ({
    nodes: [],
    edges: [],
    count: 0,
    isLayoutDone: false,
    updateDims: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
            count: get().count + 1
        });
    },
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges)
        });
    },
    updateLayoutStatus: (change: boolean) => {
        set({
            isLayoutDone: change
        })
    }
}))

export default useStore;