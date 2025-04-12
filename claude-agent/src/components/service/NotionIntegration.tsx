import React, { useState } from "react";
import ServiceConnector from "./ServiceConnector";
import { Button } from "../ui/button";

const NotionIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleConnect = (key: string) => {
    setApiKey(key);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setApiKey("");
    setIsConnected(false);
  };

  return (
    <div className="space-y-4">
      <ServiceConnector
        serviceName="Notion"
        onConnect={handleConnect}
        isConnected={isConnected}
      />
      
      {isConnected && (
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-medium">Notion 설정</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">페이지 액세스 허용</span>
              <span className="text-green-600 text-sm">활성화됨</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">데이터베이스 액세스 허용</span>
              <span className="text-green-600 text-sm">활성화됨</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleDisconnect}
            className="w-full"
          >
            연결 해제
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotionIntegration;
