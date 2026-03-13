export interface Agent {
  agentId: string;
  developerId: string;
  name: string;
  logoUrl: string;
  category: 'Development' | 'Finance' | 'Marketing' | 'Creative' | 'Analysis' | 'Language';
  description: string;
  pricingModel: 'free' | 'freemium' | 'subscription';
  status: 'active' | 'suspended' | 'pending';
  capabilities: string[];
  securityScore: number;
  performance: {
    accuracy: number;
    latency: number;
    reliability: number;
  };
}

export interface User {
  userId: string;
  savedAgents: string[];
  subscriptionTier: 'free' | 'pro' | 'enterprise';
}

export interface Demo {
  demoId: string;
  category: string;
  input: string;
  output: string;
  agentId: string;
}
