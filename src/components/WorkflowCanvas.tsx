import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, Panel, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../store/workflowStore';
import { StartNode } from './nodes/StartNode';
import { TaskNode } from './nodes/TaskNode';
import { ApprovalNode } from './nodes/ApprovalNode';
import { AutomatedNode } from './nodes/AutomatedNode';
import { EndNode } from './nodes/EndNode';
import DeletableEdge from './edges/DeletableEdge';
import dagre from 'dagre';
import { Wand2, Undo2, Redo2 } from 'lucide-react';

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 200;
  const nodeHeight = 100;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes, edges };
};

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const edgeTypes = {
  deletable: DeletableEdge,
};

export const WorkflowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNodeId, undo, redo, past, future } = useWorkflowStore();
  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
  }, [nodes, edges, setNodes]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        const { selectedNodeId, deleteNode } = useWorkflowStore.getState();
        if (selectedNodeId) {
          deleteNode(selectedNodeId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { title: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="flex-grow h-full relative" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={() => setSelectedNodeId(null)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: 'deletable' }}
          deleteKeyCode={null}
          fitView
          className="bg-slate-50"
        >
          <Background variant={BackgroundVariant.Dots} color="#cbd5e1" gap={24} size={2} />
          <Controls className="bg-white shadow-sm border border-slate-200 rounded overflow-hidden [&>button]:border-slate-100" />
          <MiniMap className="border border-slate-200 rounded-lg shadow-sm bg-white" maskColor="rgba(248, 250, 252, 0.7)" />
          <Panel position="top-right" className="flex gap-1 bg-white p-1.5 rounded-xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-slate-200">
            <button 
              onClick={onLayout} 
              className="px-3 py-1.5 rounded-lg hover:bg-slate-50 font-semibold text-xs text-slate-600 border-r border-slate-100 mr-1 flex items-center gap-1.5 transition-colors"
              title="Auto Layout"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Auto Layout
            </button>
            <button 
              onClick={undo} 
              disabled={past.length === 0}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 transition-colors flex items-center gap-1.5"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
            <button 
              onClick={redo} 
              disabled={future.length === 0}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 transition-colors flex items-center gap-1.5"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
              Redo
            </button>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
