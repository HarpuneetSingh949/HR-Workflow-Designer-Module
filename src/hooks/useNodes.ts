import { useWorkflowStore } from '../store/workflowStore';

export const useNodes = () => {
  const { nodes, selectedNodeId, addNode, deleteNode, updateNodeData } = useWorkflowStore();

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return {
    nodes,
    selectedNode,
    addNode,
    deleteNode,
    updateNodeData
  };
};
