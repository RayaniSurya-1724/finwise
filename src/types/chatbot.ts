
export interface ChatMessageType {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  role: 'user' | 'assistant' | 'system';
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  value?: number;
  type?: string;
}

export interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    logprobs: null;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatBotProps {
  compact?: boolean;
}
