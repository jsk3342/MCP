import React from "react";

interface ResultDisplayProps {
  results: Array<{
    id: string;
    url: string;
  }>;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  if (!results.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">처리 결과</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={result.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600">결과 #{index + 1}</span>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Notion에서 보기
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
