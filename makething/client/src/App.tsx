import React, { useState } from "react";
import { PromptInput } from "./components/PromptInput";
import { ResultDisplay } from "./components/ResultDisplay";

function App() {
  const [results, setResults] = useState<Array<{ id: string; url: string }>>(
    []
  );
  const [error, setError] = useState<string>("");

  const handleResult = (result: any) => {
    setResults(result.results);
    setError("");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          YouTube to Notion
        </h1>
        <p className="text-center text-gray-600 mb-8">
          원하는 내용을 자연스럽게 입력하세요. Claude가 YouTube 영상을 찾아서
          Notion에 저장합니다.
        </p>

        <PromptInput onResult={handleResult} onError={handleError} />

        {error && (
          <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        <ResultDisplay results={results} />
      </div>
    </div>
  );
}

export default App;
