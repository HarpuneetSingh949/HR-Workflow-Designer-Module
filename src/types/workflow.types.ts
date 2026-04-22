import { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData {
  title: string;
  [key: string]: any;
}

export interface StartNodeData extends BaseNodeData {
  metadataKV?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customKV?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole?: string;
  threshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  action?: string;
  dynamicParams?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  message?: string;
  summaryFlag?: boolean;
}

export type WorkflowNode = Node<BaseNodeData>;
export type WorkflowEdge = Edge;

export interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  setNodes: (nodes: WorkflowNode[] | ((nodes: WorkflowNode[]) => WorkflowNode[])) => void;
  setEdges: (edges: WorkflowEdge[] | ((edges: WorkflowEdge[]) => WorkflowEdge[])) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<BaseNodeData>) => void;
  setSelectedNodeId: (id: string | null) => void;
  deleteNode: (id: string) => void;
  importWorkflow: (nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
  past: { nodes: WorkflowNode[], edges: WorkflowEdge[] }[];
  future: { nodes: WorkflowNode[], edges: WorkflowEdge[] }[];
  undo: () => void;
  redo: () => void;
}
