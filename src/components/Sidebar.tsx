import React from 'react';
import { Play, ClipboardList, CheckCircle, Bot, Square } from 'lucide-react';

const nodeTypes = [
  { type: 'start', label: 'Start', desc: 'Entry point of workflow', accent: 'bg-emerald-500', icon: Play },
  { type: 'task', label: 'Task', desc: 'Manual user action', accent: 'bg-blue-500', icon: ClipboardList },
  { type: 'approval', label: 'Approval', desc: 'Review & approve', accent: 'bg-violet-500', icon: CheckCircle },
  { type: 'automated', label: 'Automated', desc: 'System action', accent: 'bg-amber-500', icon: Bot },
  { type: 'end', label: 'End', desc: 'Terminal point', accent: 'bg-rose-500', icon: Square },
];

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-full z-10">
      <div className="p-6 pb-4">
        <h2 className="text-base font-semibold text-slate-800 tracking-tight mb-1">Workflows</h2>
        <p className="text-[11px] text-slate-500 leading-tight">Drag nodes to canvas</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="p-3 border border-slate-200 rounded-xl cursor-grab transition-all bg-white flex flex-col gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-md group"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <div className="flex items-center gap-2 font-semibold text-[13px] text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
              <node.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              {node.label}
              <div className={`w-1.5 h-1.5 rounded-full ${node.accent} ml-auto`} />
            </div>
            <div className="text-[11px] text-slate-500">{node.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
