import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, EdgeChange, NodeChange } from 'reactflow';
import { WorkflowState, WorkflowNode } from '../types/workflow.types';

export const useWorkflowStore = create<WorkflowState>((set, get) => {
  const saveHistory = () => {
    const { nodes, edges, past } = get();
    const newPast = [...past, { nodes, edges }];
    if (newPast.length > 50) newPast.shift();
    return { past: newPast, future: [] };
  };

  return {
    nodes: [],
    edges: [],
    past: [],
    future: [],
    selectedNodeId: null,

    setNodes: (nodes) => set({ nodes: typeof nodes === 'function' ? nodes(get().nodes) : nodes }),
    setEdges: (edges) => set({ edges: typeof edges === 'function' ? edges(get().edges) : edges }),
    
    onNodesChange: (changes: NodeChange[]) => {
      const removedIds = changes.filter(c => c.type === 'remove').map(c => (c as any).id);
      const hasStructuralChange = changes.some(c => c.type === 'remove' || c.type === 'add');
      
      const nextNodes = applyNodeChanges(changes, get().nodes);
      const nextSelectedNodeId = removedIds.includes(get().selectedNodeId) ? null : get().selectedNodeId;

      if (hasStructuralChange) {
        set((state) => ({ 
          ...saveHistory(), 
          nodes: nextNodes,
          selectedNodeId: nextSelectedNodeId
        }));
      } else {
        set({ 
          nodes: nextNodes,
          selectedNodeId: nextSelectedNodeId
        });
      }
    },
    
    onEdgesChange: (changes: EdgeChange[]) => {
      const hasStructuralChange = changes.some(c => c.type === 'remove' || c.type === 'add');
      if (hasStructuralChange) {
        set((state) => ({ ...saveHistory(), edges: applyEdgeChanges(changes, state.edges) }));
      } else {
        set({ edges: applyEdgeChanges(changes, get().edges) });
      }
    },
    
    onConnect: (connection: Connection) => {
      set((state) => ({ ...saveHistory(), edges: addEdge(connection, state.edges) }));
    },
    
    addNode: (node: WorkflowNode) => {
      set((state) => ({ ...saveHistory(), nodes: [...state.nodes, node] }));
    },
    
    updateNodeData: (id: string, data: any) => {
      set((state) => ({
        ...saveHistory(),
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, data: { ...node.data, ...data } };
          }
          return node;
        }),
      }));
    },
    
    setSelectedNodeId: (id: string | null) => {
      set({ selectedNodeId: id });
    },
    
    deleteNode: (id: string) => {
      set((state) => ({
        ...saveHistory(),
        nodes: state.nodes.filter((node) => node.id !== id),
        edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
      }));
    },
    
    importWorkflow: (nodes, edges) => {
      set((state) => ({ ...saveHistory(), nodes, edges, selectedNodeId: null }));
    },

    undo: () => {
      const { past, future, nodes, edges } = get();
      if (past.length === 0) return;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      set({
        nodes: previous.nodes,
        edges: previous.edges,
        past: newPast,
        future: [{ nodes, edges }, ...future],
        selectedNodeId: null,
      });
    },

    redo: () => {
      const { past, future, nodes, edges } = get();
      if (future.length === 0) return;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      set({
        nodes: next.nodes,
        edges: next.edges,
        past: [...past, { nodes, edges }],
        future: newFuture,
        selectedNodeId: null,
      });
    }
  };
});
