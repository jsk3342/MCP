import { AnalysisResult } from '../types';
import { useSaveToNotion } from '../hooks/useYouTubeAnalysis';
import { useState } from 'react';

interface ResultSectionProps {
  result: AnalysisResult;
}

const ResultSection = ({ result }: ResultSectionProps) => {
  const [notionPageId, setNotionPageId] = useState('');
  const { mutate: saveToNotion, isPending, isSuccess, data } = useSaveToNotion();
  
  const handleSaveToNotion = () => {
    // Extract videoId from the result somehow
    const videoId = result.videoInfo.title; // This is a placeholder, you'd need the actual ID
    saveToNotion({ videoId, pageId: notionPageId || undefined });
  };
  
  if (result.error) {
    return (
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-medium text-red-800">Error</h3>
        <p className="mt-1 text-red-700">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
        
        {/* Video Information */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {result.videoInfo.thumbnailUrl && (
            <img 
              src={result.videoInfo.thumbnailUrl} 
              alt={result.videoInfo.title} 
              className="w-full md:w-72 rounded-md"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold">{result.videoInfo.title}</h3>
            <p className="text-gray-500">{result.videoInfo.channelTitle}</p>
            <p className="text-sm text-gray-500">
              {new Date(result.videoInfo.publishedAt).toLocaleDateString()} • 
              {result.videoInfo.viewCount} views • 
              {result.videoInfo.likeCount} likes
            </p>
            <p className="mt-2 text-sm">{result.videoInfo.description}</p>
          </div>
        </div>
        
        {/* Summary */}
        {result.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="mb-4">{result.summary.summary}</p>
            
            <h4 className="font-semibold mb-1">Main Points</h4>
            <ul className="list-disc pl-5 mb-4">
              {result.summary.mainPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {result.summary.topics.map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Transcript Preview */}
        {result.transcript && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Transcript Preview</h3>
            <div className="max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-md text-sm">
              {result.transcript.text.slice(0, 500)}...
            </div>
          </div>
        )}
        
        {/* Notion Integration */}
        {result.notionPageUrl ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800">Saved to Notion</h3>
            <p className="mt-1">
              <a 
                href={result.notionPageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View in Notion
              </a>
            </p>
          </div>
        ) : isSuccess && data?.notionPageUrl ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800">Saved to Notion</h3>
            <p className="mt-1">
              <a 
                href={data.notionPageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View in Notion
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Notion Page ID (optional)"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={notionPageId}
                onChange={(e) => setNotionPageId(e.target.value)}
              />
              <button
                onClick={handleSaveToNotion}
                disabled={isPending}
                className={`py-2 px-4 rounded-md text-white font-medium 
                  ${isPending 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
              >
                {isPending ? 'Saving...' : 'Save to Notion'}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to create a new page in your default workspace
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultSection;