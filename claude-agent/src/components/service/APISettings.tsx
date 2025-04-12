import React, { useState } from "react";
import ServiceConnector from "./ServiceConnector";

const APISettings: React.FC = () => {
  const [isClaudeConnected, setIsClaudeConnected] = useState(false);
  const [claudeApiKey, setClaudeApiKey] = useState("");

  const handleClaudeConnect = (key: string) => {
    setClaudeApiKey(key);
    setIsClaudeConnected(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">API 설정</h2>
      
      <ServiceConnector
        serviceName="Claude API"
        onConnect={handleClaudeConnect}
        isConnected={isClaudeConnected}
      />
    </div>
  );
};

export default APISettings;
