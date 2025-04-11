export interface YouTubeFormData {
  videoUrl: string;
  notionPageId?: string;
  saveToNotion: boolean;
}

export interface VideoInfo {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  thumbnailUrl: string;
}

export interface VideoTranscript {
  text: string;
  segments: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface AnalysisSummary {
  mainPoints: string[];
  summary: string;
  topics: string[];
  sentiment: string;
}

export interface AnalysisResult {
  videoInfo: VideoInfo;
  transcript?: VideoTranscript;
  summary?: AnalysisSummary;
  notionPageUrl?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}