import { useMutation } from '@tanstack/react-query';
import { analyzeYouTubeVideo, saveToNotion } from '../services/api';
import { YouTubeFormData, AnalysisResult } from '../types';

export function useYouTubeAnalysis() {
  return useMutation<AnalysisResult, Error, YouTubeFormData>({
    mutationFn: analyzeYouTubeVideo,
  });
}

export function useSaveToNotion() {
  return useMutation<{ notionPageUrl: string }, Error, { videoId: string; pageId?: string }>({
    mutationFn: ({ videoId, pageId }) => saveToNotion(videoId, pageId),
  });
}