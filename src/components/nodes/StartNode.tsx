import { NodeProps } from 'reactflow';
import { NodeRenderer } from '../NodeRenderer';

export const StartNode = ({ id, data, isConnectable }: NodeProps) => {
  return (
    <NodeRenderer id={id} title={data.title || 'Start'} type="start" isConnectable={isConnectable} inputs={0} outputs={1}>
      <p className="italic text-gray-500">Initiates the workflow</p>
    </NodeRenderer>
  );
};
