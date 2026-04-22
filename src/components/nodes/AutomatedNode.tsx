import { NodeProps } from 'reactflow';
import { NodeRenderer } from '../NodeRenderer';

export const AutomatedNode = ({ id, data, isConnectable }: NodeProps) => {
  return (
    <NodeRenderer id={id} title={data.title || 'Automated Action'} type="automated" isConnectable={isConnectable}>
      <div className="flex flex-col gap-1">
        {data.action ? (
          <span className="text-[10px] font-mono break-all text-orange-700 bg-orange-100 px-1 py-0.5 rounded">
            ⚡ {data.action}
          </span>
        ) : (
          <span className="text-[10px] text-gray-400 italic">No action mapped</span>
        )}
      </div>
    </NodeRenderer>
  );
};
