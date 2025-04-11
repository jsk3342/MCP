import React, { useState } from "react";
import { processPrompt } from "../services/api";

interface PromptInputProps {
  onResult: (result: any) => void;
  onError: (error: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  onResult,
  onError,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const result = await processPrompt(prompt);
      onResult(result);
      setPrompt("");
    } catch (error) {
      onError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="원하는 내용을 자연스럽게 입력하세요. 예: '프로그래밍 기초 강의를 찾아서 요약해줘'"
          className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`px-6 py-3 rounded-lg text-white font-medium ${
            isLoading || !prompt.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "처리 중..." : "실행하기"}
        </button>
      </div>
    </form>
  );
};
