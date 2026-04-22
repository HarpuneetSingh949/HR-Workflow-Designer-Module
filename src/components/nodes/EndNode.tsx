import { NodeProps } from 'reactflow';
import { NodeRenderer } from '../NodeRenderer';

export const EndNode = ({ id, data, isConnectable }: NodeProps) => {
  return (
    <NodeRenderer id={id} title={data.title || 'End'} type="end" isConnectable={isConnectable} inputs={1} outputs={0}>
      <div className="flex flex-col gap-1">
        {data.message ? (
          <span className="text-[10px] truncate max-w-[140px] inline-block font-medium">"{data.message}"</span>
        ) : (
          <span className="text-[10px] text-gray-400 italic">Terminates workflow</span>
        )}
      </div>
    </NodeRenderer>
  );
};
