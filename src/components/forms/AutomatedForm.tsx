import React, { useEffect, useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export const AutomatedForm: React.FC<{ id: string, data: any }> = ({ id, data }) => {
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);
  const [actions, setActions] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    fetch('/automations')
      .then(res => res.json())
      .then(setActions)
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateNodeData(id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
        <input name="title" value={data.title || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Select API Action</label>
        <select name="action" value={data.action || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
          <option value="">Choose system action...</option>
          {actions.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Dynamic Parameters (JSON)</label>
        <textarea 
          onChange={(e) => {
            try {
               const parsed = JSON.parse(e.target.value);
               updateNodeData(id, { dynamicParams: parsed });
            } catch(err) {}
          }} 
          defaultValue={JSON.stringify(data.dynamicParams || {}, null, 2)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-xs font-mono h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder='{"payload": "dynamic"}'
        />
      </div>
    </div>
  );
};
