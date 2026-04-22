import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

export const ApprovalForm: React.FC<{ id: string, data: any }> = ({ id, data }) => {
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);

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
        <label className="block text-xs font-semibold text-gray-700 mb-1">Approver Role</label>
        <select name="approverRole" value={data.approverRole || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
          <option value="">Select a role...</option>
          <option value="Direct Manager">Direct Manager</option>
          <option value="HR Partner">HR Partner</option>
          <option value="Finance Director">Finance Director</option>
          <option value="Executive">Executive</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Approval Threshold (%)</label>
        <div className="flex items-center gap-2">
          <input type="number" min="1" max="100" name="threshold" value={data.threshold || 100} onChange={handleChange} className="w-24 rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          <span className="text-sm text-gray-500">% needed to pass</span>
        </div>
      </div>
    </div>
  );
};
