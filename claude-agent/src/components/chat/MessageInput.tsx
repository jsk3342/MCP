import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Textarea
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        className="min-h-[60px] resize-none"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!message.trim() || isProcessing}
        >
          {isProcessing ? "처리 중..." : "전송"}
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
