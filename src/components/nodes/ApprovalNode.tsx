import { NodeProps } from 'reactflow';
import { NodeRenderer } from '../NodeRenderer';

export const ApprovalNode = ({ id, data, isConnectable }: NodeProps) => {
  return (
    <NodeRenderer id={id} title={data.title || 'Approval'} type="approval" isConnectable={isConnectable}>
      <div className="flex flex-col gap-1">
        {data.approverRole ? (
          <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
            Role: {data.approverRole}
          </span>
        ) : (
          <span className="text-[10px] text-gray-400">No role defined</span>
        )}
        {data.threshold && <span className="text-[10px] text-gray-600 font-mono mt-1">Requires: {data.threshold}%</span>}
      </div>
    </NodeRenderer>
  );
};
