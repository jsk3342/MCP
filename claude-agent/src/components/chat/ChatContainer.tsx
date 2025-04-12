import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { MessageProps } from "./Message";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      role: "assistant",
      content: "안녕하세요! Claude Agent입니다. 무엇을 도와드릴까요?",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (content: string) => {
    // 사용자 메시지 추가
    const userMessage: MessageProps = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // API 요청 처리 시뮬레이션
    setIsProcessing(true);
    
    // 실제 구현에서는 여기서 API 호출이 이루어질 것
    setTimeout(() => {
      const assistantMessage: MessageProps = {
        role: "assistant",
        content: `"${content}"에 대한 응답입니다. 여기에 실제 Claude API 응답이 표시됩니다.`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="p-4 bg-primary text-primary-foreground">
        <h2 className="text-xl font-semibold">Claude Agent</h2>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList messages={messages} isProcessing={isProcessing} />
        
        <div className="p-4 border-t">
          <MessageInput 
            onSendMessage={handleSendMessage} 
            isProcessing={isProcessing} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
