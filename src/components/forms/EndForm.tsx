import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export const EndForm: React.FC<{ id: string, data: any }> = ({ id, data }) => {
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateNodeData(id, { [e.target.name]: value });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
        <input name="title" value={data.title || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Completion Message</label>
        <input name="message" value={data.message || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Workflow completed successfully" />
      </div>
      <div className="flex items-center pt-2">
        <input type="checkbox" name="summaryFlag" checked={!!data.summaryFlag} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label className="ml-2 block text-sm font-medium text-gray-800">Generate Post-Execution Summary Report</label>
      </div>
    </div>
  );
};
