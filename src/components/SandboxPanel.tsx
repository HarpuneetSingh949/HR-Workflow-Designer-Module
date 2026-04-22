import React, { useState } from 'react';
import { useWorkflow } from '../hooks/useWorkflow';
import { Cpu, Play, Download, Upload } from 'lucide-react';

export const SandboxPanel: React.FC = () => {
  const { validate, serialize, importWorkflow } = useWorkflow();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    const { isValid, errors } = validate();
    if (!isValid) {
      alert(`Validation Errors:\n\n${errors.join('\n')}`);
      return;
    }

    setLoading(true);
    setLogs([]); // Reset logs
    try {
      const response = await fetch('/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: serialize()
      });
      const data = await response.json();
      setLogs(data.steps || []);
    } catch (e) {
      console.error(e);
      alert('Network error during simulation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[340px] bg-white border-l border-slate-100 flex flex-col h-full z-10">
      <div className="p-6 pb-4 border-b border-slate-100 flex items-center gap-2">
        <Cpu className="w-5 h-5 text-slate-400" />
        <div>
          <h2 className="text-base font-semibold text-slate-800 tracking-tight mb-1">Simulator</h2>
          <p className="text-[11px] text-slate-500 leading-tight">Test logic & export schema</p>
        </div>
      </div>
      
      <div className="p-5 flex-grow overflow-y-auto flex flex-col gap-6">
        <button 
          onClick={handleSimulate} 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl shadow-[0_2px_10px_-2px_rgba(37,99,235,0.3)] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm tracking-tight transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
             <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Simulating Engine...</>
          ) : (
            <><Play className="w-3.5 h-3.5 fill-current" /> Run Simulation</>
          )}
        </button>
        
        <div className="flex flex-col flex-1">
          <h4 className="font-semibold text-[13px] text-slate-700 mb-3 tracking-tight">Execution Pipeline</h4>
          <div className="bg-slate-50 text-slate-700 p-4 rounded-xl text-[11px] h-64 overflow-y-auto font-mono border border-slate-200 shadow-inner">
            {logs.length === 0 ? (
              <span className="text-slate-400 italic">No execution trace available.</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-3 pb-3 border-b border-slate-200 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-semibold text-slate-800">[{log.node}]</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${log.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="text-slate-600 pl-2.5 border-l-2 border-slate-300">{log.logs}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-end mb-3">
            <h4 className="font-semibold text-[13px] text-slate-700 tracking-tight">Schema Export</h4>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(serialize());
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download", "workflow.json");
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
              className="flex-1 bg-white text-slate-700 border border-slate-200 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 font-semibold text-[13px] transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <label className="flex-1 bg-slate-50 text-slate-700 border border-slate-200 py-2.5 rounded-xl shadow-sm hover:bg-slate-100 hover:border-slate-300 font-semibold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              Upload
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const json = JSON.parse(event.target?.result as string);
                      if (json.nodes && json.edges) {
                        importWorkflow(json.nodes, json.edges);
                      } else {
                        alert("Invalid JSON format");
                      }
                    } catch (err) {
                      alert("Failed to parse JSON");
                    }
                  };
                  reader.readAsText(file);
                  e.target.value = ''; // Reset input
                }} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
