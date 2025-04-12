import axios from "axios";

interface ClaudeRequestMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ClaudeRequest {
  model: string;
  messages: ClaudeRequestMessage[];
  max_tokens?: number;
  temperature?: number;
  system?: string;
}

interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
}

export const createClaudeClient = (apiKey: string) => {
  const client = axios.create({
    baseURL: "https://api.anthropic.com",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
  });

  const sendMessage = async (
    messages: ClaudeRequestMessage[],
    options: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      system?: string;
    } = {}
  ) => {
    const {
      model = "claude-3-haiku-20240307",
      maxTokens = 1000,
      temperature = 0.7,
      system = "당신은 도움이 되는 AI 비서 Claude입니다."
    } = options;

    const request: ClaudeRequest = {
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      system
    };

    try {
      const response = await client.post<ClaudeResponse>("/v1/messages", request);
      return response.data;
    } catch (error) {
      console.error("Claude API 요청 오류:", error);
      throw error;
    }
  };

  return {
    sendMessage,
  };
};

export type ClaudeClient = ReturnType<typeof createClaudeClient>;
