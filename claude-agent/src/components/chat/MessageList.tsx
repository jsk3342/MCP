import React, { useEffect, useRef } from "react";
import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: MessageProps[];
  isProcessing: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          role={message.role}
          timestamp={message.timestamp}
        />
      ))}
      
      {isProcessing && (
        <div className="flex w-full justify-start mb-4">
          <div className="max-w-[80%] rounded-lg p-4 bg-secondary text-secondary-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></div>
              <span className="ml-2 text-sm">Claude가 처리 중입니다...</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
