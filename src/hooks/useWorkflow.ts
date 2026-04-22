import { useWorkflowStore } from '../store/workflowStore';
import { validateWorkflow } from '../features/workflow/validation';
import { serializeWorkflow } from '../features/workflow/serializer';

export const useWorkflow = () => {
  const { nodes, edges, importWorkflow } = useWorkflowStore();

  const validate = () => validateWorkflow(nodes, edges);
  const serialize = () => serializeWorkflow(nodes, edges);

  return { validate, serialize, importWorkflow };
};
