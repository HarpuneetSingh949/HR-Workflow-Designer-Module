import React from 'react';
import { Handle, Position } from 'reactflow';
import { useWorkflowStore } from '../store/workflowStore';
import { validateWorkflow } from '../features/workflow/validation';
import { AlertCircle } from 'lucide-react';

interface NodeRendererProps {
  id: string;
  title: string;
  type: string;
  children: React.ReactNode;
  isConnectable: boolean;
  inputs?: number;
  outputs?: number;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({ 
  id, title, type, children, isConnectable, inputs = 1, outputs = 1 
}) => {
  const { selectedNodeId, setSelectedNodeId } = useWorkflowStore();
  const isSelected = selectedNodeId === id;
  const isInvalid = useWorkflowStore(state => validateWorkflow(state.nodes, state.edges).invalidNodeIds.includes(id));

  const typeColors: Record<string, { bg: string, border: string, text: string, accent: string }> = {
    start: { bg: 'bg-white', border: 'border-emerald-200', text: 'text-slate-700', accent: 'bg-emerald-500' },
    task: { bg: 'bg-white', border: 'border-blue-200', text: 'text-slate-700', accent: 'bg-blue-500' },
    approval: { bg: 'bg-white', border: 'border-violet-200', text: 'text-slate-700', accent: 'bg-violet-500' },
    automated: { bg: 'bg-white', border: 'border-amber-200', text: 'text-slate-700', accent: 'bg-amber-500' },
    end: { bg: 'bg-white', border: 'border-rose-200', text: 'text-slate-700', accent: 'bg-rose-500' },
  };

  const colors = typeColors[type] || typeColors.task;

  return (
    <div 
      className={`p-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] rounded-xl border ${isInvalid ? 'border-red-400 ring-2 ring-red-100' : isSelected ? 'border-blue-400 ring-2 ring-blue-50 shadow-md scale-[1.01]' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'} ${colors.bg} transition-all min-w-[220px] cursor-pointer relative bg-white`}
      onClick={() => setSelectedNodeId(id)}
    >
      {inputs > 0 && <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-slate-300 border-2 border-white rounded-full -mt-[1px]" />}
      
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2.5 h-2.5 rounded-full ${isInvalid ? 'bg-red-500' : colors.accent} ring-4 ring-slate-50`} />
        <div className={`font-semibold text-sm ${isInvalid ? 'text-red-600' : colors.text} tracking-tight`}>{title}</div>
        {isInvalid && <AlertCircle className="ml-auto w-3.5 h-3.5 text-red-500" />}
      </div>
      
      <div className="text-[11px] text-slate-500 font-medium">
        {children}
      </div>
      
      {outputs > 0 && <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-slate-300 border-2 border-white rounded-full -mb-[1px]" />}
    </div>
  );
};
