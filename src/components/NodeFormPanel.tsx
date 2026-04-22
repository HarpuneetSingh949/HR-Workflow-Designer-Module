import React from 'react';
import { useNodes } from '../hooks/useNodes';
import { StartForm } from './forms/StartForm';
import { TaskForm } from './forms/TaskForm';
import { ApprovalForm } from './forms/ApprovalForm';
import { AutomatedForm } from './forms/AutomatedForm';
import { EndForm } from './forms/EndForm';
import { Settings, Trash2 } from 'lucide-react';

export const NodeFormPanel: React.FC = () => {
  const { selectedNode, deleteNode } = useNodes();

  if (!selectedNode) {
    return null;
  }

  const renderForm = () => {
    switch (selectedNode.type) {
      case 'start': return <StartForm id={selectedNode.id} data={selectedNode.data} />;
      case 'task': return <TaskForm id={selectedNode.id} data={selectedNode.data} />;
      case 'approval': return <ApprovalForm id={selectedNode.id} data={selectedNode.data} />;
      case 'automated': return <AutomatedForm id={selectedNode.id} data={selectedNode.data} />;
      case 'end': return <EndForm id={selectedNode.id} data={selectedNode.data} />;
      default: return <div className="text-sm text-gray-500">Form configuration unavailable.</div>;
    }
  };

  return (
    <div className="w-[320px] bg-white border-l border-slate-100 flex flex-col h-full z-10">
      <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">Configuration</h3>
            <p className="text-[11px] font-medium text-slate-500 capitalize mt-1 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded-full inline-block">{selectedNode.type} Node</p>
          </div>
        </div>
        <button 
          onClick={() => deleteNode(selectedNode.id)} 
          className="text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs font-semibold p-2 rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center justify-center"
          title="Delete Node"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="mb-6 pb-5 border-b border-slate-100">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">System ID</label>
          <div className="text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg font-mono break-all border border-slate-100">
            {selectedNode.id}
          </div>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};
