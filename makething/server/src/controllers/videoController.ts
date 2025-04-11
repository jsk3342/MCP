import { Request, Response, NextFunction } from 'express';
import { 
  getVideoInfo, 
  getVideoTranscript, 
  analyzeTranscript,
  saveAnalysisToNotion
} from '../services/mcpService';
import { YouTubeFormData, AnalysisResult } from '../types';

/**
 * Analyze a YouTube video
 */
export const analyzeVideo = async (
  req: Request<{}, {}, YouTubeFormData>, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { videoUrl, notionPageId, saveToNotion } = req.body;

    // Validate input
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Get video info
    const videoInfo = await getVideoInfo(videoUrl);

    // Get and analyze transcript
    const transcript = await getVideoTranscript(videoUrl);
    const summary = transcript.text 
      ? await analyzeTranscript(transcript)
      : undefined;

    let result: AnalysisResult = { videoInfo };
    
    // Add transcript and summary if available
    if (transcript.text) {
      result.transcript = transcript;
    }
    
    if (summary) {
      result.summary = summary;
    }

    // Save to Notion if requested
    if (saveToNotion && summary) {
      const notionPageUrl = await saveAnalysisToNotion(
        videoInfo, 
        summary, 
        transcript,
        notionPageId
      );
      
      result.notionPageUrl = notionPageUrl;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Save analysis to Notion
 */
export const saveToNotion = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { videoId, pageId } = req.body;

    // Validate input
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    // In a real implementation, you would:
    // 1. Retrieve saved analysis from database or recreate it
    // 2. Save to Notion using Notion MCP

    // For now, return a mock response
    const notionPageUrl = `https://notion.so/${pageId || 'new-page-' + Date.now()}`;

    res.json({ notionPageUrl });
  } catch (error) {
    next(error);
  }
};