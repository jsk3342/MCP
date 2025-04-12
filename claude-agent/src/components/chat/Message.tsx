import React from "react";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps {
  content: string;
  role: MessageRole;
  timestamp?: Date;
}

const Message: React.FC<MessageProps> = ({ content, role, timestamp }) => {
  const isUser = role === "user";
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        <div className="text-sm">{content}</div>
        {timestamp && (
          <div className="text-xs mt-1 opacity-70">
            {timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
