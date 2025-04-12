import { create } from "zustand";

interface ServiceState {
  claudeApiKey: string;
  notionApiKey: string;
  isClaudeConnected: boolean;
  isNotionConnected: boolean;
  setClaudeApiKey: (key: string) => void;
  setNotionApiKey: (key: string) => void;
  connectClaude: (key: string) => void;
  connectNotion: (key: string) => void;
  disconnectClaude: () => void;
  disconnectNotion: () => void;
}

const useServiceStore = create<ServiceState>((set) => ({
  claudeApiKey: "",
  notionApiKey: "",
  isClaudeConnected: false,
  isNotionConnected: false,
  
  setClaudeApiKey: (key) => 
    set({ claudeApiKey: key }),
  
  setNotionApiKey: (key) => 
    set({ notionApiKey: key }),
  
  connectClaude: (key) => 
    set({ claudeApiKey: key, isClaudeConnected: true }),
  
  connectNotion: (key) => 
    set({ notionApiKey: key, isNotionConnected: true }),
  
  disconnectClaude: () => 
    set({ claudeApiKey: "", isClaudeConnected: false }),
  
  disconnectNotion: () => 
    set({ notionApiKey: "", isNotionConnected: false }),
}));

export default useServiceStore;
