import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const agents = {
  // 1. IntentRecognizer: Detect user intent and convert to structured task JSON.
  intentRecognizer: async (input: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following user input and detect the intent, domain, and requirements. Output JSON format.
      Input: "${input}"`,
      config: {
        systemInstruction: "You are IntentRecognizer. Extract task type, domain, complexity, and key parameters. Output strictly JSON.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  },

  // 2. DeveloperVerifier: Perform developer KYC verification.
  developerVerifier: async (docs: string[]) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Verify the following developer KYC documents: ${docs.join(', ')}`,
      config: {
        systemInstruction: "You are DeveloperVerifier. Check for document validity, consistency, and potential fraud. Output JSON with status and reasoning.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  },

  // 3. SecurityAuditor: Scan agent code for vulnerabilities.
  securityAuditor: async (code: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Scan the following code for security risks, hardcoded keys, and prompt injection vectors.
      Code: "${code}"`,
      config: {
        systemInstruction: "You are SecurityAuditor. Output risk level (low, medium, high) and list of issues in JSON format.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  },

  // 4. AgentSelector: Match task to best agents using embeddings (simulated here with content matching).
  agentSelector: async (task: string, availableAgents: any[]) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Match this task: "${task}" to the best agents from this list: ${JSON.stringify(availableAgents)}`,
      config: {
        systemInstruction: "You are AgentSelector. Select the top 1-3 agents based on capability, cost, and performance. Output JSON array of agent IDs.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '[]');
  },

  // 5. CapabilityIndexer: Generate embeddings for agent descriptions (simulated).
  capabilityIndexer: async (description: string) => {
    const result = await ai.models.embedContent({
      model: 'gemini-embedding-2-preview',
      contents: [description],
    });
    return result.embeddings[0].values;
  },

  // 6. SecurityMonitor: Monitor runtime logs and detect anomalies.
  securityMonitor: async (logs: string[]) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these runtime logs for suspicious behavior: ${logs.join('\n')}`,
      config: {
        systemInstruction: "You are SecurityMonitor. Detect prompt injection, data exfiltration, or unauthorized API calls. Output JSON with threat level.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  },

  // 7. CollaborationAgent: Coordinate multiple agents using A2A protocol.
  collaborationOrchestrator: async (task: string, agentsList: string[]) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Coordinate the following agents: ${agentsList.join(', ')} to solve this task: "${task}".`,
      config: {
        systemInstruction: "You are CollaborationAgent. Assign roles, manage data flow between agents (A2A), and combine results into a unified solution."
      }
    });
    return response.text;
  }
};
