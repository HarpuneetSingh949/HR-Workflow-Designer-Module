import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { NodeFormPanel } from '../components/NodeFormPanel';
import { SandboxPanel } from '../components/SandboxPanel';
import { GitFork } from 'lucide-react';

export const WorkflowDesignerPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between z-20 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-100">
            <GitFork className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">HR Designer</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">
            v1.0.0
          </span>
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center text-xs font-bold text-slate-600">
            AD
          </div>
        </div>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <Sidebar />
        <WorkflowCanvas />
        <NodeFormPanel />
        <SandboxPanel />
      </main>
    </div>
  );
};
