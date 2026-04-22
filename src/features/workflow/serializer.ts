import { WorkflowNode, WorkflowEdge } from '../../types/workflow.types';

export const serializeWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  return JSON.stringify({
    version: '1.0',
    timestamp: new Date().toISOString(),
    nodes: nodes.map(n => ({
      id: n.id,
      type: n.type,
      position: n.position,
      data: n.data
    })),
    edges: edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target
    }))
  }, null, 2);
};
