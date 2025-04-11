import axios from "axios";
import { VideoInfo, VideoTranscript, AnalysisSummary } from "../types";

/**
 * Direct YouTube API integration
 * This simulates what the MCP server would do, but directly in our service
 */

/**
 * Start Notion MCP server
 */
export const startNotionMCPServer = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    // For now, simulate Notion MCP server
    // In a real implementation, you would start the Notion MCP server
    console.log("Simulating Notion MCP server");

    // Simulate server startup time
    setTimeout(() => {
      resolve(8001); // Simulate port
    }, 1000);
  });
};

/**
 * Get video info using YouTube API directly
 */
export const getVideoInfo = async (videoUrl: string): Promise<VideoInfo> => {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Make API call directly to YouTube API
    const apiKey = process.env.YOUTUBE_API_KEY;
    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics`
    );

    if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
      throw new Error("Video not found");
    }

    const videoData = videoResponse.data.items[0];
    const snippet = videoData.snippet || {};
    const statistics = videoData.statistics || {};

    return {
      title: snippet.title || "Unknown Title",
      description: snippet.description || "",
      channelTitle: snippet.channelTitle || "Unknown Channel",
      publishedAt: snippet.publishedAt || new Date().toISOString(),
      viewCount: statistics.viewCount?.toString() || "0",
      likeCount: statistics.likeCount?.toString() || "0",
      thumbnailUrl:
        snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || "",
    };
  } catch (error) {
    console.error("Error getting video info:", error);
    throw new Error("Failed to get video information");
  }
};

/**
 * Get video transcript using YouTube API
 * Note: Direct transcript access requires 3rd party libraries
 * This is a simplified mock implementation
 */
export const getVideoTranscript = async (
  videoUrl: string
): Promise<VideoTranscript> => {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // In a real implementation, you would use a transcript API
    // For now, we'll return mock data
    console.log(`Getting transcript for video ID: ${videoId}`);

    return {
      text: "This is a mock transcript. In a real implementation, you would use YouTube data API or a third-party service to get the actual transcript.",
      segments: [
        { start: 0, end: 10, text: "This is a mock transcript segment 1." },
        { start: 10, end: 20, text: "This is a mock transcript segment 2." },
        { start: 20, end: 30, text: "This is a mock transcript segment 3." },
      ],
    };
  } catch (error) {
    console.error("Error getting video transcript:", error);
    // Return empty transcript rather than failing
    return {
      text: "",
      segments: [],
    };
  }
};

/**
 * Analyze transcript to generate summary
 * This is a mock implementation - in a real app, you'd use an LLM or Claude API
 */
export const analyzeTranscript = async (
  transcript: VideoTranscript
): Promise<AnalysisSummary> => {
  // Mock implementation - in a real implementation, you'd use an LLM or other analysis
  return {
    summary:
      "This is a placeholder summary. In a real implementation, you would use Claude API or another LLM to generate a meaningful summary of the video content.",
    mainPoints: [
      "This is the first key point from the video",
      "This is the second key point from the video",
      "This is the third key point from the video",
    ],
    topics: ["Sample Topic 1", "Sample Topic 2", "Sample Topic 3"],
    sentiment: "neutral",
  };
};

/**
 * Save analysis to Notion
 * This is a mock implementation - in a real app, you'd use the Notion MCP
 */
export const saveAnalysisToNotion = async (
  videoInfo: VideoInfo,
  summary: AnalysisSummary,
  transcript: VideoTranscript,
  pageId?: string
): Promise<string> => {
  // In a real implementation, you would:
  // 1. Start Notion MCP server
  // 2. Use Notion API to create or update a page
  // 3. Return the URL of the created/updated page

  // For now, just return a mock URL
  return `https://notion.so/${pageId || "new-page-" + Date.now()}`;
};

/**
 * Helper function to extract video ID from YouTube URL
 */
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

/**
 * Cleanup function (placeholder for future MCP implementation)
 */
export const cleanup = () => {
  console.log("Cleaning up resources...");
  // In a real MCP implementation, you would stop servers here
};
