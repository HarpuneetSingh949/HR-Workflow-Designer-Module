import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export const StartForm: React.FC<{ id: string, data: any }> = ({ id, data }) => {
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
        <input name="title" value={data.title || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Metadata (JSON)</label>
        <textarea 
          onChange={(e) => {
            try {
               const parsed = JSON.parse(e.target.value);
               updateNodeData(id, { metadataKV: parsed });
            } catch(err) { /* ignore invalid json while typing */ }
          }} 
          defaultValue={JSON.stringify(data.metadataKV || {}, null, 2)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-xs font-mono h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder='{"department": "HR"}'
        />
      </div>
    </div>
  );
};
