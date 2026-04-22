import { NodeProps } from 'reactflow';
import { NodeRenderer } from '../NodeRenderer';

export const TaskNode = ({ id, data, isConnectable }: NodeProps) => {
  return (
    <NodeRenderer id={id} title={data.title || 'Task'} type="task" isConnectable={isConnectable}>
      <div className="flex flex-col gap-1">
        {data.assignee ? (
          <span className="text-[10px] bg-blue-100 border border-blue-200 text-blue-800 px-1.5 py-0.5 rounded truncate font-medium">
            👤 {data.assignee}
          </span>
        ) : (
          <span className="text-[10px] text-gray-400">Unassigned</span>
        )}
        {data.dueDate && <span className="text-[10px] text-gray-600 font-mono mt-1">Due: {data.dueDate}</span>}
      </div>
    </NodeRenderer>
  );
};
