import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/automations', () => {
    return HttpResponse.json([
      { id: 'api_trigger', name: 'Trigger External API' },
      { id: 'send_email', name: 'Send Email Notification' },
      { id: 'update_db', name: 'Update HR Database' },
      { id: 'notify_slack', name: 'Send Slack Alert' },
      { id: 'gen_document', name: 'Generate PDF Document' }
    ]);
  }),

  http.post('/simulate', async ({ request }) => {
    const body = await request.json() as any;
    
    // Simulate complex execution based on payload
    const executionSteps = body.nodes.map((node: any, index: number) => ({
      node: node.data.title || node.type,
      status: index === body.nodes.length - 1 ? 'completed' : 'success',
      logs: `Processed node ${node.id} successfully.`
    }));

    // Artificial delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    return HttpResponse.json({
      success: true,
      message: 'Simulation completed successfully',
      steps: executionSteps
    });
  })
];
