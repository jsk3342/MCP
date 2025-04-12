import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ServiceConnectorProps {
  serviceName: string;
  onConnect: (apiKey: string) => void;
  isConnected: boolean;
}

const ServiceConnector: React.FC<ServiceConnectorProps> = ({
  serviceName,
  onConnect,
  isConnected,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!apiKey.trim()) return;

    setIsLoading(true);

    // 실제 구현에서는 API 키 검증 등 연결 로직 구현
    setTimeout(() => {
      onConnect(apiKey);
      setIsLoading(false);
    }, 100);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">{serviceName} 연결</h3>

      {isConnected ? (
        <div className="flex items-center gap-2 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>연결됨</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor={`${serviceName.toLowerCase()}-api-key`}
              className="text-sm font-medium"
            >
              API 키
            </label>
            <Input
              id={`${serviceName.toLowerCase()}-api-key`}
              type="password"
              placeholder="API 키를 입력하세요"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <Button
            onClick={handleConnect}
            disabled={!apiKey.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "연결 중..." : "연결하기"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceConnector;
