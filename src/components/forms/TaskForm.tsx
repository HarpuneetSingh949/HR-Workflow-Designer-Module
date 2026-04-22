import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export const TaskForm: React.FC<{ id: string, data: any }> = ({ id, data }) => {
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateNodeData(id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Title *</label>
        <input name="title" value={data.title || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
        <textarea name="description" value={data.description || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Assignee Email / Role</label>
        <input name="assignee" value={data.assignee || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Due Date</label>
        <input type="date" name="dueDate" value={data.dueDate || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Custom Data (JSON)</label>
        <textarea 
          onChange={(e) => {
            try {
               const parsed = JSON.parse(e.target.value);
               updateNodeData(id, { customKV: parsed });
            } catch(err) {}
          }} 
          defaultValue={JSON.stringify(data.customKV || {}, null, 2)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-xs font-mono h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        />
      </div>
    </div>
  );
};
