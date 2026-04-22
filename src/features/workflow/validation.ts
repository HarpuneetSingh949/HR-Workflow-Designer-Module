import { WorkflowNode, WorkflowEdge } from '../../types/workflow.types';

export const validateWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  const errors: string[] = [];
  const invalidNodeIds = new Set<string>();

  const startNodes = nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have at least one Start node.');
  }
  if (startNodes.length > 1) {
    errors.push('Workflow cannot have more than one Start node.');
    startNodes.forEach(n => invalidNodeIds.add(n.id));
  }

  // Check for disconnected graph
  const connectedNodeIds = new Set<string>();
  edges.forEach(e => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  const disconnectedNodes = nodes.filter(n => !connectedNodeIds.has(n.id) && nodes.length > 1);
  if (disconnectedNodes.length > 0) {
    errors.push('Workflow contains disconnected nodes. Ensure all logic paths are connected.');
    disconnectedNodes.forEach(n => invalidNodeIds.add(n.id));
  }

  return {
    isValid: errors.length === 0,
    errors,
    invalidNodeIds: Array.from(invalidNodeIds),
  };
};
