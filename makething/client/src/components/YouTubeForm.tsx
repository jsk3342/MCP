import { useForm } from 'react-hook-form';
import { YouTubeFormData, AnalysisResult } from '../types';
import { useYouTubeAnalysis } from '../hooks/useYouTubeAnalysis';

interface YouTubeFormProps {
  setResult: (result: AnalysisResult | null) => void;
}

const YouTubeForm = ({ setResult }: YouTubeFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<YouTubeFormData>({
    defaultValues: {
      videoUrl: '',
      notionPageId: '',
      saveToNotion: false
    }
  });
  
  const saveToNotion = watch('saveToNotion');
  
  const { mutate, isPending } = useYouTubeAnalysis();
  
  const onSubmit = (data: YouTubeFormData) => {
    setResult(null);
    mutate(data, {
      onSuccess: (result) => {
        setResult(result);
      },
      onError: (error) => {
        console.error('Analysis error:', error);
        setResult({
          videoInfo: {
            title: '',
            description: '',
            channelTitle: '',
            publishedAt: '',
            viewCount: '',
            likeCount: '',
            thumbnailUrl: ''
          },
          error: error.message
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Video URL
        </label>
        <input
          id="videoUrl"
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          className={`w-full p-2 border rounded-md ${errors.videoUrl ? 'border-red-500' : 'border-gray-300'}`}
          {...register('videoUrl', { 
            required: 'YouTube URL is required',
            pattern: {
              value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
              message: 'Enter a valid YouTube URL'
            }
          })}
        />
        {errors.videoUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="saveToNotion"
          type="checkbox"
          className="h-4 w-4 text-blue-600 rounded border-gray-300"
          {...register('saveToNotion')}
        />
        <label htmlFor="saveToNotion" className="ml-2 block text-sm text-gray-700">
          Save analysis to Notion
        </label>
      </div>

      {saveToNotion && (
        <div>
          <label htmlFor="notionPageId" className="block text-sm font-medium text-gray-700 mb-1">
            Notion Page ID (optional)
          </label>
          <input
            id="notionPageId"
            type="text"
            placeholder="Enter Notion page ID to save to a specific page"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('notionPageId')}
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to create a new page in your default workspace
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${isPending 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
      >
        {isPending ? 'Analyzing...' : 'Analyze Video'}
      </button>
    </form>
  );
};

export default YouTubeForm;