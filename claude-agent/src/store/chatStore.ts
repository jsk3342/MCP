import { create } from "zustand";
import { MessageProps } from "../components/chat/Message";

interface ChatState {
  messages: MessageProps[];
  isProcessing: boolean;
  addMessage: (message: MessageProps) => void;
  setProcessing: (isProcessing: boolean) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      role: "assistant",
      content: "안녕하세요! Claude Agent입니다. 무엇을 도와드릴까요?",
      timestamp: new Date(),
    },
  ],
  isProcessing: false,
  
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  
  setProcessing: (isProcessing) => 
    set({ isProcessing }),
  
  clearMessages: () => 
    set({
      messages: [
        {
          role: "assistant",
          content: "대화가 초기화되었습니다. 무엇을 도와드릴까요?",
          timestamp: new Date(),
        },
      ],
    }),
}));

export default useChatStore;
